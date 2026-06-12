import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const PREFIX = "/make-server-0293a0ab";
const VERSION = "portfolio-v2";
const ADMIN_EMAIL = "sapkalgaurav98@gmail.com";
const ADMIN_PASSWORD = "Sapkal@00#";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// --- Seed data (used only when the store is empty) ---
const seedProjects = [
  {
    id: "1",
    title: "AI Customer Support Chatbot",
    tags: "AI, Python",
    status: "Published",
    views: 342,
    description:
      "An LLM-powered chatbot that resolves 70% of support tickets automatically with sentiment-aware routing.",
  },
  {
    id: "2",
    title: "Sales Analytics Dashboard",
    tags: "Data Science",
    status: "Published",
    views: 280,
    description:
      "Real-time sales analytics with predictive forecasting built on a modern data pipeline.",
  },
  {
    id: "3",
    title: "E-Commerce Price Tracker",
    tags: "Automation",
    status: "Published",
    views: 195,
    description:
      "Automated scraper that monitors competitor pricing and alerts on changes.",
  },
  {
    id: "4",
    title: "ML Stock Predictor",
    tags: "AI, ML",
    status: "Draft",
    views: 0,
    description:
      "Time-series ML model predicting short-term equity movements.",
  },
];

const seedTestimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CEO, TechFlow",
    rating: 5,
    status: "Published",
    quote:
      "Gaurav delivered beyond expectations. Our automation pipeline saved us 20 hours a week.",
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "CTO, DataDrive",
    rating: 5,
    status: "Published",
    quote:
      "Exceptional engineer. The AI integration was flawless and shipped ahead of schedule.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Head Analytics",
    rating: 5,
    status: "Published",
    quote:
      "The dashboard transformed how our team makes decisions. Highly recommended.",
  },
];

// --- Lazy one-time startup: ensure admin user + seed data ---
// Runs on first request (not at module load) to keep edge deploys stable.
let bootstrapped = false;
let bootstrapPromise: Promise<void> | null = null;

async function bootstrap() {
  try {
    const { data: list } =
      await supabaseAdmin.auth.admin.listUsers();
    const exists = list?.users?.some(
      (u) => u.email === ADMIN_EMAIL,
    );
    if (!exists) {
      const { error } =
        await supabaseAdmin.auth.admin.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          user_metadata: { name: "Admin" },
          // Automatically confirm the user's email since an email server hasn't been configured.
          email_confirm: true,
        });
      if (error)
        console.log(
          `Bootstrap error creating admin user: ${error.message}`,
        );
    }
  } catch (err) {
    console.log(`Bootstrap error ensuring admin user: ${err}`);
  }

  try {
    const seededFlag = await kv.get("seeded:v1");
    if (!seededFlag) {
      await kv.mset(
        seedProjects.map((p) => `project:${p.id}`),
        seedProjects,
      );
      await kv.mset(
        seedTestimonials.map((t) => `testimonial:${t.id}`),
        seedTestimonials,
      );
      await kv.set("seeded:v1", true);
    }
  } catch (err) {
    console.log(`Bootstrap error seeding data: ${err}`);
  }
}

function ensureBootstrap(): Promise<void> {
  if (bootstrapped) return Promise.resolve();
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap()
      .then(() => {
        bootstrapped = true;
      })
      .catch((err) => {
        console.log(`Bootstrap failed: ${err}`);
        bootstrapPromise = null;
      });
  }
  return bootstrapPromise;
}

// Ensure seed/admin exist before handling any request.
app.use("*", async (c, next) => {
  await ensureBootstrap();
  await next();
});

// --- Auth helper for protected routes ---
async function requireUser(c: any): Promise<string | null> {
  const accessToken = c.req
    .header("Authorization")
    ?.split(" ")[1];
  if (!accessToken) return null;
  const { data, error } =
    await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data?.user?.id) return null;
  return data.user.id;
}

app.get(`${PREFIX}/health`, (c) =>
  c.json({ status: "ok", version: VERSION }),
);

// ---------- SITE CONTENT (hero / about / skills) ----------
app.get(`${PREFIX}/content`, async (c) => {
  try {
    const content = await kv.get("site:content");
    return c.json({ content: content || null });
  } catch (err) {
    console.log(`Error fetching site content: ${err}`);
    return c.json(
      { error: `Failed to fetch content: ${err}` },
      500,
    );
  }
});

app.put(`${PREFIX}/content`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const body = await c.req.json();
    await kv.set("site:content", body.content);
    return c.json({ content: body.content });
  } catch (err) {
    console.log(`Error saving site content: ${err}`);
    return c.json(
      { error: `Failed to save content: ${err}` },
      500,
    );
  }
});

// ---------- PROJECTS ----------
app.get(`${PREFIX}/projects`, async (c) => {
  try {
    const projects = await kv.getByPrefix("project:");
    return c.json({ projects });
  } catch (err) {
    console.log(`Error fetching projects: ${err}`);
    return c.json(
      { error: `Failed to fetch projects: ${err}` },
      500,
    );
  }
});

app.post(`${PREFIX}/projects`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const body = await c.req.json();
    const id = String(Date.now());
    const project = {
      id,
      title: body.title,
      tags: body.tags || "",
      status: body.status || "Draft",
      views: 0,
      description: body.description || "",
    };
    await kv.set(`project:${id}`, project);
    return c.json({ project });
  } catch (err) {
    console.log(`Error creating project: ${err}`);
    return c.json(
      { error: `Failed to create project: ${err}` },
      500,
    );
  }
});

app.put(`${PREFIX}/projects/:id`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`project:${id}`);
    if (!existing)
      return c.json({ error: "Project not found" }, 404);
    const body = await c.req.json();
    const project = { ...existing, ...body, id };
    await kv.set(`project:${id}`, project);
    return c.json({ project });
  } catch (err) {
    console.log(`Error updating project: ${err}`);
    return c.json(
      { error: `Failed to update project: ${err}` },
      500,
    );
  }
});

app.delete(`${PREFIX}/projects/:id`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    await kv.del(`project:${c.req.param("id")}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting project: ${err}`);
    return c.json(
      { error: `Failed to delete project: ${err}` },
      500,
    );
  }
});

// ---------- TESTIMONIALS ----------
app.get(`${PREFIX}/testimonials`, async (c) => {
  try {
    const testimonials = await kv.getByPrefix("testimonial:");
    return c.json({ testimonials });
  } catch (err) {
    console.log(`Error fetching testimonials: ${err}`);
    return c.json(
      { error: `Failed to fetch testimonials: ${err}` },
      500,
    );
  }
});

app.post(`${PREFIX}/testimonials`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const body = await c.req.json();
    const id = String(Date.now());
    const testimonial = {
      id,
      name: body.name,
      role: body.role || "",
      rating: body.rating ?? 5,
      status: body.status || "Published",
      quote: body.quote || "",
    };
    await kv.set(`testimonial:${id}`, testimonial);
    return c.json({ testimonial });
  } catch (err) {
    console.log(`Error creating testimonial: ${err}`);
    return c.json(
      { error: `Failed to create testimonial: ${err}` },
      500,
    );
  }
});

app.put(`${PREFIX}/testimonials/:id`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`testimonial:${id}`);
    if (!existing)
      return c.json({ error: "Testimonial not found" }, 404);
    const body = await c.req.json();
    const testimonial = { ...existing, ...body, id };
    await kv.set(`testimonial:${id}`, testimonial);
    return c.json({ testimonial });
  } catch (err) {
    console.log(`Error updating testimonial: ${err}`);
    return c.json(
      { error: `Failed to update testimonial: ${err}` },
      500,
    );
  }
});

app.delete(`${PREFIX}/testimonials/:id`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    await kv.del(`testimonial:${c.req.param("id")}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting testimonial: ${err}`);
    return c.json(
      { error: `Failed to delete testimonial: ${err}` },
      500,
    );
  }
});

// ---------- MESSAGES ----------
// Public: anyone can submit a contact message
app.post(`${PREFIX}/messages`, async (c) => {
  try {
    const body = await c.req.json();
    if (!body.name || !body.email)
      return c.json(
        { error: "Name and email are required" },
        400,
      );
    const id = String(Date.now());
    const message = {
      id,
      name: body.name,
      email: body.email,
      company: body.company || "",
      budget: body.budget || "Not specified",
      details: body.details || "",
      status: "New",
      date: new Date().toISOString().slice(0, 10),
    };
    await kv.set(`message:${id}`, message);
    return c.json({ message });
  } catch (err) {
    console.log(`Error saving contact message: ${err}`);
    return c.json(
      { error: `Failed to save message: ${err}` },
      500,
    );
  }
});

// Protected: admin reads/updates/deletes messages
app.get(`${PREFIX}/messages`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const messages = await kv.getByPrefix("message:");
    return c.json({ messages });
  } catch (err) {
    console.log(`Error fetching messages: ${err}`);
    return c.json(
      { error: `Failed to fetch messages: ${err}` },
      500,
    );
  }
});

app.put(`${PREFIX}/messages/:id`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    const id = c.req.param("id");
    const existing = await kv.get(`message:${id}`);
    if (!existing)
      return c.json({ error: "Message not found" }, 404);
    const body = await c.req.json();
    const message = { ...existing, ...body, id };
    await kv.set(`message:${id}`, message);
    return c.json({ message });
  } catch (err) {
    console.log(`Error updating message: ${err}`);
    return c.json(
      { error: `Failed to update message: ${err}` },
      500,
    );
  }
});

app.delete(`${PREFIX}/messages/:id`, async (c) => {
  const userId = await requireUser(c);
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  try {
    await kv.del(`message:${c.req.param("id")}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting message: ${err}`);
    return c.json(
      { error: `Failed to delete message: ${err}` },
      500,
    );
  }
});

Deno.serve(app.fetch);
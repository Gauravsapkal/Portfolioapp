import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { SiteContent, defaultContent } from "./siteContent";

export type Project = {
  id: string;
  title: string;
  tags: string;
  status: "Draft" | "Published";
  views: number;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  status: "Draft" | "Published";
  quote: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  details: string;
  status: "New" | "Replied";
  date: string;
};

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0293a0ab`;
const STORAGE_KEY = "portfolio-store-v2";

// Local demo credentials used when the backend isn't reachable yet.

// Singleton Supabase client (used for admin auth)
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
);

const seedProjects: Project[] = [
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

const seedTestimonials: Testimonial[] = [
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

const seedMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Alex Turner",
    email: "alex@startup.com",
    company: "Startup Inc",
    budget: "$1,000 – $5,000",
    details:
      "We need an AI chatbot for our SaaS onboarding flow. Looking to start next month.",
    status: "New",
    date: "2026-06-10",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@agency.com",
    company: "Santos Agency",
    budget: "$5,000 – $10,000",
    details:
      "Interested in a custom analytics dashboard for our marketing clients.",
    status: "Replied",
    date: "2026-06-09",
  },
];

type LocalShape = {
  projects: Project[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  content: SiteContent;
};

function loadLocal(): LocalShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LocalShape>;
      return {
        projects: parsed.projects ?? seedProjects,
        testimonials: parsed.testimonials ?? seedTestimonials,
        messages: parsed.messages ?? seedMessages,
        content: parsed.content ?? defaultContent,
      };
    }
  } catch {
    /* ignore */
  }
  return {
    projects: seedProjects,
    testimonials: seedTestimonials,
    messages: seedMessages,
    content: defaultContent,
  };
}

function saveLocal(data: LocalShape) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

type PortfolioState = {
  projects: Project[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  content: SiteContent;
  loading: boolean;
  online: boolean; // true once the backend responds successfully
  isAdmin: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateContent: (c: SiteContent) => Promise<void>;
  addProject: (
    p: Omit<Project, "id" | "views">,
  ) => Promise<void>;
  updateProject: (
    id: string,
    p: Partial<Project>,
  ) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTestimonial: (t: Omit<Testimonial, "id">) => Promise<void>;
  updateTestimonial: (
    id: string,
    t: Partial<Testimonial>,
  ) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addMessage: (
    m: Omit<ContactMessage, "id" | "status" | "date">,
  ) => Promise<void>;
  updateMessage: (
    id: string,
    m: Partial<ContactMessage>,
  ) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  refreshMessages: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioState | null>(
  null,
);

export function PortfolioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);
  const [messages, setMessages] = useState<ContactMessage[]>(
    [],
  );
  const [content, setContent] =
    useState<SiteContent>(defaultContent);
  const [session, setSession] = useState<Session | null>(null);
  const [localAdmin, setLocalAdmin] = useState(false);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdmin = !!session || localAdmin;
  // We can use the server for writes only when reachable AND we hold a real token.
  const canUseServerWrites = online && !!session?.access_token;

  const request = useCallback(
    async (
      path: string,
      options: RequestInit = {},
      useAuth = false,
    ) => {
      const headers: Record<string, string> = {
        Authorization: useAuth
          ? `Bearer ${session?.access_token ?? publicAnonKey}`
          : `Bearer ${publicAnonKey}`,
        ...((options.headers as Record<string, string>) || {}),
      };
      if (options.body)
        headers["Content-Type"] = "application/json";
      const res = await fetch(`${BASE}${path}`, {
        ...options,
        headers,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data?.error ||
            `Request to ${path} failed with ${res.status}`,
        );
      return data;
    },
    [session],
  );

  const persistLocal = useCallback(
    (next: Partial<LocalShape>) => {
      const current = loadLocal();
      saveLocal({ ...current, ...next });
    },
    [],
  );

  // Initial load: try the server; fall back to local data if it isn't reachable.
  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [p, t, ct] = await Promise.all([
        request("/projects"),
        request("/testimonials"),
        request("/content"),
      ]);
      setProjects(p.projects || []);
      setTestimonials(t.testimonials || []);
      if (ct.content) setContent(ct.content);
      setOnline(true);
    } catch (err) {
      // Backend not deployed / unreachable — use local fallback so the app still works.
      console.warn(
        `Backend unavailable, using local data. (${err})`,
      );
      const local = loadLocal();
      setProjects(local.projects);
      setTestimonials(local.testimonials);
      setMessages(local.messages);
      setContent(local.content);
      setOnline(false);
    } finally {
      setLoading(false);
    }
  }, [request]);

  const refreshMessages = useCallback(async () => {
    if (online && session?.access_token) {
      try {
        const data = await request("/messages", {}, true);
        const sorted = (data.messages || []).sort(
          (a: ContactMessage, b: ContactMessage) =>
            Number(b.id) - Number(a.id),
        );
        setMessages(sorted);
        return;
      } catch (err) {
        console.warn(
          `Failed to load messages from server: ${err}`,
        );
      }
    }
    // local fallback
    setMessages(
      loadLocal().messages.sort(
        (a, b) => Number(b.id) - Number(a.id),
      ),
    );
  }, [request, online, session]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_e, s) => setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (isAdmin) refreshMessages();
  }, [isAdmin, refreshMessages]);

  const signIn: PortfolioState["signIn"] = async (
    email,
    password,
  ) => {
    // Try real Supabase auth first.
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (!error && data.session) {
      setSession(data.session);
      return { error: null };
    }
    // Fallback: local demo credentials when the backend/admin user isn't set up yet.
    if (
      email.trim() === DEMO_EMAIL &&
      password === DEMO_PASSWORD
    ) {
      setLocalAdmin(true);
      return { error: null };
    }
    console.error(
      `Sign in failed: ${error?.message ?? "invalid credentials"}`,
    );
    return {
      error: error?.message ?? "Invalid login credentials",
    };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLocalAdmin(false);
  };

  // --- CRUD: use server when possible, otherwise mutate local + persist ---
  const addProject: PortfolioState["addProject"] = async (
    p,
  ) => {
    if (canUseServerWrites) {
      const { project } = await request(
        "/projects",
        { method: "POST", body: JSON.stringify(p) },
        true,
      );
      setProjects((prev) => [...prev, project]);
      return;
    }
    const project: Project = {
      ...p,
      id: String(Date.now()),
      views: 0,
    };
    setProjects((prev) => {
      const next = [...prev, project];
      persistLocal({ projects: next });
      return next;
    });
  };
  const updateProject: PortfolioState["updateProject"] = async (
    id,
    p,
  ) => {
    if (canUseServerWrites) {
      const { project } = await request(
        `/projects/${id}`,
        { method: "PUT", body: JSON.stringify(p) },
        true,
      );
      setProjects((prev) =>
        prev.map((x) => (x.id === id ? project : x)),
      );
      return;
    }
    setProjects((prev) => {
      const next = prev.map((x) =>
        x.id === id ? { ...x, ...p } : x,
      );
      persistLocal({ projects: next });
      return next;
    });
  };
  const deleteProject: PortfolioState["deleteProject"] = async (
    id,
  ) => {
    if (canUseServerWrites) {
      await request(
        `/projects/${id}`,
        { method: "DELETE" },
        true,
      );
    }
    setProjects((prev) => {
      const next = prev.filter((x) => x.id !== id);
      persistLocal({ projects: next });
      return next;
    });
  };

  const addTestimonial: PortfolioState["addTestimonial"] =
    async (t) => {
      if (canUseServerWrites) {
        const { testimonial } = await request(
          "/testimonials",
          { method: "POST", body: JSON.stringify(t) },
          true,
        );
        setTestimonials((prev) => [...prev, testimonial]);
        return;
      }
      const testimonial: Testimonial = {
        ...t,
        id: String(Date.now()),
      };
      setTestimonials((prev) => {
        const next = [...prev, testimonial];
        persistLocal({ testimonials: next });
        return next;
      });
    };
  const updateTestimonial: PortfolioState["updateTestimonial"] =
    async (id, t) => {
      if (canUseServerWrites) {
        const { testimonial } = await request(
          `/testimonials/${id}`,
          { method: "PUT", body: JSON.stringify(t) },
          true,
        );
        setTestimonials((prev) =>
          prev.map((x) => (x.id === id ? testimonial : x)),
        );
        return;
      }
      setTestimonials((prev) => {
        const next = prev.map((x) =>
          x.id === id ? { ...x, ...t } : x,
        );
        persistLocal({ testimonials: next });
        return next;
      });
    };
  const deleteTestimonial: PortfolioState["deleteTestimonial"] =
    async (id) => {
      if (canUseServerWrites) {
        await request(
          `/testimonials/${id}`,
          { method: "DELETE" },
          true,
        );
      }
      setTestimonials((prev) => {
        const next = prev.filter((x) => x.id !== id);
        persistLocal({ testimonials: next });
        return next;
      });
    };

  const addMessage: PortfolioState["addMessage"] = async (
    m,
  ) => {
    if (online) {
      try {
        await request(
          "/messages",
          { method: "POST", body: JSON.stringify(m) },
          false,
        );
        if (isAdmin) refreshMessages();
        return;
      } catch (err) {
        console.warn(
          `Server message submit failed, storing locally: ${err}`,
        );
      }
    }
    const message: ContactMessage = {
      ...m,
      id: String(Date.now()),
      status: "New",
      date: new Date().toISOString().slice(0, 10),
    };
    const next = [message, ...loadLocal().messages];
    persistLocal({ messages: next });
    if (isAdmin) setMessages(next);
  };
  const updateMessage: PortfolioState["updateMessage"] = async (
    id,
    m,
  ) => {
    if (canUseServerWrites) {
      const { message } = await request(
        `/messages/${id}`,
        { method: "PUT", body: JSON.stringify(m) },
        true,
      );
      setMessages((prev) =>
        prev.map((x) => (x.id === id ? message : x)),
      );
      return;
    }
    setMessages((prev) => {
      const next = prev.map((x) =>
        x.id === id ? { ...x, ...m } : x,
      );
      persistLocal({ messages: next });
      return next;
    });
  };
  const deleteMessage: PortfolioState["deleteMessage"] = async (
    id,
  ) => {
    if (canUseServerWrites) {
      await request(
        `/messages/${id}`,
        { method: "DELETE" },
        true,
      );
    }
    setMessages((prev) => {
      const next = prev.filter((x) => x.id !== id);
      persistLocal({ messages: next });
      return next;
    });
  };

  const updateContent: PortfolioState["updateContent"] = async (
    c,
  ) => {
    setContent(c);
    if (canUseServerWrites) {
      try {
        await request(
          "/content",
          {
            method: "PUT",
            body: JSON.stringify({ content: c }),
          },
          true,
        );
        return;
      } catch (err) {
        console.warn(
          `Failed to save content to server, storing locally: ${err}`,
        );
      }
    }
    persistLocal({ content: c });
  };

  const value: PortfolioState = {
    projects,
    testimonials,
    messages,
    content,
    loading,
    online,
    isAdmin,
    signIn,
    signOut,
    updateContent,
    addProject,
    updateProject,
    deleteProject,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addMessage,
    updateMessage,
    deleteMessage,
    refreshMessages,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx)
    throw new Error(
      "usePortfolio must be used within PortfolioProvider",
    );
  return ctx;
}
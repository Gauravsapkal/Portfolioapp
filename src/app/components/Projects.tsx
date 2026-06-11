import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, FolderOpen } from "lucide-react";

const filters = ["All", "AI", "Python", "Data Science", "Web Apps", "Automation"];

const projects = [
  {
    title: "AI Customer Support Chatbot",
    desc: "GPT-4 powered chatbot with custom knowledge base, trained on business FAQs with 94% accuracy.",
    tags: ["AI", "Python"],
    stack: ["Python", "OpenAI API", "FastAPI", "React"],
    image: "https://images.unsplash.com/photo-1750365919971-7dd273e7b317?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Sales Analytics Dashboard",
    desc: "Real-time data pipeline processing 1M+ records daily with interactive Plotly visualizations.",
    tags: ["Data Science", "Python"],
    stack: ["Pandas", "Plotly", "PostgreSQL", "FastAPI"],
    image: "https://images.unsplash.com/photo-1720962158813-29b66b8e23e1?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "E-Commerce Price Tracker",
    desc: "Automated web scraper monitoring prices across 500+ products with alert notifications.",
    tags: ["Automation", "Python"],
    stack: ["Python", "Selenium", "BeautifulSoup", "Firebase"],
    image: "https://images.unsplash.com/photo-1733412505442-36cfa59a4240?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "ML Stock Predictor",
    desc: "LSTM neural network predicting stock movements with 78% directional accuracy on test data.",
    tags: ["AI", "Data Science"],
    stack: ["TensorFlow", "Pandas", "Scikit-learn", "Streamlit"],
    image: "https://images.unsplash.com/photo-1750365919878-2735d30fa3d8?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Workflow Automation Suite",
    desc: "Python automation platform that eliminated 40 hours of weekly manual work for a logistics firm.",
    tags: ["Automation", "Python"],
    stack: ["Python", "Celery", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "Portfolio CMS Platform",
    desc: "Full-stack web app with Firebase backend, real-time updates, and admin dashboard.",
    tags: ["Web Apps", "Python"],
    stack: ["React", "Firebase", "Python", "FastAPI"],
    image: "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?w=600&h=400&fit=crop",
    github: "#",
    live: "#",
    featured: false,
  },
];

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
    el.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "";
      ref.current.style.transition = "transform 0.4s ease-out";
    }
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={style}>
      {children}
    </div>
  );
}

const tagColors: Record<string, string> = {
  AI: "#8B5CF6", Python: "#3B82F6", "Data Science": "#06B6D4", "Web Apps": "#10B981", Automation: "#F59E0B",
};

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = projects.filter((p) =>
    activeFilter === "All" ? true : p.tags.includes(activeFilter)
  );

  return (
    <section style={{ padding: "100px 32px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#06B6D4", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <FolderOpen size={12} /> Projects
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Featured Work</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Real projects. Real impact. Real results.</p>
        </motion.div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "48px" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s", border: "1px solid",
                background: activeFilter === f ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "rgba(255,255,255,0.04)",
                borderColor: activeFilter === f ? "transparent" : "rgba(255,255,255,0.1)",
                color: activeFilter === f ? "white" : "rgba(255,255,255,0.65)",
                boxShadow: activeFilter === f ? "0 0 20px rgba(59,130,246,0.3)" : "none",
              }}
            >{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <TiltCard style={{ height: "100%" }}>
                <div style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px", overflow: "hidden", height: "100%",
                  backdropFilter: "blur(10px)", display: "flex", flexDirection: "column",
                }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: "100%", height: "200px", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    />
                    {project.featured && (
                      <div style={{
                        position: "absolute", top: "12px", right: "12px",
                        background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                        color: "white", padding: "4px 12px", borderRadius: "100px",
                        fontSize: "11px", fontWeight: 700,
                      }}>FEATURED</div>
                    )}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 60%)",
                    }} />
                  </div>

                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{
                          padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                          background: `${tagColors[tag] || "#3B82F6"}15`,
                          color: tagColors[tag] || "#3B82F6",
                          border: `1px solid ${tagColors[tag] || "#3B82F6"}30`,
                        }}>{tag}</span>
                      ))}
                    </div>

                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "17px", marginBottom: "8px" }}>{project.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>{project.desc}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {project.stack.map((tech) => (
                        <span key={tech} style={{
                          padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 500,
                          background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}>{tech}</span>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <a href={project.github} style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.8)", padding: "7px 14px", borderRadius: "8px",
                        textDecoration: "none", fontSize: "12px", fontWeight: 600, flex: 1, justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      >
                        <Github size={13} /> GitHub
                      </a>
                      <a href={project.live} style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                        color: "white", padding: "7px 14px", borderRadius: "8px",
                        textDecoration: "none", fontSize: "12px", fontWeight: 600, flex: 1, justifyContent: "center",
                      }}>
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

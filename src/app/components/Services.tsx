import { motion } from "motion/react";
import { Bot, Globe, BarChart3, Link2, Code2, Layers, ArrowRight, Briefcase } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Python Automation",
    desc: "Automate repetitive tasks, workflows, and business processes with robust Python scripts.",
    benefits: ["Save 10+ hours/week", "Error-free execution", "Scalable solutions"],
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.03))",
  },
  {
    icon: Bot,
    title: "AI Chatbot Development",
    desc: "Build intelligent conversational AI using LLMs, custom training, and seamless integrations.",
    benefits: ["24/7 customer support", "NLP-powered responses", "Multi-platform deploy"],
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.03))",
  },
  {
    icon: Globe,
    title: "Web Scraping Solutions",
    desc: "Extract structured data from any website using advanced scraping and crawling techniques.",
    benefits: ["Real-time data feeds", "Anti-bot bypass", "Clean data output"],
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.03))",
  },
  {
    icon: BarChart3,
    title: "Data Analysis & Visualization",
    desc: "Transform raw data into actionable insights with powerful analytics and stunning dashboards.",
    benefits: ["Pandas & NumPy", "Interactive dashboards", "Business insights"],
    color: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.03))",
  },
  {
    icon: Link2,
    title: "API Integration",
    desc: "Connect your systems with third-party APIs, REST services, and real-time data streams.",
    benefits: ["REST & GraphQL", "Webhook handling", "OAuth & auth flows"],
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.03))",
  },
  {
    icon: Layers,
    title: "Custom Software Solutions",
    desc: "End-to-end custom software tailored precisely to your unique business requirements.",
    benefits: ["Full-stack delivery", "Agile development", "Post-launch support"],
    color: "#EC4899",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.03))",
  },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function Services() {
  return (
    <section style={{ padding: "100px 32px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse at center top, rgba(139,92,246,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#3B82F6", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <Briefcase size={12} /> Services
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>What I Build For You</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "520px", margin: "0 auto" }}>
            Premium software solutions engineered to save time, reduce costs, and scale your business.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                background: service.gradient,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", padding: "28px",
                backdropFilter: "blur(10px)",
                cursor: "default",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${service.color}40`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px", marginBottom: "20px",
                background: `${service.color}20`, border: `1px solid ${service.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 20px ${service.color}20`,
              }}>
                <service.icon size={24} color={service.color} />
              </div>

              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "19px", marginBottom: "10px" }}>
                {service.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
                {service.desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {service.benefits.map((benefit, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: service.color, flexShrink: 0 }} />
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("#contact")}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  color: service.color, background: "none", border: "none",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer", padding: 0,
                  transition: "gap 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
              >
                Get Started <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

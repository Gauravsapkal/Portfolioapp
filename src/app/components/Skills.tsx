import { useState } from "react";
import { motion } from "motion/react";
import { Code2, Globe, Server, Database, Brain, Wrench, Cpu } from "lucide-react";

const categories = [
  {
    id: "programming",
    label: "Programming",
    icon: Code2,
    color: "#3B82F6",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 75 },
      { name: "TypeScript", level: 65 },
      { name: "SQL", level: 80 },
      { name: "Bash/Shell", level: 60 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "#06B6D4",
    skills: [
      { name: "React", level: 75 },
      { name: "Next.js", level: 65 },
      { name: "HTML/CSS", level: 85 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Streamlit", level: 88 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "#8B5CF6",
    skills: [
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 70 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    color: "#10B981",
    skills: [
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 70 },
      { name: "Firebase Firestore", level: 80 },
      { name: "Redis", level: 65 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    icon: Brain,
    color: "#EC4899",
    skills: [
      { name: "Machine Learning", level: 82 },
      { name: "TensorFlow", level: 70 },
      { name: "Scikit-learn", level: 85 },
      { name: "Pandas / NumPy", level: 92 },
      { name: "OpenAI API", level: 88 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    color: "#F59E0B",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Docker", level: 65 },
      { name: "Airflow", level: 70 },
      { name: "Celery / Redis", level: 72 },
      { name: "Linux / CLI", level: 78 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{name}</span>
        <span style={{ fontSize: "12px", fontWeight: 600, color }}>{level}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.07)", borderRadius: "100px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          style={{ height: "100%", borderRadius: "100px", background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("programming");
  const active = categories.find((c) => c.id === activeTab)!;

  return (
    <section style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#EC4899", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <Cpu size={12} /> Skills
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Technical Expertise</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Technologies I work with every day to ship great software.</p>
        </motion.div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "48px" }}>
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "9px 20px", borderRadius: "12px", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s", border: "1px solid",
                  background: isActive ? `${cat.color}20` : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? `${cat.color}50` : "rgba(255,255,255,0.08)",
                  color: isActive ? cat.color : "rgba(255,255,255,0.55)",
                  boxShadow: isActive ? `0 0 20px ${cat.color}25` : "none",
                }}
              >
                <cat.icon size={15} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px", padding: "40px",
            borderTop: `3px solid ${active.color}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "14px",
              background: `${active.color}15`, border: `1px solid ${active.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <active.icon size={22} color={active.color} />
            </div>
            <div>
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "20px" }}>{active.label}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>{active.skills.length} technologies</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0 40px" }}>
            {active.skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} color={active.color} delay={i * 0.12} />
            ))}
          </div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
        >
          {["Python", "React", "TensorFlow", "FastAPI", "PostgreSQL", "Docker", "OpenAI", "Pandas", "Git", "Firebase", "Airflow", "Redis"].map((tech) => (
            <span key={tech} style={{
              padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 500,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.55)",
            }}>{tech}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

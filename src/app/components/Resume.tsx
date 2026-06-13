import { motion } from "motion/react";
import { Download, Eye, FileText, Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  { role: "Freelance Python Developer", company: "Self-Employed", period: "2024 – Present", desc: "Delivered automation scripts, web scrapers, and AI-powered tools for clients across industries." },
  { role: "Data Science Intern", company: "Tech Startup", period: "2022 – 2023", desc: "Built data pipelines with Pandas and visualized insights using Matplotlib and Plotly." },
];

const education = [
  { degree: "Data Science Engineering", school: "Pursuing (Dy Patil Technical Campus Kolhapur)", period: "2024 – Present", icon: GraduationCap },
  { degree: "Diploma in Computer Engineering", school: "Government Polytechnic Ambad", period: "2021 – 2024", icon: GraduationCap },
];

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "24px",
  backdropFilter: "blur(10px)",
};

export function Resume() {
  return (
    <section style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#06B6D4", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <FileText size={12} /> Resume
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Experience & Education</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>A snapshot of my journey</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "48px" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={glassCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <Briefcase size={20} color="#3B82F6" />
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "18px" }}>Experience</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ borderLeft: "2px solid rgba(59,130,246,0.3)", paddingLeft: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                    <h4 style={{ fontWeight: 600, fontSize: "15px" }}>{exp.role}</h4>
                    <span style={{ color: "#3B82F6", fontSize: "12px", fontWeight: 500 }}>{exp.period}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "6px" }}>{exp.company}</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.6 }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={glassCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <GraduationCap size={20} color="#8B5CF6" />
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "18px" }}>Education</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {education.map((edu, i) => (
                <div key={i} style={{ borderLeft: "2px solid rgba(139,92,246,0.3)", paddingLeft: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                    <h4 style={{ fontWeight: 600, fontSize: "15px" }}>{edu.degree}</h4>
                    <span style={{ color: "#8B5CF6", fontSize: "12px", fontWeight: 500 }}>{edu.period}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{edu.school}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#"
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              color: "white", padding: "14px 32px", borderRadius: "12px",
              textDecoration: "none", fontSize: "15px", fontWeight: 600,
              boxShadow: "0 0 30px rgba(59,130,246,0.3)",
            }}
          >
            <Download size={18} /> Download Resume
          </a>
          <a
            href="#"
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: "white", padding: "14px 32px", borderRadius: "12px",
              textDecoration: "none", fontSize: "15px", fontWeight: 600,
              backdropFilter: "blur(10px)",
            }}
          >
            <Eye size={18} /> View Online
          </a>
        </motion.div>
      </div>
    </section>
  );
}

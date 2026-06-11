import { motion } from "motion/react";
import { Award, ExternalLink, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Python for Everybody Specialization",
    provider: "Coursera / University of Michigan",
    date: "Dec 2023",
    badge: "🐍",
    color: "#3B82F6",
    desc: "5-course specialization covering Python fundamentals through data structures and APIs.",
    link: "#",
  },
  {
    title: "Machine Learning Specialization",
    provider: "Coursera / Stanford",
    date: "Mar 2024",
    badge: "🧠",
    color: "#8B5CF6",
    desc: "Andrew Ng's ML course covering supervised, unsupervised learning, and best practices.",
    link: "#",
  },
  {
    title: "Data Science Professional Certificate",
    provider: "IBM / Coursera",
    date: "Jun 2024",
    badge: "📊",
    color: "#06B6D4",
    desc: "10-course program covering data analysis, visualization, ML, and SQL.",
    link: "#",
  },
  {
    title: "React - The Complete Guide",
    provider: "Udemy",
    date: "Aug 2024",
    badge: "⚛️",
    color: "#10B981",
    desc: "Comprehensive React course including hooks, context, Redux, and Next.js.",
    link: "#",
  },
  {
    title: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    date: "Sep 2024",
    badge: "☁️",
    color: "#F59E0B",
    desc: "Foundational AWS cloud concepts, services, security, and architecture.",
    link: "#",
  },
  {
    title: "Deep Learning Specialization",
    provider: "Coursera / deeplearning.ai",
    date: "Nov 2024",
    badge: "🔮",
    color: "#EC4899",
    desc: "5-course specialization in neural networks, CNNs, RNNs, and sequence models.",
    link: "#",
  },
];

export function Certifications() {
  return (
    <section style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#F59E0B", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <Award size={12} /> Certifications
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Credentials & Certifications</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Continuously learning from the world's best instructors.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px", padding: "22px",
                backdropFilter: "blur(10px)",
                display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                  background: `${cert.color}15`, border: `1px solid ${cert.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px",
                }}>{cert.badge}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "14px", lineHeight: 1.3, marginBottom: "4px" }}>{cert.title}</h3>
                  <p style={{ color: cert.color, fontSize: "12px", fontWeight: 600 }}>{cert.provider}</p>
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>{cert.desc}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                  <Calendar size={12} /> {cert.date}
                </div>
                <a
                  href={cert.link}
                  style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    color: cert.color, fontSize: "12px", fontWeight: 600, textDecoration: "none",
                    background: `${cert.color}12`, border: `1px solid ${cert.color}25`,
                    padding: "5px 12px", borderRadius: "8px", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${cert.color}20`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${cert.color}12`; }}
                >
                  Verify <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

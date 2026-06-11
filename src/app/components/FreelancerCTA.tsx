import { motion } from "motion/react";
import { ArrowRight, Calendar, Zap } from "lucide-react";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function FreelancerCTA() {
  return (
    <section style={{ padding: "120px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: "100px", padding: "6px 16px", marginBottom: "32px",
          color: "#3B82F6", fontSize: "13px", fontWeight: 600,
        }}>
          <Zap size={14} /> Available for New Projects
        </div>

        <h2 style={{
          fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
          fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.1, marginBottom: "24px",
          background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Let's Build Something<br />
          <span style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Amazing Together</span>
        </h2>

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", lineHeight: 1.7, marginBottom: "48px", maxWidth: "560px", margin: "0 auto 48px" }}>
          Whether you need AI automation, a data pipeline, or a full-stack solution — I deliver results that make an impact. Let's turn your vision into reality.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              color: "white", padding: "16px 36px", borderRadius: "12px",
              border: "none", fontSize: "16px", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 0 40px rgba(59,130,246,0.35)",
              display: "flex", alignItems: "center", gap: "10px",
            }}
          >
            <Zap size={18} /> Start a Project <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
              color: "white", padding: "16px 36px", borderRadius: "12px",
              fontSize: "16px", fontWeight: 600, cursor: "pointer",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", gap: "10px",
            }}
          >
            <Calendar size={18} /> Book Consultation
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

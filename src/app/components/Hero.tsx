import { motion } from "motion/react";
import { ArrowRight, Calendar, Code2, Brain, Database, Globe, Cpu, Zap, CheckCircle } from "lucide-react";
import { usePortfolio } from "../store/PortfolioContext";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const floatingIcons = [
  { Icon: Code2, style: { top: "18%", left: "8%", animationDelay: "0s" } },
  { Icon: Brain, style: { top: "12%", right: "10%", animationDelay: "1s" } },
  { Icon: Database, style: { bottom: "25%", right: "7%", animationDelay: "2s" } },
  { Icon: Globe, style: { bottom: "30%", left: "5%", animationDelay: "0.5s" } },
  { Icon: Cpu, style: { top: "45%", right: "4%", animationDelay: "1.5s" } },
  { Icon: Zap, style: { top: "55%", left: "3%", animationDelay: "2.5s" } },
];

export function Hero() {
  const { content } = usePortfolio();
  const h = content.hero;
  const stats = h.stats;
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "100px 32px 60px" }}>
      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-18px) rotate(8deg); opacity: 1; }
        }
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 30px) scale(0.9); }
          66% { transform: translate(40px, -20px) scale(1.1); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 40px); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        }
        .float-icon { animation: float-icon 4s ease-in-out infinite; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-200px", left: "-150px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)", animation: "orb1 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-200px", right: "-150px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", animation: "orb2 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", animation: "orb3 14s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, style: iconStyle }, i) => (
        <div key={i} className="float-icon" style={{
          position: "absolute", ...iconStyle,
          width: "48px", height: "48px", borderRadius: "12px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(59,130,246,0.7)", backdropFilter: "blur(10px)",
          animationDuration: `${3.5 + i * 0.5}s`,
        }}>
          <Icon size={22} />
        </div>
      ))}

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: "100px", padding: "7px 18px", marginBottom: "36px",
            fontSize: "13px", fontWeight: 600, color: "rgba(134,239,172,0.9)",
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", animation: "badge-pulse 2s ease-in-out infinite", display: "inline-block" }} />
          {h.badge}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(32px, 5.5vw, 72px)", lineHeight: 1.08, marginBottom: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "white" }}>{h.titlePrefix}</span>
          <span style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>{h.titleHighlight}</span>
          <br />
          <span style={{ color: "white" }}>{h.titleLine2}</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{h.titleLine3}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(15px, 2.2vw, 20px)", lineHeight: 1.7, marginBottom: "48px", maxWidth: "640px", margin: "0 auto 48px" }}
        >
          {h.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginBottom: "72px" }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              color: "white", padding: "15px 34px", borderRadius: "12px",
              border: "none", fontSize: "15px", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 0 30px rgba(59,130,246,0.35)",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            {h.ctaPrimary} <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#projects")}
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
              color: "white", padding: "15px 34px", borderRadius: "12px",
              fontSize: "15px", fontWeight: 600, cursor: "pointer",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            View My Work
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            style={{
              background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)",
              color: "#06B6D4", padding: "15px 34px", borderRadius: "12px",
              fontSize: "15px", fontWeight: 600, cursor: "pointer",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <Calendar size={16} /> Schedule a Call
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0" }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: "20px 40px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
                fontSize: "32px", marginBottom: "4px",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: "36px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          {[0,1,2,3,4].map(i => <CheckCircle key={i} size={14} color="#22C55E" />)}
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Trusted by 15+ clients worldwide</span>
        </motion.div>
      </div>
    </section>
  );
}

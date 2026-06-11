import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Github, MessageCircle, Send, MapPin, Clock, Mail as MailIcon } from "lucide-react";

const socials = [
  {
    icon: MailIcon,
    label: "Email",
    value: "gaurav@example.com",
    href: "mailto:gaurav@example.com",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/gauravsapkal",
    href: "https://linkedin.com/in/gauravsapkal",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.1)",
    border: "rgba(6,182,212,0.2)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/gauravsapkal",
    href: "https://github.com/gauravsapkal",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 XXX XXX XXXX",
    href: "https://wa.me/91XXXXXXXXXX",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
  },
];

const budgets = ["< $500", "$500 – $1,000", "$1,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", company: "", budget: "", details: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: "10px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "Inter, sans-serif",
  };

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
            background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#3B82F6", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <Mail size={12} /> Contact
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Start Your Project</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Tell me about your project and let's discuss how I can help.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px" }}>
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "22px", marginBottom: "8px" }}>Let's Connect</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.7, marginBottom: "32px" }}>
              I'm currently available for freelance projects. Whether it's automation, AI, data pipelines, or web development — I'd love to hear about your challenge.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    background: s.bg, border: `1px solid ${s.border}`,
                    borderRadius: "14px", padding: "14px 18px", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: `${s.color}20`, border: `1px solid ${s.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <s.icon size={18} color={s.color} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "13px", color: s.color, marginBottom: "2px" }}>{s.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px" }}>{s.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: MapPin, text: "India (Remote Worldwide)" },
                { icon: Clock, text: "Response time: Within 24 hours" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                  <Icon size={14} color="#3B82F6" /> {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px", padding: "32px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name *</label>
                  <input
                    type="text" required placeholder="John Doe"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email *</label>
                  <input
                    type="email" required placeholder="john@company.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Company</label>
                <input
                  type="text" placeholder="Your Company (optional)"
                  value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Budget</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {budgets.map((b) => (
                    <button
                      key={b} type="button"
                      onClick={() => setForm({ ...form, budget: b })}
                      style={{
                        padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                        cursor: "pointer", border: "1px solid", transition: "all 0.15s",
                        background: form.budget === b ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)",
                        borderColor: form.budget === b ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.1)",
                        color: form.budget === b ? "#3B82F6" : "rgba(255,255,255,0.55)",
                      }}
                    >{b}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Project Details *</label>
                <textarea
                  required rows={4} placeholder="Describe your project, goals, and timeline..."
                  value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  background: submitted ? "rgba(34,197,94,0.3)" : "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  border: submitted ? "1px solid rgba(34,197,94,0.4)" : "none",
                  color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 0 30px rgba(59,130,246,0.25)",
                }}
              >
                {submitted ? "✓ Message Sent Successfully!" : (<><Send size={16} /> Send Message</>)}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Github, Linkedin, Mail, MessageCircle, Heart, ExternalLink } from "lucide-react";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com/gauravsapkal", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/gaurav-sapkal-749463332/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:sapkalgaurav98@gmial.com", icon: Mail, label: "Email" },
  { href: "https://wa.me/918806136681", icon: MessageCircle, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer style={{
      background: "rgba(255,255,255,0.02)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 32px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "15px", color: "white",
              }}>GS</div>
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px" }}>Gaurav Sapkal</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, maxWidth: "260px" }}>
              Python Developer · AI Solutions Builder · Data Science Engineer. Building the future one line of code at a time.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)", transition: "all 0.2s", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.9)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Navigation</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(59,130,246,0.9)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.9)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Python Automation", "AI Chatbot Dev", "Web Scraping", "Data Analysis", "API Integration", "Custom Software"].map((s) => (
                <span key={s} style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.9)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Quick Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "12px" }}>Available for freelance projects</p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                color: "white", padding: "10px 20px", borderRadius: "10px",
                textDecoration: "none", fontSize: "13px", fontWeight: 600,
              }}
            >
              <ExternalLink size={14} /> Start a Project
            </a>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
            © 2024 Gaurav Sapkal. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}>
            Built with <Heart size={12} style={{ color: "#8B5CF6" }} /> Python, React & passion
          </p>
          <a href="/admin" style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", textDecoration: "none" }}>Admin</a>
        </div>
      </div>
    </footer>
  );
}

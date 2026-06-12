import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Lock } from "lucide-react";
import { useNavigate } from "react-router";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 32px", height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
        style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
      >
        <div style={{
          width: "38px", height: "38px", borderRadius: "10px",
          background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "15px", color: "white",
          boxShadow: "0 0 20px rgba(139,92,246,0.4)",
        }}>GS</div>
        <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", color: "white" }}>
          Gaurav Sapkal
        </span>
      </a>

      <div className="hidden md:flex" style={{ alignItems: "center", gap: "36px" }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
          >{link.label}</a>
        ))}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
          style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            color: "white", padding: "9px 22px", borderRadius: "10px",
            textDecoration: "none", fontSize: "13px", fontWeight: 600,
            boxShadow: "0 0 20px rgba(59,130,246,0.3)", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(59,130,246,0.5)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.3)"; }}
        >Hire Me</a>
        <button
          onClick={() => navigate("/admin")}
          title="Admin Panel"
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)", padding: "8px 14px", borderRadius: "10px",
            fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
        ><Lock size={13} /> Admin</button>
      </div>

      <button
        className="md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "8px" }}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute", top: "72px", left: 0, right: 0,
              background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "24px 32px", display: "flex", flexDirection: "column", gap: "20px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollTo(link.href); }}
                style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "16px", fontWeight: 500 }}
              >{link.label}</a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollTo("#contact"); }}
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "white",
                padding: "13px 20px", borderRadius: "10px", textDecoration: "none",
                fontSize: "15px", fontWeight: 600, textAlign: "center",
              }}
            >Hire Me</a>
            <button
              onClick={() => { setMobileOpen(false); navigate("/admin"); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)", padding: "13px 20px", borderRadius: "10px",
                fontSize: "15px", fontWeight: 600, cursor: "pointer",
              }}
            ><Lock size={15} /> Admin Panel</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

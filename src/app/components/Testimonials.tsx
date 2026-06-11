import { useRef } from "react";
import { motion } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechFlow Startup",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Gaurav built our entire automation suite in 3 weeks. The Python scripts he wrote eliminated 40 hours of manual work weekly. His code is clean, well-documented, and the results were immediate. Absolutely exceptional work.",
    project: "Python Automation",
  },
  {
    name: "Marcus Chen",
    role: "CTO, DataDrive Inc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "The AI chatbot Gaurav developed handles 80% of our support tickets automatically. Response time went from 2 days to 2 minutes. The integration with our existing systems was seamless. 10/10 would hire again.",
    project: "AI Chatbot",
  },
  {
    name: "Priya Sharma",
    role: "Head of Analytics, RetailPro",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Our data dashboard was a game changer. Gaurav connected 5 different data sources into one beautiful interface. We discovered $180K in hidden inventory issues in the first week. Brilliant work.",
    project: "Data Pipeline",
  },
  {
    name: "James Rodriguez",
    role: "Founder, ScaleUp Agency",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Gaurav's web scraping solution was exactly what we needed. He delivered clean, structured data from 50+ competitor sites with 99.9% uptime. The quality of his work far exceeded our expectations.",
    project: "Web Scraping",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section style={{ padding: "100px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#F59E0B", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <MessageSquare size={12} /> Testimonials
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>What Clients Say</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Trusted by startups and businesses worldwide.</p>
        </motion.div>

        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ flex: "0 0 calc(50% - 12px)", minWidth: "320px" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px", padding: "28px",
                    backdropFilter: "blur(20px)",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {Array(t.rating).fill(0).map((_, j) => (
                        <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <Quote size={24} color="rgba(139,92,246,0.4)" />
                  </div>

                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.8, marginBottom: "24px", fontStyle: "italic" }}>
                    "{t.text}"
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(139,92,246,0.3)" }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{t.role}</p>
                    </div>
                    <span style={{
                      background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                      color: "#3B82F6", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                    }}>{t.project}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
          <button
            onClick={scrollPrev}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

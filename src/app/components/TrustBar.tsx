const techs = [
  { name: "Python", icon: "🐍" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Firebase", icon: "🔥" },
  { name: "Machine Learning", icon: "🧠" },
  { name: "Pandas", icon: "🐼" },
  { name: "SQL", icon: "🗄️" },
  { name: "Git", icon: "📦" },
  { name: "REST APIs", icon: "🔗" },
  { name: "TensorFlow", icon: "📊" },
  { name: "FastAPI", icon: "⚡" },
  { name: "Docker", icon: "🐳" },
];

export function TrustBar() {
  const doubled = [...techs, ...techs];
  return (
    <div style={{
      padding: "20px 0",
      background: "rgba(255,255,255,0.02)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track" style={{ display: "flex", width: "max-content", gap: "0" }}>
        {doubled.map((tech, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "0 36px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{ fontSize: "18px" }}>{tech.icon}</span>
            <span style={{
              color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: 600,
              whiteSpace: "nowrap", letterSpacing: "0.05em", textTransform: "uppercase",
            }}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

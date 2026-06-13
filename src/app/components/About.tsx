import { motion } from "motion/react";
import {
  GraduationCap,
  Target,
  Code2,
  User,
} from "lucide-react";
import { usePortfolio } from "../store/PortfolioContext";

const statColors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#22C55E"];

const education = [
  {
    icon: GraduationCap,
    title: "Data Science Engineering",
    school: "DY Patil Technical Campus (Currently Pursuing)",
    period: "2024 – Present",
    color: "#8B5CF6",
    desc: "Specializing in machine learning, statistical analysis, and building data-driven systems.",
  },
  {
    icon: GraduationCap,
    title: "Diploma in Computer Engineering",
    school: "Government Polytechnic Ambad",
    period: "2021 – 2024",
    color: "#3B82F6",
    desc: "Foundation in programming, data structures, software engineering principles.",
  },
];

export function About() {
  const { content } = usePortfolio();
  const a = content.about;
  const stats = a.stats.map((s, i) => ({
    ...s,
    color: statColors[i % statColors.length],
  }));
  return (
    <section style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "20px",
              color: "#8B5CF6",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <User size={12} /> About Me
          </span>
          <h2
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 48px)",
              marginBottom: "16px",
              background:
                "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Developer Behind the Code
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left: Profile + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "360px",
                margin: "0 auto",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                marginBottom: "32px",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
              }}
            >
              <img
                src={
                  a.avatar ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face"
                }
                alt={a.name}
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  background: "rgba(5,5,5,0.85)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: "17px",
                    marginBottom: "2px",
                  }}
                >
                  {a.name}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "13px",
                  }}
                >
                  {a.roleLine}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "20px 16px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: "28px",
                      color: stat.color,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Education */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "100px",
                padding: "6px 14px",
                marginBottom: "24px",
                color: "#3B82F6",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <Code2 size={12} /> {a.badge}
            </div>

            <h3
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: 1.3,
                marginBottom: "20px",
              }}
            >
              {a.heading}
            </h3>

            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "15px",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              {a.paragraph1}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "15px",
                lineHeight: 1.8,
                marginBottom: "36px",
              }}
            >
              {a.paragraph2}
            </p>

            {/* Career Mission */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "20px",
                marginBottom: "32px",
                borderLeft: "3px solid #3B82F6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <Target size={16} color="#3B82F6" />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Career Mission
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                "{a.mission}"
              </p>
            </div>

            {/* Education Timeline */}
            <div>
              <h4
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: "16px",
                  marginBottom: "20px",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Education
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    style={{
                      display: "flex",
                      gap: "16px",
                      background: "rgba(255,255,255,0.03)",
                      border:
                        "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        flexShrink: 0,
                        background: `rgba(${edu.color === "#8B5CF6" ? "139,92,246" : "59,130,246"},0.15)`,
                        border: `1px solid ${edu.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <edu.icon size={20} color={edu.color} />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        <h5
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                          }}
                        >
                          {edu.title}
                        </h5>
                        <span
                          style={{
                            color: edu.color,
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          {edu.period}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.45)",
                          fontSize: "12px",
                          marginBottom: "6px",
                        }}
                      >
                        {edu.school}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "13px",
                          lineHeight: 1.5,
                        }}
                      >
                        {edu.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import { motion } from "motion/react";
import { BookOpen, AlertCircle, Lightbulb, Settings, TrendingUp, ArrowRight } from "lucide-react";

const cases = [
  {
    label: "Case Study 01",
    title: "E-Commerce Automation Saves 40 Hours/Week",
    client: "Logistics Company",
    industry: "E-Commerce",
    color: "#3B82F6",
    problem: "A mid-size e-commerce business was spending 40+ hours weekly manually processing orders, updating inventory, and sending customer notifications across 3 different platforms.",
    solution: "Built a Python automation suite using Celery and Redis that synchronizes orders, inventory, and notifications in real-time across all platforms via API integrations.",
    implementation: ["Python + Celery task queue", "Redis for message brokering", "REST API integrations with Shopify, QuickBooks", "Automated email/SMS via Twilio", "Error monitoring with Sentry"],
    outcome: "Reduced manual work from 40 hrs/week to under 2 hrs. Order processing time dropped from 4 hours to 8 minutes. Client ROI achieved in 3 weeks.",
    metrics: [{ label: "Time Saved", value: "95%" }, { label: "Error Rate", value: "-99%" }, { label: "ROI", value: "3 weeks" }],
  },
  {
    label: "Case Study 02",
    title: "AI Chatbot Handles 80% of Support Tickets",
    client: "SaaS Startup",
    industry: "Technology",
    color: "#8B5CF6",
    problem: "A SaaS startup's 2-person support team was overwhelmed with 300+ daily tickets, causing 48+ hour response times and high customer churn.",
    solution: "Developed a GPT-4 powered chatbot trained on their documentation and ticket history, integrated with their existing help desk via API.",
    implementation: ["OpenAI GPT-4 API", "Pinecone vector database for context", "Fine-tuning on historical tickets", "Zendesk API integration", "Human escalation workflow"],
    outcome: "Chatbot handles 80% of tickets automatically. Response time dropped from 48 hours to under 2 minutes. Support team now focuses only on complex issues.",
    metrics: [{ label: "Tickets Resolved", value: "80%" }, { label: "Response Time", value: "2 min" }, { label: "Team Load", value: "-75%" }],
  },
  {
    label: "Case Study 03",
    title: "Data Pipeline Surfaces Hidden Revenue Opportunities",
    client: "Retail Chain",
    industry: "Retail Analytics",
    color: "#06B6D4",
    problem: "A retail chain had data scattered across 5 systems with no way to consolidate or analyze it. Decision-makers were flying blind on inventory and sales trends.",
    solution: "Built an ETL pipeline with Pandas and Airflow that aggregates all data into a PostgreSQL warehouse, with a Streamlit dashboard for live reporting.",
    implementation: ["Apache Airflow for orchestration", "Pandas ETL transformations", "PostgreSQL data warehouse", "Streamlit analytics dashboard", "Automated weekly reports via email"],
    outcome: "Identified $180K in overstocked inventory. Revealed top 3 underperforming locations. Dashboard used daily by C-suite. 6x ROI in first quarter.",
    metrics: [{ label: "Revenue Found", value: "$180K" }, { label: "Data Sources", value: "5 merged" }, { label: "ROI", value: "6x" }],
  },
];

const stepIcons = [AlertCircle, Lightbulb, Settings, TrendingUp];
const stepLabels = ["Problem", "Solution", "Implementation", "Outcome"];
const stepColors = ["#EF4444", "#F59E0B", "#3B82F6", "#22C55E"];

export function CaseStudies() {
  return (
    <section style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "100px", padding: "5px 14px", marginBottom: "20px",
            color: "#3B82F6", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            <BookOpen size={12} /> Case Studies
          </span>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 48px)", marginBottom: "16px",
            background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Real Problems. Real Solutions.</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>How I've helped businesses transform with code.</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {cases.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px", overflow: "hidden",
                borderLeft: `3px solid ${cs.color}`,
              }}
            >
              {/* Header */}
              <div style={{
                padding: "28px 32px",
                background: `linear-gradient(135deg, ${cs.color}10, transparent)`,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px",
              }}>
                <div>
                  <span style={{ color: cs.color, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>{cs.label}</span>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "22px" }}>{cs.title}</h3>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "5px 14px", borderRadius: "100px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{cs.client}</span>
                  <span style={{ background: `${cs.color}15`, border: `1px solid ${cs.color}25`, padding: "5px 14px", borderRadius: "100px", fontSize: "12px", color: cs.color }}>{cs.industry}</span>
                </div>
              </div>

              {/* Metrics bar */}
              <div style={{
                display: "flex", padding: "20px 32px",
                background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.05)",
                gap: "0", flexWrap: "wrap",
              }}>
                {cs.metrics.map((m, j) => (
                  <div key={j} style={{
                    padding: "0 24px", textAlign: "center",
                    borderRight: j < cs.metrics.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    flex: 1, minWidth: "80px",
                  }}>
                    <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "22px", color: cs.color }}>{m.value}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", fontWeight: 500 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div style={{ padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                {[cs.problem, cs.solution, cs.implementation, cs.outcome].map((content, j) => {
                  const StepIcon = stepIcons[j];
                  return (
                    <div key={j}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <div style={{
                          width: "28px", height: "28px", borderRadius: "8px",
                          background: `${stepColors[j]}15`, border: `1px solid ${stepColors[j]}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <StepIcon size={14} color={stepColors[j]} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: "13px", color: stepColors[j], textTransform: "uppercase", letterSpacing: "0.05em" }}>{stepLabels[j]}</span>
                      </div>
                      {j === 2 ? (
                        <ul style={{ paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                          {(content as string[]).map((item, k) => (
                            <li key={k} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "6px" }}>
                              <ArrowRight size={11} color={cs.color} style={{ marginTop: "3px", flexShrink: 0 }} />{item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.7 }}>{content as string}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

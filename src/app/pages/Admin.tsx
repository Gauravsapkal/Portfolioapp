import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, FolderOpen, MessageSquare, Award, Mail,
  LogOut, Plus, Edit2, Trash2, Eye, TrendingUp, Users, Star,
  BarChart2, Activity, Lock, User, ChevronRight, X, Check, Send, FileText,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useNavigate } from "react-router";
import { usePortfolio, Project, Testimonial } from "../store/PortfolioContext";
import { ContentEditor } from "../components/admin/ContentEditor";

const analyticsData = [
  { month: "Jan", visitors: 420, leads: 12 },
  { month: "Feb", visitors: 580, leads: 18 },
  { month: "Mar", visitors: 750, leads: 24 },
  { month: "Apr", visitors: 690, leads: 20 },
  { month: "May", visitors: 930, leads: 31 },
  { month: "Jun", visitors: 1100, leads: 38 },
];

const pieData = [
  { name: "AI Projects", value: 35, color: "#8B5CF6" },
  { name: "Python", value: 30, color: "#3B82F6" },
  { name: "Data Science", value: 20, color: "#06B6D4" },
  { name: "Web Apps", value: 15, color: "#10B981" },
];

const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "24px",
  backdropFilter: "blur(10px)",
};

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: "8px",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box",
  fontFamily: "Inter, sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.55)", fontSize: "11px",
  fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em",
};

function StatCard({ icon: Icon, label, value, color, change }: { icon: any; label: string; value: string; color: string; change: string }) {
  return (
    <div style={{ ...glass, display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: `${color}15`, border: `1px solid ${color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} color={color} />
        </div>
        <span style={{ color: "#22C55E", fontSize: "12px", fontWeight: 600, background: "rgba(34,197,94,0.1)", padding: "3px 8px", borderRadius: "100px" }}>{change}</span>
      </div>
      <div>
        <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "28px", marginBottom: "4px" }}>{value}</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{label}</div>
      </div>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.3)", color: "#22C55E",
  padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
};
const cancelBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171",
  padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
};

type Tab = "dashboard" | "content" | "projects" | "testimonials" | "messages" | "certifications" | "analytics";

const emptyProject = { title: "", tags: "", status: "Draft" as const, description: "" };
const emptyTestimonial = { name: "", role: "", rating: 5, status: "Published" as const, quote: "" };

export function Admin() {
  const navigate = useNavigate();
  const store = usePortfolio();

  const isLoggedIn = store.isAdmin;
  const [loginError, setLoginError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Project form state (handles both add + edit)
  const [projectForm, setProjectForm] = useState<typeof emptyProject>(emptyProject);
  const [projectEditId, setProjectEditId] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Testimonial form state (handles both add + edit)
  const [testiForm, setTestiForm] = useState<typeof emptyTestimonial>(emptyTestimonial);
  const [testiEditId, setTestiEditId] = useState<string | null>(null);
  const [showTestiForm, setShowTestiForm] = useState(false);

  // Selected message for detail view
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setLoginError("");
    const { error } = await store.signIn(loginForm.email.trim(), loginForm.password);
    if (error) setLoginError("Invalid credentials. Use admin@gaurav.dev / admin123");
    setSigningIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#050505", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.1), transparent 60%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: "100%", maxWidth: "420px", padding: "32px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px", backdropFilter: "blur(20px)",
            position: "relative", zIndex: 1, margin: "0 16px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", boxShadow: "0 0 30px rgba(59,130,246,0.4)",
            }}>
              <Lock size={24} color="white" />
            </div>
            <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "24px", marginBottom: "6px" }}>Admin Access</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Email</label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="email" required placeholder="admin@gaurav.dev"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  style={{ ...fieldStyle, padding: "11px 12px 11px 36px", fontSize: "14px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="password" required placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={{ ...fieldStyle, padding: "11px 12px 11px 36px", fontSize: "14px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </div>

            {loginError && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px", padding: "10px 14px", color: "#F87171", fontSize: "13px",
              }}>{loginError}</div>
            )}

            <button
              type="submit"
              style={{
                width: "100%", padding: "13px",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                border: "none", borderRadius: "12px", color: "white",
                fontSize: "15px", fontWeight: 700, cursor: "pointer",
                boxShadow: "0 0 25px rgba(59,130,246,0.3)", marginTop: "4px",
                opacity: signingIn ? 0.6 : 1,
              }}
              disabled={signingIn}
            >{signingIn ? "Signing in…" : "Sign In"}</button>

            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>
              Demo: admin@gaurav.dev / admin123
            </p>
          </form>

          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%", marginTop: "16px", padding: "10px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px", color: "rgba(255,255,255,0.5)", fontSize: "13px", cursor: "pointer",
            }}
          >← Back to Portfolio</button>
        </motion.div>
      </div>
    );
  }

  const newMessages = store.messages.filter((m) => m.status === "New").length;

  const navItems: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "content", label: "Site Content", icon: FileText },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "messages", label: "Messages", icon: Mail, badge: newMessages },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  // --- Project handlers ---
  const startAddProject = () => {
    setProjectForm(emptyProject);
    setProjectEditId(null);
    setShowProjectForm(true);
  };
  const startEditProject = (p: Project) => {
    setProjectForm({ title: p.title, tags: p.tags, status: p.status, description: p.description });
    setProjectEditId(p.id);
    setShowProjectForm(true);
  };
  const saveProject = async () => {
    if (!projectForm.title.trim()) return;
    try {
      if (projectEditId !== null) {
        await store.updateProject(projectEditId, projectForm);
      } else {
        await store.addProject(projectForm);
      }
      setShowProjectForm(false);
      setProjectEditId(null);
      setProjectForm(emptyProject);
    } catch (err) {
      alert(`Could not save project: ${err}`);
    }
  };

  // --- Testimonial handlers ---
  const startAddTesti = () => {
    setTestiForm(emptyTestimonial);
    setTestiEditId(null);
    setShowTestiForm(true);
  };
  const startEditTesti = (t: Testimonial) => {
    setTestiForm({ name: t.name, role: t.role, rating: t.rating, status: t.status, quote: t.quote });
    setTestiEditId(t.id);
    setShowTestiForm(true);
  };
  const saveTesti = async () => {
    if (!testiForm.name.trim()) return;
    try {
      if (testiEditId !== null) {
        await store.updateTestimonial(testiEditId, testiForm);
      } else {
        await store.addTestimonial(testiForm);
      }
      setShowTestiForm(false);
      setTestiEditId(null);
      setTestiForm(emptyTestimonial);
    } catch (err) {
      alert(`Could not save testimonial: ${err}`);
    }
  };

  const openMessage = store.messages.find((m) => m.id === openMessageId) || null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050505" }}>
      {/* Sidebar */}
      <div style={{
        width: "240px", flexShrink: 0,
        background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 16px", display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 8px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "14px", color: "white",
          }}>GS</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "13px" }}>Admin Panel</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>gaurav.dev</p>
          </div>
        </div>

        <nav style={{ flex: 1, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "10px",
                  background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                  border: isActive ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
                  color: isActive ? "#3B82F6" : "rgba(255,255,255,0.55)",
                  fontSize: "13px", fontWeight: isActive ? 600 : 500, cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={16} /> {label}
                {badge ? (
                  <span style={{
                    marginLeft: "auto", background: "#3B82F6", color: "white", fontSize: "10px",
                    fontWeight: 700, borderRadius: "100px", minWidth: "18px", height: "18px",
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
                  }}>{badge}</span>
                ) : isActive ? <ChevronRight size={13} style={{ marginLeft: "auto" }} /> : null}
              </button>
            );
          })}
        </nav>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "10px",
              background: "transparent", border: "1px solid transparent", color: "rgba(255,255,255,0.4)",
              fontSize: "12px", cursor: "pointer",
            }}
          ><Eye size={14} /> View Portfolio</button>
          <button
            onClick={() => store.signOut()}
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "10px",
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
              color: "#F87171", fontSize: "12px", cursor: "pointer",
            }}
          ><LogOut size={14} /> Sign Out</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "dashboard" && (
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "6px" }}>Dashboard</h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "32px" }}>Welcome back! Here's an overview of your portfolio performance.</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                  <StatCard icon={Eye} label="Monthly Visitors" value="1,100" color="#3B82F6" change="+18%" />
                  <StatCard icon={Mail} label="New Messages" value={String(newMessages)} color="#8B5CF6" change={`${store.messages.length} total`} />
                  <StatCard icon={FolderOpen} label="Projects" value={String(store.projects.length)} color="#06B6D4" change="+2" />
                  <StatCard icon={Star} label="Testimonials" value={String(store.testimonials.length)} color="#F59E0B" change="★ 5.0" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
                  <div style={glass}>
                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", marginBottom: "24px" }}>Visitor & Lead Trends</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                        <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px" }}
                          labelStyle={{ color: "white" }}
                        />
                        <Area type="monotone" dataKey="visitors" stroke="#3B82F6" fill="url(#colorVisitors)" strokeWidth={2} />
                        <Area type="monotone" dataKey="leads" stroke="#8B5CF6" fill="url(#colorLeads)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={glass}>
                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", marginBottom: "24px" }}>Project Categories</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                          {pieData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {pieData.map((p) => (
                        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: p.color, flexShrink: 0 }} />
                          <span style={{ color: "rgba(255,255,255,0.6)" }}>{p.name}</span>
                          <span style={{ color: p.color, fontWeight: 600, marginLeft: "auto" }}>{p.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "content" && <ContentEditor />}

            {activeTab === "projects" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "4px" }}>Projects</h1>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>{store.projects.length} total projects</p>
                  </div>
                  <button
                    onClick={startAddProject}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "white",
                      padding: "10px 20px", borderRadius: "10px", border: "none",
                      fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    <Plus size={15} /> Add Project
                  </button>
                </div>

                {showProjectForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ ...glass, marginBottom: "24px", borderColor: "rgba(59,130,246,0.2)" }}
                  >
                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>
                      {projectEditId !== null ? "Edit Project" : "New Project"}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={labelStyle}>Title</label>
                        <input placeholder="Project Title" value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} style={fieldStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Tags</label>
                        <input placeholder="AI, Python" value={projectForm.tags}
                          onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} style={fieldStyle} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={labelStyle}>Description</label>
                      <textarea rows={3} placeholder="Short description of the project..." value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        style={{ ...fieldStyle, resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Status</label>
                        <select value={projectForm.status}
                          onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as Project["status"] })}
                          style={fieldStyle}>
                          <option value="Draft">Draft</option>
                          <option value="Published">Published</option>
                        </select>
                      </div>
                      <button onClick={saveProject} style={primaryBtn}><Check size={14} /> Save</button>
                      <button onClick={() => { setShowProjectForm(false); setProjectEditId(null); }} style={cancelBtn}><X size={14} /> Cancel</button>
                    </div>
                  </motion.div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {store.projects.map((p) => (
                    <div key={p.id} style={{
                      ...glass, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
                      borderColor: projectEditId === p.id ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)",
                    }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{p.title}</p>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginBottom: "4px" }}>{p.tags}</p>
                        {p.description && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", lineHeight: 1.5 }}>{p.description}</p>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}><Eye size={12} style={{ display: "inline", marginRight: "4px" }} />{p.views} views</span>
                        <span style={{
                          padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                          background: p.status === "Published" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                          color: p.status === "Published" ? "#22C55E" : "#F59E0B",
                          border: `1px solid ${p.status === "Published" ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.25)"}`,
                        }}>{p.status}</span>
                        <button onClick={() => startEditProject(p)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#3B82F6", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                          <Edit2 size={12} /> Edit
                        </button>
                        <button onClick={() => store.deleteProject(p.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "testimonials" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "4px" }}>Testimonials</h1>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>{store.testimonials.length} testimonials</p>
                  </div>
                  <button
                    onClick={startAddTesti}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "white",
                      padding: "10px 20px", borderRadius: "10px", border: "none",
                      fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    <Plus size={15} /> Add Testimonial
                  </button>
                </div>

                {showTestiForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ ...glass, marginBottom: "24px", borderColor: "rgba(59,130,246,0.2)" }}
                  >
                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>
                      {testiEditId !== null ? "Edit Testimonial" : "New Testimonial"}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={labelStyle}>Name</label>
                        <input placeholder="Client name" value={testiForm.name}
                          onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })} style={fieldStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Role</label>
                        <input placeholder="CEO, Company" value={testiForm.role}
                          onChange={(e) => setTestiForm({ ...testiForm, role: e.target.value })} style={fieldStyle} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={labelStyle}>Quote</label>
                      <textarea rows={3} placeholder="What the client said..." value={testiForm.quote}
                        onChange={(e) => setTestiForm({ ...testiForm, quote: e.target.value })}
                        style={{ ...fieldStyle, resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                      <div>
                        <label style={labelStyle}>Rating</label>
                        <select value={testiForm.rating}
                          onChange={(e) => setTestiForm({ ...testiForm, rating: Number(e.target.value) })}
                          style={fieldStyle}>
                          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ★</option>)}
                        </select>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Status</label>
                        <select value={testiForm.status}
                          onChange={(e) => setTestiForm({ ...testiForm, status: e.target.value as Testimonial["status"] })}
                          style={fieldStyle}>
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                      <button onClick={saveTesti} style={primaryBtn}><Check size={14} /> Save</button>
                      <button onClick={() => { setShowTestiForm(false); setTestiEditId(null); }} style={cancelBtn}><X size={14} /> Cancel</button>
                    </div>
                  </motion.div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {store.testimonials.map((t) => (
                    <div key={t.id} style={{
                      ...glass, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
                      borderColor: testiEditId === t.id ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)",
                    }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "3px" }}>{t.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginBottom: "4px" }}>{t.role}</p>
                        {t.quote && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontStyle: "italic", lineHeight: 1.5 }}>"{t.quote}"</p>}
                      </div>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                      </div>
                      <span style={{
                        padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                        background: t.status === "Published" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                        color: t.status === "Published" ? "#22C55E" : "#F59E0B",
                        border: `1px solid ${t.status === "Published" ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.25)"}`,
                      }}>{t.status}</span>
                      <button onClick={() => startEditTesti(t)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#3B82F6", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => store.deleteTestimonial(t.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "4px" }}>Messages</h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "28px" }}>
                  {store.messages.length} requests · {newMessages} new — submitted from the contact form
                </p>
                {store.messages.length === 0 ? (
                  <div style={{ ...glass, textAlign: "center", padding: "60px 32px" }}>
                    <Mail size={48} color="rgba(255,255,255,0.2)" style={{ margin: "0 auto 16px", display: "block" }} />
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>No messages yet.</p>
                    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px", marginTop: "8px" }}>Submissions from the portfolio contact form will appear here.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {store.messages.map((c) => (
                      <div key={c.id} style={{
                        ...glass, cursor: "pointer",
                        borderColor: c.status === "New" ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.08)",
                      }} onClick={() => setOpenMessageId(c.id)}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                          <div style={{ flex: 1, minWidth: "200px" }}>
                            <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "3px" }}>
                              {c.name} {c.company && <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>· {c.company}</span>}
                            </p>
                            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>{c.email}</p>
                          </div>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{c.budget}</span>
                          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>{c.date}</span>
                          <span style={{
                            padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                            background: c.status === "New" ? "rgba(59,130,246,0.15)" : "rgba(34,197,94,0.15)",
                            color: c.status === "New" ? "#3B82F6" : "#22C55E",
                            border: `1px solid ${c.status === "New" ? "rgba(59,130,246,0.25)" : "rgba(34,197,94,0.25)"}`,
                          }}>{c.status}</span>
                        </div>
                        <p style={{
                          color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "12px", lineHeight: 1.6,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{c.details}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "certifications" && (
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "28px" }}>Certifications</h1>
                <div style={{ ...glass, textAlign: "center", padding: "60px 32px" }}>
                  <Award size={48} color="rgba(255,255,255,0.2)" style={{ margin: "0 auto 16px", display: "block" }} />
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>Certification management coming soon.</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px", marginTop: "8px" }}>Connect a backend to enable full CRUD for certifications.</p>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "28px" }}>Analytics</h1>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                  <StatCard icon={TrendingUp} label="Monthly Visitors" value="1,100" color="#3B82F6" change="+18%" />
                  <StatCard icon={Activity} label="Leads This Month" value="38" color="#8B5CF6" change="+23%" />
                  <StatCard icon={Eye} label="Total Project Views" value="1,847" color="#06B6D4" change="+12%" />
                  <StatCard icon={Users} label="Return Visitors" value="34%" color="#10B981" change="+5%" />
                </div>

                <div style={{ ...glass, marginBottom: "24px" }}>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", marginBottom: "24px" }}>Monthly Leads vs Visitors</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={analyticsData} barGap={6}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px" }} />
                      <Bar dataKey="visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.8} />
                      <Bar dataKey="leads" fill="#8B5CF6" radius={[4, 4, 0, 0]} opacity={0.8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Message detail modal */}
      <AnimatePresence>
        {openMessage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenMessageId(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: "520px", background: "#0c0c0e",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div>
                  <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "20px", marginBottom: "4px" }}>{openMessage.name}</h2>
                  <a href={`mailto:${openMessage.email}`} style={{ color: "#3B82F6", fontSize: "13px" }}>{openMessage.email}</a>
                </div>
                <button onClick={() => setOpenMessageId(null)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: "8px", padding: "6px", cursor: "pointer", display: "flex" }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
                {openMessage.company && (
                  <div><p style={labelStyle}>Company</p><p style={{ fontSize: "13px" }}>{openMessage.company}</p></div>
                )}
                <div><p style={labelStyle}>Budget</p><p style={{ fontSize: "13px" }}>{openMessage.budget}</p></div>
                <div><p style={labelStyle}>Received</p><p style={{ fontSize: "13px" }}>{openMessage.date}</p></div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <p style={labelStyle}>Message</p>
                <div style={{ ...glass, padding: "16px", marginTop: "6px" }}>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{openMessage.details}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href={`mailto:${openMessage.email}`} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "white",
                  padding: "11px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                }}><Send size={14} /> Reply by Email</a>
                {openMessage.status === "New" && (
                  <button onClick={() => store.updateMessage(openMessage.id, { status: "Replied" })} style={{ ...primaryBtn, padding: "11px 18px" }}>
                    <Check size={14} /> Mark Replied
                  </button>
                )}
                <button onClick={() => { store.deleteMessage(openMessage.id); setOpenMessageId(null); }} style={{ ...cancelBtn, padding: "11px 18px" }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, FolderOpen, MessageSquare, Award, Mail,
  LogOut, Plus, Edit2, Trash2, Eye, TrendingUp, Users, Star,
  BarChart2, Activity, Lock, User, ChevronRight, X, Check,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useNavigate } from "react-router";

const ADMIN_EMAIL = "admin@gaurav.dev";
const ADMIN_PASSWORD = "admin123";

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

const initialProjects = [
  { id: 1, title: "AI Customer Support Chatbot", tags: "AI, Python", status: "Published", views: 342 },
  { id: 2, title: "Sales Analytics Dashboard", tags: "Data Science", status: "Published", views: 280 },
  { id: 3, title: "E-Commerce Price Tracker", tags: "Automation", status: "Published", views: 195 },
  { id: 4, title: "ML Stock Predictor", tags: "AI, ML", status: "Draft", views: 0 },
];

const initialTestimonials = [
  { id: 1, name: "Sarah Mitchell", role: "CEO, TechFlow", rating: 5, status: "Published" },
  { id: 2, name: "Marcus Chen", role: "CTO, DataDrive", rating: 5, status: "Published" },
  { id: 3, name: "Priya Sharma", role: "Head Analytics", rating: 5, status: "Published" },
];

const initialContacts = [
  { id: 1, name: "Alex Turner", email: "alex@startup.com", budget: "$1,000–$5,000", status: "New", date: "2024-12-10" },
  { id: 2, name: "Maria Santos", email: "maria@agency.com", budget: "$5,000–$10,000", status: "Replied", date: "2024-12-09" },
  { id: 3, name: "Kai Nakamura", email: "kai@corp.com", budget: "$10,000+", status: "New", date: "2024-12-08" },
];

const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "24px",
  backdropFilter: "blur(10px)",
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

type Tab = "dashboard" | "projects" | "testimonials" | "contacts" | "certifications" | "analytics";

export function Admin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [projects, setProjects] = useState(initialProjects);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [contacts, setContacts] = useState(initialContacts);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", tags: "", status: "Draft" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Use admin@gaurav.dev / admin123");
    }
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
              <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>EMAIL</label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="email" required placeholder="admin@gaurav.dev"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 12px 11px 36px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="password" required placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 12px 11px 36px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box",
                    fontFamily: "Inter, sans-serif",
                  }}
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
              }}
            >Sign In</button>

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

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "contacts", label: "Contacts", icon: Mail },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  const addProject = () => {
    if (!newProject.title) return;
    const id = Date.now();
    setProjects([...projects, { ...newProject, id, views: 0 }]);
    setNewProject({ title: "", tags: "", status: "Draft" });
    setShowProjectForm(false);
  };

  const deleteProject = (id: number) => setProjects(projects.filter((p) => p.id !== id));
  const deleteTestimonial = (id: number) => setTestimonials(testimonials.filter((t) => t.id !== id));
  const deleteContact = (id: number) => setContacts(contacts.filter((c) => c.id !== id));
  const markContactReplied = (id: number) => setContacts(contacts.map((c) => c.id === id ? { ...c, status: "Replied" } : c));

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
          {navItems.map(({ id, label, icon: Icon }) => {
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
                {isActive && <ChevronRight size={13} style={{ marginLeft: "auto" }} />}
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
            onClick={() => setIsLoggedIn(false)}
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
                  <StatCard icon={Users} label="Total Leads" value="143" color="#8B5CF6" change="+23%" />
                  <StatCard icon={FolderOpen} label="Projects" value={String(projects.length)} color="#06B6D4" change="+2" />
                  <StatCard icon={Star} label="Avg Rating" value="5.0" color="#F59E0B" change="★ Perfect" />
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
                          {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
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

            {activeTab === "projects" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "4px" }}>Projects</h1>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>{projects.length} total projects</p>
                  </div>
                  <button
                    onClick={() => setShowProjectForm(!showProjectForm)}
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
                    <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "16px", marginBottom: "16px" }}>New Project</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <input
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif" }}
                      />
                      <input
                        placeholder="Tags (e.g. AI, Python)"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                        style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select
                        value={newProject.status}
                        onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                        style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "13px", outline: "none", flex: 1 }}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                      <button onClick={addProject} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.3)", color: "#22C55E", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                        <Check size={14} /> Save
                      </button>
                      <button onClick={() => setShowProjectForm(false)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {projects.map((p) => (
                    <div key={p.id} style={{
                      ...glass, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
                      borderColor: editingId === p.id ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)",
                    }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{p.title}</p>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>{p.tags}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}><Eye size={12} style={{ display: "inline", marginRight: "4px" }} />{p.views} views</span>
                        <span style={{
                          padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                          background: p.status === "Published" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                          color: p.status === "Published" ? "#22C55E" : "#F59E0B",
                          border: `1px solid ${p.status === "Published" ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.25)"}`,
                        }}>{p.status}</span>
                        <button onClick={() => setEditingId(editingId === p.id ? null : p.id)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#3B82F6", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                          <Edit2 size={12} /> Edit
                        </button>
                        <button onClick={() => deleteProject(p.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
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
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "28px" }}>Testimonials</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {testimonials.map((t) => (
                    <div key={t.id} style={{ ...glass, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "3px" }}>{t.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>{t.role}</p>
                      </div>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                      </div>
                      <span style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600, background: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)" }}>{t.status}</span>
                      <button onClick={() => deleteTestimonial(t.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contacts" && (
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "28px" }}>Contact Requests</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {contacts.map((c) => (
                    <div key={c.id} style={{
                      ...glass, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
                      borderColor: c.status === "New" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.08)",
                    }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "3px" }}>{c.name}</p>
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
                      {c.status === "New" && (
                        <button onClick={() => markContactReplied(c.id)} style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22C55E", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
                          Mark Replied
                        </button>
                      )}
                      <button onClick={() => deleteContact(c.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "certifications" && (
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "28px" }}>Certifications</h1>
                <div style={{ ...glass, textAlign: "center", padding: "60px 32px" }}>
                  <Award size={48} color="rgba(255,255,255,0.2)" style={{ margin: "0 auto 16px", display: "block" }} />
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>Certification management coming soon.</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px", marginTop: "8px" }}>Connect Firebase to enable full CRUD for certifications.</p>
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
    </div>
  );
}

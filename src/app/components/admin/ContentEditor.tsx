import { useRef, useState } from "react";
import { Check, Plus, Trash2, RotateCcw, Save, Upload } from "lucide-react";
import { usePortfolio } from "../../store/PortfolioContext";
import { SiteContent, Stat, SkillCategory, defaultContent } from "../../store/siteContent";

// Reads a selected image file and downscales it to a compact JPEG data URL so
// it can be stored inline (in Supabase content or localStorage) without a bucket.
async function fileToResizedDataUrl(file: File, maxSize = 480): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error("Failed to decode image"));
    im.src = dataUrl;
  });
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.85);
}

const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "24px",
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
const sectionTitle: React.CSSProperties = {
  fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: "17px", marginBottom: "18px",
};

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle} />
      )}
    </div>
  );
}

function StatEditor({ stats, onChange }: { stats: Stat[]; onChange: (s: Stat[]) => void }) {
  const update = (i: number, patch: Partial<Stat>) => onChange(stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  return (
    <div>
      <label style={labelStyle}>Stats</label>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "8px" }}>
            <input value={s.value} placeholder="20+" onChange={(e) => update(i, { value: e.target.value })} style={{ ...fieldStyle, width: "90px" }} />
            <input value={s.label} placeholder="Label" onChange={(e) => update(i, { label: e.target.value })} style={fieldStyle} />
            <button onClick={() => onChange(stats.filter((_, idx) => idx !== i))} style={iconBtn("#F87171", "rgba(239,68,68,0.1)", "rgba(239,68,68,0.2)")}><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
      <button onClick={() => onChange([...stats, { value: "", label: "" }])} style={{ ...addBtn, marginTop: "8px" }}><Plus size={13} /> Add Stat</button>
    </div>
  );
}

const iconBtn = (color: string, bg: string, border: string): React.CSSProperties => ({
  background: bg, border: `1px solid ${border}`, color, borderRadius: "8px",
  padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0,
});
const addBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "6px",
  background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
  color: "#3B82F6", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
};

function SkillCategoryEditor({ cat, onChange, onRemove }: { cat: SkillCategory; onChange: (c: SkillCategory) => void; onRemove: () => void }) {
  const updateSkill = (i: number, patch: Partial<{ name: string; level: number }>) =>
    onChange({ ...cat, skills: cat.skills.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  return (
    <div style={{ ...glass, padding: "18px", marginBottom: "12px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input value={cat.label} onChange={(e) => onChange({ ...cat, label: e.target.value })} style={{ ...fieldStyle, fontWeight: 600 }} placeholder="Category name" />
        <button onClick={onRemove} style={iconBtn("#F87171", "rgba(239,68,68,0.1)", "rgba(239,68,68,0.2)")}><Trash2 size={14} /></button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {cat.skills.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input value={s.name} onChange={(e) => updateSkill(i, { name: e.target.value })} style={fieldStyle} placeholder="Skill name" />
            <input type="number" min={0} max={100} value={s.level} onChange={(e) => updateSkill(i, { level: Number(e.target.value) })} style={{ ...fieldStyle, width: "80px" }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>%</span>
            <button onClick={() => onChange({ ...cat, skills: cat.skills.filter((_, idx) => idx !== i) })} style={iconBtn("#F87171", "rgba(239,68,68,0.1)", "rgba(239,68,68,0.2)")}><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
      <button onClick={() => onChange({ ...cat, skills: [...cat.skills, { name: "", level: 50 }] })} style={{ ...addBtn, marginTop: "10px" }}><Plus size={13} /> Add Skill</button>
    </div>
  );
}

export function ContentEditor() {
  const { content, updateContent } = usePortfolio();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setHero = (patch: Partial<SiteContent["hero"]>) => setDraft({ ...draft, hero: { ...draft.hero, ...patch } });
  const setAbout = (patch: Partial<SiteContent["about"]>) => setDraft({ ...draft, about: { ...draft.about, ...patch } });

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    setUploading(true);
    try {
      const url = await fileToResizedDataUrl(file);
      setAbout({ avatar: url });
    } catch (err) {
      alert(`Could not load that image: ${err}`);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateContent(draft);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert(`Could not save content: ${err}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: "26px", marginBottom: "4px" }}>Site Content</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>Edit your Hero, About, and Skills sections. Changes appear on the live site.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setDraft(defaultContent)} style={{ ...addBtn, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
            <RotateCcw size={13} /> Reset to defaults
          </button>
          <button onClick={save} disabled={saving} style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: saved ? "rgba(34,197,94,0.2)" : "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            border: saved ? "1px solid rgba(34,197,94,0.3)" : "none",
            color: saved ? "#22C55E" : "white", padding: "10px 22px", borderRadius: "10px",
            fontSize: "13px", fontWeight: 600, cursor: "pointer", opacity: saving ? 0.6 : 1,
          }}>
            {saved ? <><Check size={15} /> Saved</> : saving ? "Saving…" : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}>
        {/* HERO */}
        <div style={glass}>
          <h3 style={sectionTitle}>Hero Section</h3>
          <Field label="Availability badge" value={draft.hero.badge} onChange={(v) => setHero({ badge: v })} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Title — prefix" value={draft.hero.titlePrefix} onChange={(v) => setHero({ titlePrefix: v })} />
            <Field label="Title — highlight (gradient)" value={draft.hero.titleHighlight} onChange={(v) => setHero({ titleHighlight: v })} />
            <Field label="Title — line 2" value={draft.hero.titleLine2} onChange={(v) => setHero({ titleLine2: v })} />
            <Field label="Title — line 3" value={draft.hero.titleLine3} onChange={(v) => setHero({ titleLine3: v })} />
          </div>
          <Field label="Subtitle" value={draft.hero.subtitle} onChange={(v) => setHero({ subtitle: v })} textarea />
          <Field label="Primary button text" value={draft.hero.ctaPrimary} onChange={(v) => setHero({ ctaPrimary: v })} />
          <StatEditor stats={draft.hero.stats} onChange={(s) => setHero({ stats: s })} />
        </div>

        {/* ABOUT */}
        <div style={glass}>
          <h3 style={sectionTitle}>About Section</h3>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "4px", flexWrap: "wrap" }}>
            <div style={{ flexShrink: 0 }}>
              <label style={labelStyle}>Preview</label>
              <div style={{
                width: "96px", height: "120px", borderRadius: "12px", overflow: "hidden",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {draft.about.avatar ? (
                  <img src={draft.about.avatar} alt="Profile preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>No image</span>
                )}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "220px" }}>
              <label style={labelStyle}>Profile photo</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onPickFile}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                style={{ ...addBtn, opacity: uploading ? 0.6 : 1 }}
              >
                <Upload size={13} /> {uploading ? "Processing…" : "Upload from computer"}
              </button>
              <div style={{ marginTop: "12px" }}>
                <Field label="…or paste an image URL" value={(draft.about.avatar || "").startsWith("data:") ? "" : (draft.about.avatar || "")} onChange={(v) => setAbout({ avatar: v })} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginTop: "-6px" }}>
                {(draft.about.avatar || "").startsWith("data:")
                  ? "Using an uploaded image. Don't forget to click Save Changes."
                  : "Upload a photo from your device, or paste a direct image link. The preview updates instantly."}
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Name" value={draft.about.name} onChange={(v) => setAbout({ name: v })} />
            <Field label="Role line" value={draft.about.roleLine} onChange={(v) => setAbout({ roleLine: v })} />
          </div>
          <Field label="Badge" value={draft.about.badge} onChange={(v) => setAbout({ badge: v })} />
          <Field label="Heading" value={draft.about.heading} onChange={(v) => setAbout({ heading: v })} textarea />
          <Field label="Paragraph 1" value={draft.about.paragraph1} onChange={(v) => setAbout({ paragraph1: v })} textarea />
          <Field label="Paragraph 2" value={draft.about.paragraph2} onChange={(v) => setAbout({ paragraph2: v })} textarea />
          <Field label="Career mission" value={draft.about.mission} onChange={(v) => setAbout({ mission: v })} textarea />
          <StatEditor stats={draft.about.stats} onChange={(s) => setAbout({ stats: s })} />
        </div>

        {/* SKILLS */}
        <div style={glass}>
          <h3 style={sectionTitle}>Skills Section</h3>
          {draft.skills.map((cat, i) => (
            <SkillCategoryEditor
              key={cat.id}
              cat={cat}
              onChange={(c) => setDraft({ ...draft, skills: draft.skills.map((x, idx) => (idx === i ? c : x)) })}
              onRemove={() => setDraft({ ...draft, skills: draft.skills.filter((_, idx) => idx !== i) })}
            />
          ))}
          <button
            onClick={() => setDraft({ ...draft, skills: [...draft.skills, { id: `cat-${Date.now()}`, label: "New Category", skills: [] }] })}
            style={addBtn}
          ><Plus size={13} /> Add Category</button>
        </div>
      </div>
    </div>
  );
}

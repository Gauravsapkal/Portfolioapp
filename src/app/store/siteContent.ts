// Editable site content managed from the admin panel.
// The public Hero / About / Skills sections read from here, falling back to
// these defaults (which mirror the original hard-coded copy).

export type Stat = { value: string; label: string };
export type Skill = { name: string; level: number };
export type SkillCategory = { id: string; label: string; skills: Skill[] };

export type HeroContent = {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  ctaPrimary: string;
  stats: Stat[];
};

export type AboutContent = {
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  mission: string;
  name: string;
  roleLine: string;
  avatar: string;
  stats: Stat[];
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillCategory[];
};

export const defaultContent: SiteContent = {
  hero: {
    badge: "Available for Freelance Work",
    titlePrefix: "I Build ",
    titleHighlight: "AI-Powered Solutions,",
    titleLine2: "Python Automation & Data Systems",
    titleLine3: "That Save Time.",
    subtitle:
      "Helping startups, businesses, and entrepreneurs automate workflows, analyze data, and build intelligent software solutions.",
    ctaPrimary: "Hire Me",
    stats: [
      { value: "20+", label: "Projects Completed" },
      { value: "10+", label: "Technologies Used" },
      { value: "100%", label: "Client Satisfaction" },
    ],
  },
  about: {
    badge: "Python · AI · Data Science",
    heading: "Building Intelligent Systems That Drive Real Business Value",
    paragraph1:
      "I'm Gaurav Sapkal, a Python Developer and AI Solutions Engineer passionate about automating the complex and making data speak. I specialize in turning raw ideas into working software — from AI chatbots to automated workflows.",
    paragraph2:
      "My mission is simple: build technology that saves time and creates value. Whether you're a startup looking for a Python automation script or an enterprise needing a full data pipeline, I deliver with speed and precision.",
    mission:
      "To leverage AI and Python to automate the mundane, unlock insights from data, and build software solutions that genuinely transform how businesses operate.",
    name: "Gaurav Sapkal",
    roleLine: "Python Dev · AI Builder · Data Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    stats: [
      { value: "20+", label: "Projects Built" },
      { value: "10+", label: "Technologies" },
      { value: "2+", label: "Years Learning" },
      { value: "95%", label: "Problem Solving" },
    ],
  },
  skills: [
    { id: "programming", label: "Programming", skills: [
      { name: "Python", level: 90 }, { name: "JavaScript", level: 75 }, { name: "TypeScript", level: 65 }, { name: "SQL", level: 80 }, { name: "Bash/Shell", level: 60 },
    ] },
    { id: "frontend", label: "Frontend", skills: [
      { name: "React", level: 75 }, { name: "Next.js", level: 65 }, { name: "HTML/CSS", level: 85 }, { name: "Tailwind CSS", level: 80 }, { name: "Streamlit", level: 88 },
    ] },
    { id: "backend", label: "Backend", skills: [
      { name: "FastAPI", level: 85 }, { name: "Django", level: 70 }, { name: "Flask", level: 80 }, { name: "REST APIs", level: 90 }, { name: "Firebase", level: 75 },
    ] },
    { id: "database", label: "Database", skills: [
      { name: "PostgreSQL", level: 78 }, { name: "MongoDB", level: 70 }, { name: "Firebase Firestore", level: 80 }, { name: "Redis", level: 65 }, { name: "MySQL", level: 75 },
    ] },
    { id: "ai-ml", label: "AI / ML", skills: [
      { name: "Machine Learning", level: 82 }, { name: "TensorFlow", level: 70 }, { name: "Scikit-learn", level: 85 }, { name: "Pandas / NumPy", level: 92 }, { name: "OpenAI API", level: 88 },
    ] },
    { id: "tools", label: "Tools", skills: [
      { name: "Git / GitHub", level: 88 }, { name: "Docker", level: 65 }, { name: "Airflow", level: 70 }, { name: "Celery / Redis", level: 72 }, { name: "Linux / CLI", level: 78 },
    ] },
  ],
};

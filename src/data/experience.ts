export interface ExperienceData {
  company: string;
  role: string;
  tagline: string;
  duration: string;
  description: string;
}

export const experiences: ExperienceData[] = [
  {
    company: "QUAZOR",
    role: "Software Engineer Intern",
    tagline: "AI Systems & Backend",
    duration: "SEPT 2025 — DEC 2025",
    description: "Worked on backend workflows and REST APIs supporting AI-powered product systems. Integrated LLM calls, set up vectorized search databases, and built resilient server-side components."
  },
  {
    company: "CENTRE FOR QUALITY & FOOD SYSTEMS",
    role: "Software Engineer Intern",
    tagline: "Government Digital Initiative",
    duration: "DEC 2025 — JAN 2026",
    description: "Built backend-integrated systems for a government-linked digital initiative, ensuring high reliability, standard API conventions, and seamless data processing workflows."
  },
  {
    company: "GUD ROOTS",
    role: "Software Engineer",
    tagline: "Backend Systems",
    duration: "JUL 2025 — AUG 2025",
    description: "Worked on backend systems and application performance optimization, improving database queries, optimizing APIs, and significantly lowering server load latency."
  }
];

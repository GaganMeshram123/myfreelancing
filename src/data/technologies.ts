export interface TechnologyData {
  name: string;
  category: string;
}

export const technologies: TechnologyData[] = [
  { name: "Python", category: "PROGRAMMING" },
  { name: "C++", category: "SYSTEM PROGRAMMING" },
  { name: "TypeScript", category: "FRONTEND & BACKEND" },
  { name: "React", category: "FRONTEND FRAMEWORK" },
  { name: "Node.js", category: "BACKEND RUNTIME" },
  { name: "FastAPI", category: "BACKEND API" },
  { name: "LangChain", category: "AI FRAMEWORK" },
  { name: "LangGraph", category: "AI ORCHESTRATION" },
  { name: "PyTorch", category: "DEEP LEARNING" },
  { name: "Hugging Face", category: "AI MODELS" },
  { name: "PostgreSQL", category: "DATABASE" },
  { name: "ChromaDB", category: "VECTOR STORE" },
  { name: "FAISS", category: "VECTOR INDEX" },
  { name: "Docker", category: "CONTAINERIZATION" },
  { name: "Git", category: "VERSION CONTROL" },
  { name: "Linux", category: "OPERATING SYSTEM" }
];

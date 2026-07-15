export interface ServiceData {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
}

export const services: ServiceData[] = [
  {
    number: "01",
    title: "AI & AGENTIC SYSTEMS",
    description: "Building AI-powered applications using LLMs, Agentic RAG, AI Agents, LangGraph, and vector databases.",
    capabilities: [
      "Agentic RAG Systems",
      "AI Agents",
      "LLM Integration",
      "Semantic Search",
      "Document Intelligence"
    ]
  },
  {
    number: "02",
    title: "FULL STACK PRODUCT DEVELOPMENT",
    description: "Building modern scalable web applications with strong frontend and backend architecture.",
    capabilities: [
      "React Applications",
      "Backend APIs",
      "Authentication",
      "Database Design",
      "Full Stack Products"
    ]
  },
  {
    number: "03",
    title: "E-COMMERCE & PAYMENT INTEGRATION",
    description: "Building modern commerce experiences with product workflows, cart systems, checkout experiences, and payment integrations for consumer brands and businesses.",
    capabilities: [
      "E-Commerce Development",
      "Shopping Workflows",
      "Cart & Checkout",
      "Razorpay Integration",
      "Payment Workflows",
      "Production Deployment"
    ]
  },
  {
    number: "04",
    title: "BACKEND & API DEVELOPMENT",
    description: "Building reliable backend systems, microservices, and APIs for digital products.",
    capabilities: [
      "REST APIs",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "System Integration"
    ]
  },
  {
    number: "05",
    title: "MVP DEVELOPMENT",
    description: "Helping startups turn product ideas into working MVPs.",
    capabilities: [
      "Product Planning",
      "Technical Architecture",
      "Development",
      "Deployment",
      "Iteration"
    ]
  }
];

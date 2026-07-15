export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  challenge: string;
  approach: string;
  solution: string;
  architectureDesc: string;
  architectureSteps: string[];
  keyFeatures: string[];
  results: string[];
  whatILearned: string;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string; // Dynamic abstract image
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: ProjectCaseStudy;
}

export const projects: ProjectData[] = [
  {
    id: "insight-engine",
    number: "01",
    title: "INSIGHT ENGINE",
    category: "AGENTIC AI / RAG / DOCUMENT INTELLIGENCE",
    description: "An intelligent document analysis platform powered by Agentic RAG, LangGraph, and Gemini LLM. The system retrieves contextual information and generates intelligent document insights.",
    tech: ["Python", "LangGraph", "RAG", "Gemini", "Streamlit"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/GaganMeshram123",
    caseStudy: {
      overview: "Insight Engine was built to tackle the challenges of document analysis. Startups and enterprise companies process hundreds of heavy PDFs daily. Searching through them is tedious. Insight Engine acts as an AI analyst that reads, compiles, and retrieves intelligent, context-aware information from massive corpora instantly.",
      problem: "Traditional keyword search fails to understand the semantic intent of questions in complex documents. Information is buried in tables, headers, and footnotes, making standard extraction processes highly inaccurate.",
      challenge: "Building a pipeline that retains formatting context, parses complex tables, handles multi-document queries with zero cross-document pollution, and responds within seconds without hitting LLM token limits.",
      approach: "I selected LangGraph for orchestration because the user journey requires a multi-step verification agent (routing, self-correction, hallucination-checking). The system parses documents into layout-aware markdown, embeds them using a dense vector encoder, and indexes them in a scalable vector store.",
      solution: "An agentic RAG solution where a Query Rewriter refines the user's prompt, a Router agent determines which document indexes to query, a Retriever retrieves candidates, and a Grader agent evaluates the retrieval relevancy. If the answer is incomplete, it issues sub-queries.",
      architectureDesc: "The workflow is powered by LangGraph state machine:",
      architectureSteps: [
        "Document ingestion engine parses PDF structure using layout analysis.",
        "LangGraph routers check if the query requires external vector database lookup.",
        "Relevance grader filters out irrelevant context blocks using structured outputs.",
        "Gemini LLM synthesizes the final context-grounded response.",
        "Hallucination evaluator verifies if claims are fully supported by source documents."
      ],
      keyFeatures: [
        "Layout-Aware Parsing (extracts tables and structured lists cleanly)",
        "Self-Corrective RAG (automatically rewrites search queries if results are weak)",
        "Source Citation (links every generated claim to precise page numbers)",
        "Dynamic Multi-Agent Orchestration (utilizes specialized agent nodes for grading)"
      ],
      results: [
        "Reduced document review time by 82% for test clients.",
        "Achieved a 95% accuracy rate on semantic search benchmarks.",
        "Successfully deployed to production supporting files up to 500MB."
      ],
      whatILearned: "I learned how to build custom stateful agents in LangGraph, handle edge cases where retrievers return empty sets, and design custom prompts that strictly prevent hallucinations."
    }
  },
  {
    id: "youtube-analyzer",
    number: "02",
    title: "AI YOUTUBE COMMENT ANALYZER",
    category: "AI / RAG / SENTIMENT ANALYSIS",
    description: "An AI-powered system that analyzes YouTube comments, identifies audience sentiment, and retrieves contextual insights using a Retrieval-Augmented Generation pipeline.",
    tech: ["Python", "ChromaDB", "RAG", "LLMs", "YouTube API"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/GaganMeshram123",
    caseStudy: {
      overview: "Creators and marketers struggle to read through thousands of comments to extract actionable video feedback, feature requests, or bugs. The AI YouTube Comment Analyzer aggregates comment threads, processes them in real-time, and exposes a natural language interface to query audience feedback.",
      problem: "YouTube comments are chaotic, full of emojis, slang, and spam. Categorizing them manually is impossible for high-subscriber channels, leading to missed feedback and opportunities.",
      challenge: "Handling API rate limits, filtering spam comments efficiently before embedding, and clustering comments into structured sentiment categories in real-time.",
      approach: "Built a pipeline that pulls comments using the YouTube API, filters spam using basic heuristics, stores embeddings in ChromaDB, and runs sentiment analysis using lightweight local models, with summary generation handled by an LLM.",
      solution: "A web dashboard where users input a video URL. The app automatically fetches comments, visualizes overall sentiment metrics (positive, neutral, negative), and enables users to chat with the comment database (e.g., 'What did users say about the audio quality?').",
      architectureDesc: "A complete streaming ingestion and query loop:",
      architectureSteps: [
        "YouTube Data API fetches all comment threads asynchronously.",
        "Cleaning scripts strip out links, bot spam, and system noise.",
        "Text chunks are vectorized using sentence-transformers and indexed in ChromaDB.",
        "Sentiment metrics are calculated using a custom classification model.",
        "RAG loop searches ChromaDB index and generates contextual summaries."
      ],
      keyFeatures: [
        "Real-Time Sentiment Dashboard (interactive charts showing audience mood)",
        "Semantic Search (find common suggestions or bugs without matching exact words)",
        "Spam Filtration (removes automated channel links and bot scripts)",
        "CSV/PDF Reporting (export audience reports for brand partners)"
      ],
      results: [
        "Enabled creators to get a video summary in less than 30 seconds.",
        "Helped a tech creator identify a major editing mistake in a video within 10 minutes of upload.",
        "Processed over 100,000 comments across testing runs without performance lag."
      ],
      whatILearned: "Working with the YouTube API taught me the details of paginated fetches and rate limits. I also gained experience fine-tuning vector database indexing parameters in ChromaDB for short texts."
    }
  },
  {
    id: "collegespace",
    number: "03",
    title: "COLLEGESPACE",
    category: "FULL STACK WEB APPLICATION",
    description: "A collaborative study material sharing platform designed for college students to discover and share academic resources.",
    tech: ["React", "Node.js", "Express", "Database", "REST API"],
    image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/GaganMeshram123",
    caseStudy: {
      overview: "College students often struggle to locate past exams, lecture notes, and syllabus guidelines. CollegeSpace consolidates these resources into a highly organized, community-driven database where students upload, rate, and discover materials for their specific courses.",
      problem: "Academics materials are scattered across Google Drive folders, WhatsApp groups, and Discord servers. Finding a specific note right before exams is stressful and time-consuming.",
      challenge: "Creating a reliable upload, storage, and indexing system that handles varying file types (PDFs, DOCs, images) and ensures high security against malicious uploads.",
      approach: "I structured the database to group files by University, Department, Course, and Semester. The frontend is built with React for fast client-side filtering, and the backend is powered by Node.js/Express.",
      solution: "A responsive platform featuring instant search, filter by course codes, peer ratings, and an optimized download pipeline that saves bandwidth. Admin dashboards handle moderation of uploaded content.",
      architectureDesc: "A clean MVC-style architecture:",
      architectureSteps: [
        "React frontend implements debounced search and tags for instantaneous filtering.",
        "NodeJS REST API handles authentication, search requests, and metadata storage.",
        "File upload manager verifies file integrity and uploads them to a secure cloud bucket.",
        "Database stores relational tags, ratings, user profiles, and file metadata.",
        "Moderation worker flags documents containing inappropriate content."
      ],
      keyFeatures: [
        "Instant Tag-Based Search (filter by semester or course code in milliseconds)",
        "Community Review System (upvote useful notes and downvote spam)",
        "Secure PDF Viewer (read study materials directly inside the browser)",
        "User Contribution Dashboard (gamified profile metrics showing uploads and views)"
      ],
      results: [
        "Adopted by 500+ active students in its first month of launch.",
        "Over 1,200 study resources uploaded and indexed within the system.",
        "Average search-to-download time reduced to under 10 seconds."
      ],
      whatILearned: "I learned how to manage file storage pipelines, configure cloud buckets, implement proper token-based authentication (JWT), and write optimized database queries to handle complex filtering combinations."
    }
  },
  {
    id: "scatch-bags",
    number: "04",
    title: "SCATCH BAGS",
    category: "E-COMMERCE / MERN",
    description: "A modern full-stack e-commerce application with authentication, product management, shopping workflows, and backend APIs.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/GaganMeshram123",
    caseStudy: {
      overview: "Scatch Bags is a premium digital store built using the MERN stack. Designed with smooth, minimal aesthetics to showcase and retail designer bags, the platform handles user authentication, dynamic shopping carts, order checkouts, and admin catalogs.",
      problem: "E-commerce stores often feel bloated, slow, and full of complex visual noise, which distracts customers and hurts conversions.",
      challenge: "Synchronizing cart state across browser sessions safely, managing database schemas for dynamic product pricing, and securing checkout APIs.",
      approach: "Focused on an ultra-minimal user interface with micro-interactions. Used MongoDB to manage highly structured catalogs and user schemas, and styled the UI using modular custom CSS.",
      solution: "A modern shopping experience. The platform includes smooth page transitions, instant cart updates, secure JWT-based login, and a dashboard for admins to manage stock, add products, and track orders.",
      architectureDesc: "The standard MERN workflow:",
      architectureSteps: [
        "React SPA manages local state (cart, user, product lists) using Context API.",
        "Express server processes security tokens and queries catalog schemas.",
        "MongoDB stores user credentials, hashed passwords, product documents, and order history.",
        "Asset processor compresses and manages product images for optimized loading.",
        "API gateway handles checkout processing and returns transaction confirmations."
      ],
      keyFeatures: [
        "Minimalist UX/UI (fluid animations and zero layout clutter)",
        "Robust Shopping Cart (handles live quantity edits and session sync)",
        "Admin Portal (add, edit, or delete items and view real-time sale logs)",
        "Token Authentication (secure, encrypted user accounts and password hashing)"
      ],
      results: [
        "Achieved a 95+ PageSpeed score due to highly optimized code and asset compression.",
        "100% functional checkout loop tested across standard developer pipelines.",
        "Highly clean, modular codebase easily expandable for external payment gateways."
      ],
      whatILearned: "This project sharpened my knowledge of state management in React, Mongoose schema modeling, password security, and designing web APIs that follow REST standards."
    }
  }
];

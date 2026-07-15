export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  challenge: string;
  approach: string;
  solution: string;
  architectureDesc?: string;
  architectureSteps?: string[];
  keyFeatures?: string[];
  results: string[];
  whatILearned: string;
  performanceStat?: string;
  paymentWorkflow?: boolean;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  status: string;
  headline: string;
  description: string;
  tech: string[]; // capabilities
  image: string; // local preview path
  liveUrl: string;
  githubUrl?: string;
  caseStudy: ProjectCaseStudy;
}

export const projects: ProjectData[] = [
  {
    id: "kashi-bite",
    number: "01",
    title: "KASHI BITE",
    category: "PRODUCTION E-COMMERCE / FOOD BRAND",
    status: "LIVE PRODUCT • CLIENT WORK",
    headline: "A DIGITAL COMMERCE EXPERIENCE FOR THE AUTHENTIC TASTE OF BANARAS.",
    description: "Kashi Bite is a production e-commerce experience built for a food brand focused on bringing authentic Banarasi flavours to customers through a modern digital shopping journey. The platform creates a digital experience around the brand's traditional food products while supporting product discovery, shopping workflows, checkout, and payment-related experiences.",
    tech: [
      "PRODUCTION E-COMMERCE",
      "PRODUCT DISCOVERY",
      "SHOPPING EXPERIENCE",
      "CART WORKFLOW",
      "CHECKOUT EXPERIENCE",
      "RAZORPAY INTEGRATION",
      "PAYMENT WORKFLOW",
      "RESPONSIVE EXPERIENCE",
      "PRODUCTION DEPLOYMENT"
    ],
    image: "/projects/kashi-bite/homepage.png",
    liveUrl: "https://www.kashibite.com/",
    caseStudy: {
      overview: "Kashi Bite required more than a visually attractive brand website. The digital experience needed to communicate the brand, present traditional food products, and support a customer journey from product discovery toward purchase. I approached the project as a digital commerce product rather than only a website, ensuring a fast, clean, and reliable checkout experience.",
      problem: "A customer visiting a consumer food brand website needs to quickly understand the brand, explore the products, and move through a clear shopping journey. The challenge was creating an experience that could balance traditional brand identity with a modern digital commerce workflow across discovery, cart management, and payment states.",
      challenge: "Building a payment and checkout flow that remains consistent, handles failed transactions gracefully, provides clear feedback to users, and manages order state securely without exposing sensitive production keys.",
      approach: "I structured the customer journey starting from brand discovery, moving to interactive product presentation (Murabbas, Pickles, Papads), and guiding the user through cart, checkout, and the Razorpay payment gateway integration.",
      solution: "A complete production-grade e-commerce application featuring intuitive product discovery, responsive shopping workflows, Razorpay checkout, and an optimized order success/failure feedback loop.",
      paymentWorkflow: true,
      results: [
        "Delivered a live, client-verified digital commerce platform.",
        "Integrated Razorpay workflow supporting secure payments.",
        "Maintained 100% responsive design across mobile and desktop screens."
      ],
      whatILearned: "I learned how to structure client-focused checkout flows, handle payment states reliably under varying network conditions, and align brand presentation with digital commerce requirements."
    }
  },
  {
    id: "gud-roots",
    number: "02",
    title: "GUD ROOTS",
    category: "PRODUCTION E-COMMERCE / CONSUMER BRAND",
    status: "LIVE PRODUCT • CLIENT WORK",
    headline: "BUILDING A MODERN DIGITAL STOREFRONT FOR A CONSUMER BRAND.",
    description: "Gud Roots is a production-focused digital commerce experience built to showcase a modern consumer brand, present its product range, and provide customers with a smooth online shopping journey. The project combines responsive user experience, commerce workflows, backend-connected systems, payment integration, and production-focused performance work.",
    tech: [
      "PRODUCTION E-COMMERCE",
      "PRODUCT PRESENTATION",
      "SHOPPING WORKFLOWS",
      "CART EXPERIENCE",
      "CHECKOUT FLOW",
      "RAZORPAY INTEGRATION",
      "PAYMENT WORKFLOW",
      "BACKEND SYSTEMS",
      "PERFORMANCE OPTIMIZATION",
      "RESPONSIVE EXPERIENCE",
      "PRODUCTION DEPLOYMENT"
    ],
    image: "/projects/gud-roots/homepage.png",
    liveUrl: "https://www.gudroots.in/",
    caseStudy: {
      overview: "Gud Roots is a production digital commerce project for a modern consumer brand. The brand focuses on premium IQF frozen fruits, berries, vegetables, and natural preservative-free cold-chain products. The project involved creating a modern digital experience around the brand and its product offering.",
      problem: "A modern consumer brand needs a digital experience that clearly presents its products and makes the online shopping journey simple. The project required balancing brand presentation, product discovery, responsive experience, commerce workflows, and production performance.",
      challenge: "Optimizing cold-chain product listings and media assets to ensure fast page loads while maintaining high-resolution product imagery for premium berries and frozen vegetables.",
      approach: "Focused on product presentation and a smooth customer journey. Designed a responsive interface, backend-connected workflows, and implemented Razorpay for payment processing, followed by intense frontend asset and code-splitting performance optimization.",
      solution: "A highly optimized, production-grade commerce application that integrates secure payment initiation, success/failure state handling, and a fast, responsive interface.",
      performanceStat: "35%",
      results: [
        "Achieved a 35% load time improvement through asset compression and route optimization.",
        "Deployed a fully operational checkout and payment loop.",
        "Successfully launched a secure digital storefront for client production use."
      ],
      whatILearned: "Optimizing Gud Roots sharpened my skills in asset delivery optimization, cold-chain metadata management, and frontend performance metrics that directly impact customer conversion rates."
    }
  },
  {
    id: "collegespace",
    number: "03",
    title: "COLLEGESPACE",
    category: "FULL STACK WEB APPLICATION / EDTECH",
    status: "LIVE PRODUCT • FULL STACK",
    headline: "MAKING STUDY MATERIALS EASIER TO DISCOVER AND SHARE.",
    description: "CollegeSpace is a full-stack study material sharing platform built to help college students discover, access, and share academic resources through a centralized digital experience. The product focuses on solving the problem of fragmented study materials and making useful academic resources easier for students to discover.",
    tech: [
      "FULL STACK DEVELOPMENT",
      "RESOURCE DISCOVERY",
      "STUDY MATERIAL SHARING",
      "REST APIs",
      "BACKEND DEVELOPMENT",
      "RESPONSIVE WEB APPLICATION",
      "STUDENT-FOCUSED UX"
    ],
    image: "/projects/collegespace/homepage.png",
    liveUrl: "https://collegespace-gray.vercel.app/",
    githubUrl: "https://github.com/GaganMeshram123/myfreelancing",
    caseStudy: {
      overview: "CollegeSpace started from a problem I could clearly see around students: useful academic resources were available, but they were often scattered across different messages, people, and links. The goal was to create a centralized digital experience where study materials could become easier to discover and access.",
      problem: "STUDY MATERIALS WERE EVERYWHERE. FINDING THEM WAS THE PROBLEM. College students often search for academic resources through WhatsApp groups, classmates, old messages, and scattered links. Study resources become fragmented, making search stressful and inefficient.",
      challenge: "Creating a reliable resource discovery mechanism that goes beyond simple file uploads, focusing on indexing, tags, university semesters, and clean organization.",
      approach: "I structured the product around the student journey. Designed a centralized React.js frontend connected to a REST API running on a Node.js/Express.js backend, coupled with a robust relational data layer.",
      solution: "A full-stack, responsive web application allowing students to browse resources by department/semester, download PDFs, upload new materials, and search instantly.",
      results: [
        "Created a unified, searchable repository for academic notes.",
        "Implemented a scalable REST API architecture for document indexing.",
        "Developed a responsive student dashboard for file uploads and sharing."
      ],
      whatILearned: "Building CollegeSpace taught me the importance of full-stack API design, debounced search filters, and matching product thinking with student user experience workflows."
    }
  }
];

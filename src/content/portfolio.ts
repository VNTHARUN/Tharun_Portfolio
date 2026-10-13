export const person = {
  name: "Hosakota Venkata Naga Tharun",
  title: "AI Engineer",
  focus: "Generative AI, agents, RAG",
  headline: "I design and build production AI applications with LLMs, multi-agent systems, and RAG.",
  subline:
    "2.5 years of experience delivering agentic workflows and retrieval systems on Azure OpenAI, Azure AI Foundry Agents, LangGraph, and Workato — focused on systems that work reliably in real environments.",
  email: "tharunhosakota@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/hosakota-venkata-naga-tharun",
    github: "" /* TODO: add after publishing a repo */,
  },
  resumePdf: "/Tharun_AI_Engineer_Resume.pdf",
};

export const experience = {
  company: "Mouri Tech Pvt Ltd",
  role: "Applied AI Engineer",
  dates: "March 2024 - Present",
};

export const projects = [
  {
    id: "financial-statement-analyzer",
    name: "Financial Statement Analyzer",
    stack: [
      "Python",
      "Azure Functions",
      "Azure AI Foundry Agents",
      "GPT-4.1 with code interpreter",
      "Azure Identity",
      "Azure Application Insights",
    ],
    summary: "Serverless backend that extracts structured summaries from financial statement images.",
    tagline: "Extracts structured summaries from financial statement images.",
    owned: [
      "Serverless Python backend on Azure Functions with Azure AI Foundry Agents",
      "3-phase prompt pipeline: extraction, verification, summary",
      "Root-caused rate-limit failures and fixed them with load split, retry, and failover",
      "Managed-identity auth and Application Insights monitoring",
    ],
    facts: [
      "A representative 42-image batch takes about 2 min 50 sec (batch size varies by client).",
      "A 3-phase prompt pipeline (extraction, verification, summary) with a verification phase that enforces strict data-fidelity rules to limit hallucination.",
      "Runs through Azure Application Insights across monthly and yearly client cycles.",
      "Passwordless, managed-identity authentication with Azure Identity (DefaultAzureCredential).",
    ],
    rca: {
      symptom:
        "Rate-limit errors appeared consistently once a batch passed about 15-20 images, because bulk base64 image requests were sent to the API through a single agent.",
      rootCause: "All requests in a batch went through one agent, so request volume exceeded the API rate limit.",
      actions: [
        "Split each batch by index: odd-indexed images to agent 1, even-indexed images to agent 2.",
        "Added retry logic when an agent fails to process an input.",
        "Added automatic failover so the other agent picks up the work when one fails.",
      ],
      verified: "Application Insights logs show zero rate-limit failures since the change.",
    },
    tradeoffs: [
      "Why two agents instead of only retrying: retries alone keep hitting the same limit; spreading the load removes the cause.",
    ],
  },
  {
    id: "multi-agent-assistant",
    name: "Multi-Agent AI Assistant Platform",
    stack: ["Python", "LangGraph", "LangChain", "FastAPI", "Azure OpenAI (GPT-4.1)", "FAISS", "BM25"],
    summary: "A LangGraph multi-agent assistant with a context-aware router and a hybrid RAG pipeline.",
    tagline: "A multi-agent assistant that routes each query to the right specialist agent.",
    owned: [
      "Context-aware LangGraph router across 6 specialized agents",
      "Hybrid RAG: FAISS + BM25 (70/30) with cross-encoder reranking",
      "Human approval before any reminder email is sent",
      "SSE streaming and a token, latency, and agent-usage dashboard",
    ],
    facts: [
      "Context-aware router dispatches queries across 6 specialized agents: calculator, weather, HR policy, search, reminder, smalltalk.",
      "3-stage hybrid RAG: dense FAISS search (70% weight) plus sparse BM25 keyword search (30% weight), then cross-encoder reranking, across 30+ internal policy documents.",
      "Priority-based short-circuit routing to cut unnecessary LLM calls.",
      'Human-in-the-Loop approval for the reminder agent: it collects the recipient email, message, and reminder time over multiple turns, then asks "Are you sure?" before the reminder email is sent.',
      "Follow-up handling across all agents: it retrieves the tool used in the previous turn and decides whether a new request relates to it or needs up to 10 past conversation turns. Before resending a reminder, it asks for approval again.",
      "Real-time SSE streaming of graph execution and a dashboard tracking token usage, latency, and agent distribution.",
    ],
  },
  {
    id: "workato-agents",
    name: "Workato AI Agents",
    stack: ["Workato Genie", "Workato recipes", "HubSpot", "Salesforce", "Outlook"],
    summary: "Two agents built on Workato: a lead-qualification agent and an Outlook automation agent.",
    tagline: "Two Workato agents: lead qualification and Outlook automation.",
    owned: [
      "LeadPilot AI: scores leads 0-100 and recommends the next sales action",
      "Separates exact email matches from company-only matches",
      "Agent advises, recipe acts: the agent has no write access",
      "Outlook agent asks for approval before deleting any email",
    ],
    facts: [
      "LeadPilot AI analyzes HubSpot contact details and Salesforce matching context, scores each lead 0-100, assigns High, Medium, or Low priority, and recommends the next sales action, owner role, and follow-up task.",
      "It distinguishes exact email matches from company-only matches, so contacts from the same company are not treated as the same person.",
      "It returns structured recommendations; the Workato recipe performs Salesforce updates, tasks, and emails. The agent itself has no write access.",
      "The Outlook agent summarizes emails, drafts and sends new emails, replies (through the send-email recipe), and suggests next actions.",
      "Its tools are Workato recipes: get unread emails, get all emails, get email details, mark as read, send email, delete email.",
      'Before deleting any email, it asks for human approval ("Are you sure?").',
    ],
  },
];

export const reliability = [
  {
    point: "Validation",
    detail: "Verification phase in a 3-phase prompt pipeline enforcing data-fidelity rules.",
    project: "financial-statement-analyzer",
  },
  {
    point: "Error handling, retry, and failover",
    detail: "Retry on agent failure and automatic failover between two agents.",
    project: "financial-statement-analyzer",
  },
  {
    point: "Logging and monitoring",
    detail: "Azure Application Insights across monthly and yearly runs.",
    project: "financial-statement-analyzer",
  },
  {
    point: "Root-cause analysis and corrective actions",
    detail: "Traced rate-limit failures to a single-agent bottleneck and fixed the cause, not the symptom.",
    project: "financial-statement-analyzer",
  },
  {
    point: "Human approval before sending",
    detail: "The reminder agent confirms recipient, message, and time before sending, and asks again before resending.",
    project: "multi-agent-assistant",
  },
  {
    point: "Human approval for risky actions",
    detail: "Confirmation step before an agent deletes email.",
    project: "workato-agents",
  },
];

export const skills = {
  "Generative AI": [
    "LLMs",
    "Agentic AI",
    "AI Agents",
    "Multi-Agent Systems",
    "Prompt Engineering",
    "RAG",
    "Hybrid Search",
    "NLP",
  ],
  "Agent and LLM frameworks": ["LangGraph", "LangChain", "Semantic Kernel", "Google ADK"],
  Retrieval: ["FAISS", "BM25", "Cross-Encoder Reranking", "Vector Databases"],
  Cloud: [
    "Azure OpenAI",
    "Azure AI Foundry Agents",
    "Azure Functions",
    "Azure Identity/AD",
    "Application Insights",
    "Databricks",
  ],
  "Backend and data": ["Python", "FastAPI", "REST APIs", "PostgreSQL", "Cosmos DB"],
  "Automation and tooling": [
    "Workato",
    "Playwright",
    "GitHub Actions (CI/CD)",
    "Git",
    "GitHub",
    "GitLab",
    "Docker",
    "Postman",
    "VS Code",
    "GitHub Copilot",
    "Cursor",
  ],
};

export const education = {
  school: "Jawaharlal Nehru Technological University Anantapur (JNTUA)",
  degree: "Bachelor of Technology, Electronics and Communication Engineering",
  years: "2019 - 2023",
  percentage: "74%",
};

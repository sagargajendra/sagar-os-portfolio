const PORTFOLIO_DATA = {
  profile: {
    name: "Sagar G",
    title: "Software Developer | Python & Backend-Oriented",
    subtitle: "B.Sc Mathematics & Computer Science Graduate (2026)",
    email: "sagarshadow111@gmail.com",
    phone: "+91 6361488259",
    location: "Bengaluru, Karnataka, India",
    linkedin: "https://linkedin.com/in/sagargajendra",
    github: "https://github.com/sagargajendra",
    avatar: "assets/profile_pic.jpeg",
    availability: "Open to Full-Time Software Engineering & Backend Roles",
    summary: "B.Sc graduate in Mathematics & Computer Science from St. Joseph's University, Bengaluru (2026). Strong CS fundamentals in Python, object-oriented programming, data structures & algorithms, and database design. Hands-on experience across the full software development lifecycle — requirements, design, coding, testing, and debugging — built while delivering a production-grade, 20+ screen application as part of a 3-person team. Comfortable with Git-based version control, Agile practices, and writing clean, maintainable code in collaborative, cross-functional settings. Research background in cybersecurity, with a proven ability to problem-solve, self-learn, and contribute from day one.",
    resumeUrl: "assets/Sagar_G_Resume.pdf"
  },
  skills: [
    { category: "Programming Languages", items: ["Python", "Java", "C", "C++", "JavaScript", "Dart"] },
    { category: "CS Fundamentals", items: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms (DSA)", "DBMS", "Operating Systems", "SDLC", "Agile Methodologies"] },
    { category: "Backend & Database", items: ["RESTful API Design", "PostgreSQL", "SQL", "Supabase", "Row Level Security (RLS)"] },
    { category: "Mobile & Web", items: ["Flutter", "Dart", "Provider (State Management)", "Android", "HTML5", "CSS3", "JavaScript (ES6+)"] },
    { category: "Tools & Platforms", items: ["Linux", "Git & GitHub", "Android Studio", "VS Code"] },
    { category: "Software Practices", items: ["Debugging & Troubleshooting", "Code Reviews", "Unit & Functional Testing", "Clean Code Principles"] },
    { category: "AI-Assisted Development", items: ["Claude", "ChatGPT", "Antigravity"] }
  ],
  education: [
    {
      degree: "Bachelor of Science (B.Sc) in Mathematics & Computer Science",
      institution: "St. Joseph's University, Bengaluru",
      duration: "2023 – 2026",
      details: "Focused on computer science core subjects including Data Structures, Database Management Systems (DBMS), Operating Systems, Software Engineering, and advanced Mathematics."
    },
    {
      degree: "Pre-University Course (PCMC)",
      institution: "St. Francis Composite PU College, Bengaluru",
      duration: "2020 – 2022",
      details: "Completed pre-university education with Physics, Chemistry, Mathematics, and Computer Science."
    },
    {
      degree: "SSLC (Secondary School Leaving Certificate)",
      institution: "New Bishop Cotton English High School, Bengaluru",
      duration: "2019 – 2020",
      details: "Completed secondary education with excellent academic records."
    }
  ],
  experience: [
    {
      role: "Capstone Project / Remote Intern",
      company: "Eco Dispose",
      duration: "Academic Capstone Project",
      highlights: [
        "Collaborated in a cross-functional team of 3 across the full SDLC to design, build, and test the INK App.",
        "Applied OOP principles to model a relational database schema in PostgreSQL supporting content feeds and multi-role interactions.",
        "Implemented JWT authentication and Role-Based Access Control (RBAC) via Supabase Row Level Security (RLS).",
        "Designed and debugged RESTful APIs with real-time subscriptions for live feeds, utilizing Git/GitHub for version control and peer code reviews."
      ]
    },
    {
      role: "Technical Head & Program Coordinator",
      company: "Kannada Sangha — St. Joseph's University",
      duration: "Extracurricular Leadership",
      highlights: [
        "Technical Head: Led AV production, live streaming, and digital promotions for large campus events with 500+ students.",
        "Program Coordinator: Directed 8 Technical Heads to organize a 20-event inter-college fest with 500+ participants."
      ]
    },
    {
      role: "Camp Member",
      company: "NSS (National Service Scheme) Annual Rural Camp",
      duration: "Social Responsibility",
      highlights: [
        "Participated in community outreach, local development, and rural assistance initiatives."
      ]
    }
  ],
  projects: [
    {
      id: "ink-app",
      name: "INK App",
      role: "Lead Software & Database Developer",
      subtitle: "Role-Based Social Media Mobile Application",
      association: "Academic Capstone | Eco Dispose Internship",
      tech: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Provider", "RESTful APIs", "SQL", "Git"],
      purpose: "Create a production-grade role-based social media application to connect different personas (Admin, Brand, Customer) within an ecosystem, managing distinct capabilities and real-time social feeds.",
      features: [
        "Production-ready 20+ screen mobile interface customized for Admin, Brand, and Customer roles.",
        "Multi-role database schema design with strict referential integrity and optimized indexes.",
        "Secure Role-Based Access Control (RBAC) implemented via JWT-based auth and Row Level Security (RLS) in Supabase/PostgreSQL.",
        "Real-time subscriptions for instant social feed updates and secure, session-persistent login routing."
      ],
      description: "Collaborated in a 3-person team across the full SDLC — from gathering requirements and designing database schemas to coding, unit testing, and presenting to an external judging panel of academic and industry experts.",
      github: "https://github.com/sagargajendra",
      demo: null
    },
    {
      id: "cybercrime-research",
      name: "Cyber Crime in Urban Bengaluru",
      role: "Lead Academic Researcher",
      subtitle: "Emerging Threats and Countermeasures Research Paper",
      association: "Academic Research Project",
      tech: ["Cybersecurity Concepts", "Survey Design", "Statistical Data Analysis", "Threat Modeling"],
      purpose: "Examine prevailing cybercrime trends in Bengaluru, analyze public awareness gaps, map threats to national guidelines, and propose practical mitigation strategies.",
      features: [
        "Structured survey and statistical analysis targeting urban residents to measure security awareness.",
        "Mapping of urban cybercrime trends to CERT-In advisories for regulatory compliance and threat taxonomy.",
        "Detailed taxonomy of 12 distinct cybercrime typologies, including UPI scams, OLX fraud, and AI-enabled voice/face cloning fraud.",
        "Proposed a multi-layered countermeasure framework spanning user awareness, technical protections, and reporting mechanisms."
      ],
      description: "Researched cybersecurity patterns, conducted statistical analysis on public responses, and compiled a comprehensive academic research paper evaluating urban vulnerabilities and countermeasures.",
      pdfUrl: "assets/research_cybercrime_bengaluru.pdf",
      github: null,
      demo: null
    },
    {
      id: "stickman-game",
      name: "Stickman Browser Game",
      role: "Frontend Game Developer",
      subtitle: "2D Arcade Browser Game",
      association: "Elixir Open Day Hackathon (Team of 7)",
      tech: ["Vanilla JavaScript", "HTML5 Canvas", "CSS3", "Game Loops", "Collision Detection"],
      purpose: "Build a lightweight, highly responsive, and fun 2D arcade stickman game directly playable in the browser as a collaborative hackathon team project.",
      features: [
        "Pure JavaScript game loop rendering at 60 FPS without external engine libraries.",
        "AABB collision detection for platform physics, obstacles, and scoring mechanisms.",
        "Keyboard event handling for precise jump, crouch, and run controls.",
        "Dynamic background scrolling and animations to simulate movement."
      ],
      description: "Designed and implemented the core game loop, keyboard controls, and collision detection systems while collaborating with designers and asset editors in a fast-paced hackathon setting.",
      github: "https://github.com/sagargajendra",
      demo: null
    },
    {
      id: "ambulance-detection",
      name: "Automatic Ambulance Detection System",
      role: "Hardware & IoT Developer",
      subtitle: "RFID & Arduino-based Traffic Pre-emption System",
      association: "Elixir Open Day Hackathon (Team of 8)",
      tech: ["Arduino", "RFID Technology", "Microcontroller C/C++", "Hardware Design"],
      purpose: "Design and prototype a smart traffic light control system that automatically detects emergency vehicles to preempt signals, reducing transit delays.",
      features: [
        "RFID-based vehicle classification for identifying authorized ambulances.",
        "Microcontroller logic to intercept normal traffic light cycles and activate green lanes dynamically.",
        "Audible/visual status indicators at traffic signals when emergency overrides are active.",
        "Low-latency signal communication between the reader module and traffic controller."
      ],
      description: "Co-developed the embedded Arduino logic, wired the RFID transceivers and signal indicators, and conducted real-world tests simulating emergency vehicle approaches.",
      github: "https://github.com/sagargajendra",
      demo: null
    }
  ],
  certificates: [
    {
      name: "Java for Beginners",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_java_beginners.pdf"
    },
    {
      name: "Introduction to Artificial Intelligence",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_ai_introduction.pdf"
    },
    {
      name: "Cyber Security Foundation",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_cybersecurity_foundation.pdf"
    },
    {
      name: "Cybersecurity Awareness",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_cybersecurity_awareness.pdf"
    },
    {
      name: "Eco Dispose Internship Capstone Letter",
      issuer: "Eco Dispose",
      date: "2025",
      pdfUrl: "assets/internship_eco_dispose.pdf"
    }
  ],
  askMeAnswers: {
    greeting: "Hi there! I'm Sagar's virtual assistant. Ask me anything about his projects, skills, education, experience, or certifications, and I'll pull the facts directly from his resume! 🚀",
    default: "I'm not quite sure about that specific detail. Try asking me about my projects, skills, experience, or education! You can also click the suggestion chips below.",
    
    about: "I am Sagar G, a Software Developer and B.Sc Computer Science & Mathematics graduate from St. Joseph's University, Bengaluru (Class of 2026). I specialize in Python and backend-oriented development, but I also have hands-on experience building mobile apps in Flutter. I love solving problems, writing clean code, and working on systems and APIs.",
    
    projects: "I have worked on several notable projects:\n\n1. **INK App**: A role-based social media app with Flutter, Provider, Supabase, and PostgreSQL. It has 20+ screens and supports three distinct user roles with Row Level Security.\n2. **Cyber Crime in Urban Bengaluru**: An academic research paper mapping cyber threat patterns to CERT-In advisories and creating a taxonomy of 12 cybercrime typologies.\n3. **Stickman Game**: A 2D arcade browser game built with vanilla JavaScript game loop, collision detection, and canvas.\n4. **Ambulance Detection System**: An Arduino and RFID IoT system built during a hackathon to automate traffic pre-emption for emergency vehicles.\n\nWhich one would you like to hear more about? (Type 'INK App' or 'Research Paper')",
    
    skills: "My technical skills include:\n\n• **Languages**: Python, Java, C, C++, JavaScript, Dart\n• **Backend & DB**: PostgreSQL, Supabase, RESTful APIs, SQL, Row Level Security (RLS)\n• **Mobile & Frontend**: Flutter (Provider state management), Android, HTML5, CSS3, ES6+ JavaScript\n• **CS Concepts**: OOP, Data Structures & Algorithms, DBMS, Operating Systems, SDLC, Agile\n• **Tools**: Linux, Git, GitHub, Android Studio, VS Code\n\nI don't believe in fake percentage bars (e.g. JavaScript 85%). I evaluate my skill level by what I've successfully built!",
    
    experience: "I did an Academic Capstone Remote Internship with **Eco Dispose**, where I collaborated in a team of 3 to ship the **INK App** (a 20+ screen role-based mobile application built using Flutter and Supabase). I designed the database schema, handled Row Level Security, and built the RESTful subscription mechanisms.\n\nI also served as the **Technical Head & Program Coordinator** for the Kannada Sangha at St. Joseph's University, coordinating live streaming and digital promotions for events with 500+ attendees.",
    
    education: "My educational qualifications are:\n\n1. **B.Sc. in Mathematics & Computer Science** (2023 - 2026) from **St. Joseph's University, Bengaluru**.\n2. **Pre-University Course (PCMC)** (2020 - 2022) from **St. Francis Composite PU College, Bengaluru**.\n3. **SSLC** (2019 - 2020) from **New Bishop Cotton English High School, Bengaluru**.",
    
    certificates: "I hold four certifications from **Infosys Springboard**:\n• **Java for Beginners**\n• **Introduction to Artificial Intelligence**\n• **Cyber Security Foundation**\n• **Cybersecurity Awareness**\n\nI also have an official internship capstone certificate from **Eco Dispose**. You can view and download all of these in the **Files** or **Certificates** app on the desktop/launcher!",
    
    looking_for: "I am currently looking for full-time Software Developer roles, particularly in backend development (Python/SQL/APIs) or mobile development (Flutter/Android). I am ready to start contributing from day one!",
    
    recruiter_fit: "Why consider me?\n\n1. **Solid Foundation**: A degree in Mathematics & CS, bringing logical rigour to programming and database design.\n2. **Full Lifecycle Experience**: I have built and delivered a production-ready, 20+ screen app (INK App), managing everything from DB schemas to front-end state.\n3. **Self-Learner & Team Player**: Active hackathon participant, research publisher, student leader, and quick to pick up new tools (like Supabase, RLS, and AI-assisted development tools like Antigravity).",

    ink_app: "The **INK App** was built using Flutter, Dart, Supabase, and Provider. It's a role-based social media application that manages distinct access control for Admins, Brands, and Customers. I designed the PostgreSQL database schema, set up JWT-based authentication, and established Row Level Security (RLS) policies to make sure each role only sees their authorized data. It was presented to external faculty and praised for its technical execution.",
    
    research: "My research paper, titled **\"Cyber Crime in Urban Bengaluru: Emerging Threats and Countermeasures\"**, analyzes cybercrime patterns (such as AI voice scams and UPI fraud) and maps them to CERT-In guidelines. I ran a survey, conducted statistical analyses to identify public security awareness gaps, and proposed strategic countermeasures.",
    
    contact: "You can reach me via:\n• **Email**: sagarshadow111@gmail.com\n• **Phone**: +91 6361488259\n• **LinkedIn**: linkedin.com/in/sagargajendra\n• **GitHub**: github.com/sagargajendra\n\nFeel free to call or drop an email!"
  }
};

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
      duration: "Tech Head (24-25) & Prog Coord (25-26)",
      highlights: [
        "Technical Head (2024 - 2025): Led AV production, live streaming, poster designing, and digital promotions for large campus events with 500+ students.",
        "Program Coordinator (2025 - 2026): Coordinated 8 Technical Heads for a 500+ participant, 20-event inter-college fest."
      ]
    },
    {
      role: "Emcee & Volunteer",
      company: "NSS (National Service Scheme)",
      duration: "Social Responsibility",
      highlights: [
        "Participated in the NSS Annual Rural Camp, engaging in community outreach and local development.",
        "Served as an emcee for small events in rural areas, interacting and communicating with local communities.",
        "Conducted hands-on physical field work, including cleaning roads and clearing drains."
      ]
    },
    {
      role: "Media Volunteer",
      company: "SJU Student Council",
      duration: "2024",
      highlights: [
        "Handled videography and editing for various inter- and intra-college events.",
        "Collaborated with the student council team to produce promotional media and capture key event highlights."
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
      github: null,
      demo: null,
      pdfUrl: "assets/internship_eco_dispose.pdf",
      images: [
        "assets/Media/INK (1).jpeg",
        "assets/Media/INK (2).jpeg",
        "assets/Media/INK (3).jpeg",
        "assets/Media/INK (4).jpeg",
        "assets/Media/INK (5).jpeg",
        "assets/Media/INK (6).jpeg",
        "assets/Media/INK (7).jpeg",
        "assets/Media/INK (8).jpeg"
      ],
      testCases: [
        { name: "User Registration", input: "Valid email and role selection", expected: "New user account created successfully", result: "Pass" },
        { name: "Email Verification", input: "Valid email entered", expected: "System sends verification / allows account creation", result: "Pass" },
        { name: "User Login", input: "Correct email and password", expected: "User successfully logged into system", result: "Pass" },
        { name: "Invalid Login", input: "Correct email, incorrect password", expected: "Error message displayed", result: "Pass" },
        { name: "Password Creation", input: "Valid password during signup", expected: "Password stored and account activated", result: "Pass" },
        { name: "Brand Profile Creation", input: "Valid brand details (name, logo, description)", expected: "Brand profile created successfully", result: "Pass" },
        { name: "Customer Profile Creation", input: "Valid customer details", expected: "Customer account created successfully", result: "Pass" },
        { name: "Admin Login", input: "Valid admin credentials", expected: "Admin dashboard opened", result: "Pass" },
        { name: "Reel Upload", input: "Valid reel video file", expected: "Reel uploaded and stored successfully", result: "Pass" },
        { name: "Reel Display", input: "Open reels feed", expected: "Reels displayed in customer feed", result: "Pass" },
        { name: "Product Upload", input: "Valid product details and image", expected: "Product added to brand catalog", result: "Pass" },
        { name: "Product View", input: "Select product from catalog", expected: "Product details displayed", result: "Pass" },
        { name: "Follow Brand", input: "Customer clicks follow button", expected: "Brand added to customer following list", result: "Pass" },
        { name: "Unfollow Brand", input: "Customer clicks unfollow", expected: "Brand removed from following list", result: "Pass" },
        { name: "Place Order", input: "Customer selects product and confirms order", expected: "Order placed successfully", result: "Pass" },
        { name: "View Orders", input: "Customer opens order history", expected: "List of past orders displayed", result: "Pass" },
        { name: "Brand Manage Products", input: "Brand edits product information", expected: "Product updated successfully", result: "Pass" },
        { name: "Brand Manage Reels", input: "Brand deletes or edits reel", expected: "Reel updated or removed successfully", result: "Pass" },
        { name: "Admin Content Moderation", input: "Admin removes inappropriate reel/product", expected: "Content removed from platform", result: "Pass" },
        { name: "Logout", input: "User clicks logout button", expected: "User redirected to login screen", result: "Pass" }
      ]
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
      id: "flipkart-clone",
      name: "Flipkart Clone",
      role: "Frontend UI Developer",
      subtitle: "Front-End Practice Project",
      association: "Personal Practice Project",
      tech: ["HTML5", "CSS3", "CSS Flexbox", "CSS Grid", "Responsive Design"],
      purpose: "Built a fully responsive Flipkart e-commerce user interface clone to practice structural layouts and custom styling without external frameworks.",
      features: [
        "Responsive e-commerce UI mimicking the structure, styling, and navigation of Flipkart's web layout.",
        "Utilized semantic HTML5 markup for enhanced structure, accessibility, and SEO practices.",
        "Implemented adaptive grid alignments and flex layouts using CSS Flexbox and CSS Grid.",
        "Built custom front-end modules including product grids, slide panels, filtering bars, and header search widgets."
      ],
      github: "https://github.com/sagargajendra/Flipkart-Clone.git",
      demo: null,
      description: "Designed and built a responsive e-commerce front-end clone of Flipkart to master layout systems like CSS Flexbox and Grid using raw HTML and CSS."
    }
  ],
  technicalEvents: [
    {
      id: "ambulance-detection",
      name: "Automatic Ambulance Detection System",
      role: "Exhibitor / Team Member",
      subtitle: "RFID & Arduino-based Traffic Pre-emption System",
      association: "Elixir 2.O (Open Day) | St. Joseph's University",
      tech: ["Arduino", "RFID Technology", "Microcontroller C/C++", "Hardware Design"],
      purpose: "Exhibited a smart traffic light control system that automatically detects emergency vehicles to preempt signals, reducing transit delays.",
      features: [
        "RFID-based vehicle classification for identifying authorized ambulances.",
        "Microcontroller logic to intercept normal traffic light cycles and activate green lanes dynamically.",
        "Audible/visual status indicators at traffic signals when emergency overrides are active."
      ],
      description: "Participated in Elixir 2.O (Open Day) at St. Joseph's University as part of a team of 8 and exhibited the ambulance detection system prototype.",
      github: null,
      demo: null,
      pdfUrl: "assets/SJU Elixir 2.O Certificate.pdf",
      images: ["assets/Media/Elixir 2.O.jpeg"]
    },
    {
      id: "stickman-game",
      name: "Stickman Browser Game",
      role: "Exhibitor / Team Member",
      subtitle: "2D Arcade Browser Game",
      association: "Elixir 3.O (Open Day) | St. Joseph's University",
      tech: ["Vanilla JavaScript", "HTML5 Canvas", "CSS3", "Game Loops", "Collision Detection"],
      purpose: "Exhibited a lightweight, responsive 2D arcade stickman game playable in the browser.",
      features: [
        "Pure JavaScript game loop rendering at 60 FPS without external engine libraries.",
        "AABB collision detection for platform physics, obstacles, and scoring mechanisms.",
        "Keyboard event handling for precise jump, crouch, and run controls."
      ],
      description: "Participated in Elixir 3.O (Open Day) at St. Joseph's University as part of a team of 7 and exhibited the stickman game.",
      github: null,
      demo: null,
      pdfUrl: "assets/SJU Elixir 3.O Certificate.pdf",
      images: [
        "assets/Media/Elixir 3 (1).jpeg",
        "assets/Media/Elixir 3 (5).jpeg",
        "assets/Media/Elixir 3 (6).jpeg",
        "assets/Media/Elixir 3 (7).jpeg"
      ]
    },
    {
      id: "nss-rural-camp",
      name: "NSS Annual Rural Camp",
      role: "NSS Volunteer & Event Emcee",
      subtitle: "Community Service & Development Program",
      association: "National Service Scheme (NSS) | St. Joseph's University",
      tech: ["Community Outreach", "Event Emceeing", "Sanitation Infrastructure", "Field Work", "Public Relations"],
      purpose: "Participated in a 7-day residential rural service camp in a village, working on local infrastructure improvement and organizing public outreach programs.",
      features: [
        "Served as the master of ceremonies (emcee) for community programs, cultural events, and educational sessions organized for villagers.",
        "Completed manual labor and field work including cleaning rural roads, clearing blocked drains, and improving local pathways.",
        "Interacted directly with village residents to conduct awareness surveys on health, literacy, sanitation, and government welfare schemes.",
        "Collaborated with camp committees to coordinate daily routines and host community interactive forums."
      ],
      description: "Engaged in hands-on community service during the NSS Annual Rural Camp, managing event hosting, leading physical infrastructure tasks, and conducting rural demographics research.",
      github: null,
      demo: null,
      pdfUrl: "assets/Sagar G NSS Certificate.pdf",
      images: [
        "assets/Media/NSS (1).jpeg",
        "assets/Media/NSS (2).jpeg",
        "assets/Media/NSS (3).jpeg",
        "assets/Media/NSS (4).jpeg",
        "assets/Media/NSS (5).jpeg"
      ]
    },
    {
      id: "sju-media-volunteer",
      name: "SJU Student Council Media Volunteer",
      role: "Media Volunteer / Videographer",
      subtitle: "Videography, Editing & Fest Coverage",
      association: "SJU Student Council 2024 | St. Joseph's University",
      tech: ["Videography", "Video Editing", "Content Creation", "Post-Production", "Live Coverage"],
      purpose: "Managed and executed event coverage, video recording, and post-production editing for major inter- and intra-college festivals, academic open days, and student council assemblies.",
      features: [
        "Operated camera equipment to capture high-definition highlights of live college events, musical stages, and academic debates.",
        "Edited promotional videos, event recaps, and digital content for dissemination across university channels.",
        "Collaborated with the Student Council Media Team to coordinate real-time coverage schedules for parallel events."
      ],
      description: "Served as Media Volunteer for the SJU Student Council in 2024, handling the full lifecycle of videography and post-production editing for various campus activities.",
      github: null,
      demo: null,
      pdfUrl: "assets/SJU Media Volunteer Certificate.pdf",
      images: []
    },
    {
      id: "kannada-sangha-tech-head",
      name: "Kannada Sangha Technical Head & Coordinator",
      role: "Technical Head & Program Coordinator",
      subtitle: "Technical Head (2024-25) & Program Coordinator (2025-26)",
      association: "Kannada Sangha | St. Joseph's University",
      tech: ["AV Production", "Live Streaming", "Program Coordination", "OBS Studio", "Poster Designing", "Digital Promos"],
      purpose: "Led audio-visual production, live streaming, poster designing, and digital promotions for 500+ students, and coordinated technical heads for a 20-event inter-college fest.",
      features: [
        "Technical Head (2024 - 2025): Led AV production, live streaming, poster designing, and digital promotions for large campus events with 500+ students.",
        "Program Coordinator (2025 - 2026): Coordinated 8 Technical Heads for a 500+ participant, 20-event inter-college fest.",
        "Managed OBS streaming setups, video switching, stage projections, and microphone engineering.",
        "Designed promotional teasers, posters, and digital marketing materials across university groups."
      ],
      description: "Appointed as the Technical Head in 2024-2025 and Program Coordinator in 2025-2026 for Kannada Sangha at St. Joseph's University, directing teams and technical operations across multiple parallel events.",
      github: null,
      demo: null,
      pdfUrl: null,
      images: [
        "assets/Media/KS (1).jpeg",
        "assets/Media/KS (2).jpeg",
        "assets/Media/KS (3).jpeg",
        "assets/Media/KS (4).jpeg",
        "assets/Media/KS (5).jpeg",
        "assets/Media/KS (6).jpeg",
        "assets/Media/KS (7).jpeg",
        "assets/Media/KS (8).jpeg",
        "assets/Media/KS (9).jpeg",
        "assets/Media/KS (10).jpeg",
        "assets/Media/KS (11).jpeg",
        "assets/Media/KS (12).jpeg"
      ]
    }
  ],
  certificates: [
    {
      name: "Java for Beginners",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_java_beginners.pdf",
      category: "technical"
    },
    {
      name: "Introduction to Artificial Intelligence",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_ai_introduction.pdf",
      category: "technical"
    },
    {
      name: "Cyber Security Foundation",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_cybersecurity_foundation.pdf",
      category: "technical"
    },
    {
      name: "Cybersecurity Awareness",
      issuer: "Infosys Springboard",
      date: "2024",
      pdfUrl: "assets/cert_cybersecurity_awareness.pdf",
      category: "technical"
    },
    {
      name: "Eco Dispose Internship Capstone Letter",
      issuer: "Eco Dispose",
      date: "2025",
      pdfUrl: "assets/internship_eco_dispose.pdf",
      category: "technical"
    },
    {
      name: "Sagar G NSS Certificate",
      issuer: "National Service Scheme (NSS)",
      date: "2024",
      pdfUrl: "assets/Sagar G NSS Certificate.pdf",
      category: "events"
    },
    {
      name: "SJU Elixir 2.O Certificate",
      issuer: "St. Joseph's University",
      date: "2024",
      pdfUrl: "assets/SJU Elixir 2.O Certificate.pdf",
      category: "events"
    },
    {
      name: "SJU Elixir 3.O Certificate",
      issuer: "St. Joseph's University",
      date: "2025",
      pdfUrl: "assets/SJU Elixir 3.O Certificate.pdf",
      category: "events"
    },
    {
      name: "SJU Media Volunteer Certificate",
      issuer: "SJU Student Council",
      date: "2024",
      pdfUrl: "assets/SJU Media Volunteer Certificate.pdf",
      category: "events"
    }
  ],
  askMeAnswers: {
    greeting: "Hi there! I'm Sagar's virtual assistant. Ask me anything about his projects, skills, education, experience, or certifications, and I'll pull the facts directly from his resume! 🚀",
    default: "I'm not quite sure about that specific detail. Try asking me about my projects, skills, experience, or education! You can also click the suggestion chips below.",
    
    about: "I am Sagar G, a Software Developer and B.Sc Computer Science & Mathematics graduate from St. Joseph's University, Bengaluru (Class of 2026). I specialize in Python and backend-oriented development, but I also have hands-on experience building mobile apps in Flutter. I love solving problems, writing clean code, and working on systems and APIs.",
    
    projects: "I have worked on several notable projects:\n\n1. **INK App**: A role-based social media app with Flutter, Provider, Supabase, and PostgreSQL. It has 20+ screens and supports three distinct user roles with Row Level Security.\n2. **Cyber Crime in Urban Bengaluru**: An academic research paper mapping cyber threat patterns to CERT-In advisories and creating a taxonomy of 12 cybercrime typologies.\n3. **Flipkart Clone**: A responsive e-commerce front-end layout mimicking the UI and structural components of Flipkart.\n\nWhich one would you like to hear more about? (Type 'INK App', 'Research Paper', or 'Flipkart Clone')",
    
    techEvents: "I have participated in various technical exhibitions, leadership roles, and campus/community activities:\n\n1. **Elixir 2.0 (Open Day)**: Exhibited the Automatic Ambulance Detection System prototype as part of a team of 8.\n2. **Elixir 3.0 (Open Day)**: Exhibited the Stickman Browser Game as part of a team of 7.\n3. **NSS Annual Rural Camp**: Acted as emcee for community events, executed drainage and road sanitation tasks, and engaged in public relations.\n4. **SJU Student Council Media Volunteer**: Directed and edited multi-fest recap videos and oversaw live campus coverage.\n5. **Kannada Sangha Technical Head & Coordinator**: Led AV production/live streaming for 500+ students and coordinated 8 Technical Heads for a 20-event inter-college fest.\n\nYou can view descriptions, attached certificates, and photos for all of these inside the **Technical Events & Activities Explorer**!",
    
    skills: "My technical skills include:\n\n• **Languages**: Python, Java, C, C++, JavaScript, Dart\n• **Backend & DB**: PostgreSQL, Supabase, RESTful APIs, SQL, Row Level Security (RLS)\n• **Mobile & Frontend**: Flutter (Provider state management), Android, HTML5, CSS3, ES6+ JavaScript\n• **CS Concepts**: OOP, Data Structures & Algorithms, DBMS, Operating Systems, SDLC, Agile\n• **Tools**: Linux, Git, GitHub, Android Studio, VS Code\n\nI don't believe in fake percentage bars (e.g. JavaScript 85%). I evaluate my skill level by what I've successfully built!",
    
    experience: "I have hands-on experience across technical leadership, media production, and community outreach:\n\n1. **Academic Capstone Remote Intern (Eco Dispose)**: Collaborated in a team of 3 to ship the **INK App** (20+ screens, Flutter/Supabase). Handled schema design, RLS security, and real-time subscriptions.\n2. **Technical Head & Program Coordinator (Kannada Sangha)**: Coordinated live streaming, AV setup, and digital promos for events with 500+ attendees.\n3. **Media Volunteer (SJU Student Council, 2024)**: Handled videography and video editing for inter- and intra-college events.\n4. **NSS Volunteer**: Participated in the Annual Rural Camp, emceeing small community events and conducting manual field work (cleaning roads, drains).",
    
    education: "My educational qualifications are:\n\n1. **B.Sc. in Mathematics & Computer Science** (2023 - 2026) from **St. Joseph's University, Bengaluru**.\n2. **Pre-University Course (PCMC)** (2020 - 2022) from **St. Francis Composite PU College, Bengaluru**.\n3. **SSLC** (2019 - 2020) from **New Bishop Cotton English High School, Bengaluru**.",
    
    certificates: "I hold certifications across Technical and Extracurricular accomplishments:\n\n• **Technical & Internship**:\n  - Infosys Springboard: *Java for Beginners*, *Introduction to AI*, *Cyber Security Foundation*, and *Cybersecurity Awareness*.\n  - Eco Dispose: *Internship Capstone Letter*.\n• **Events & Activities**:\n  - National Service Scheme: *Sagar G NSS Certificate*.\n  - St. Joseph's University: *SJU Elixir 2.O Certificate* and *SJU Elixir 3.O Certificate*.\n  - SJU Student Council: *SJU Media Volunteer Certificate*.\n\nYou can view and download all of these in the **Files** or **Certificates** app on the desktop/launcher!",
    
    looking_for: "I am currently looking for full-time Software Developer roles, particularly in backend development (Python/SQL/APIs) or mobile development (Flutter/Android). I am ready to start contributing from day one!",
    
    recruiter_fit: "Why consider me?\n\n1. **Solid Foundation**: A degree in Mathematics & CS, bringing logical rigour to programming and database design.\n2. **Full Lifecycle Experience**: I have built and delivered a production-ready, 20+ screen app (INK App), managing everything from DB schemas to front-end state.\n3. **Self-Learner & Team Player**: Active hackathon participant, research publisher, student leader, and quick to pick up new tools (like Supabase, RLS, and AI-assisted development tools like Antigravity).",

    ink_app: "The **INK App** was built using Flutter, Dart, Supabase, and Provider. It's a role-based social media application that manages distinct access control for Admins, Brands, and Customers. I designed the PostgreSQL database schema, set up JWT-based authentication, and established Row Level Security (RLS) policies to make sure each role only sees their authorized data. It was presented to external faculty and praised for its technical execution.",
    
    research: "My research paper, titled **\"Cyber Crime in Urban Bengaluru: Emerging Threats and Countermeasures\"**, analyzes cybercrime patterns (such as AI voice scams and UPI fraud) and maps them to CERT-In guidelines. I ran a survey, conducted statistical analyses to identify public security awareness gaps, and proposed strategic countermeasures.",
    
    flipkart_clone: "The **Flipkart Clone** is a front-end practice project built completely with semantic HTML5 and vanilla CSS Flexbox and Grid layout systems. Key highlights include pixel-perfect responsive styling mimicking Flipkart's actual web page, a structured multi-category navbar, promotional banners, custom product lists, filter widgets, and navigation headers, with no external CSS framework.",
    
    contact: "You can reach me via:\n• **Email**: sagarshadow111@gmail.com\n• **Phone**: +91 6361488259\n• **LinkedIn**: linkedin.com/in/sagargajendra\n• **GitHub**: github.com/sagargajendra\n\nFeel free to call or drop an email!"
  }
};

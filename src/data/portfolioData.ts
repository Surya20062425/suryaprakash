import { CertificateItem, ExperienceItem, ProjectItem, SocialGroup, StatItem, ToolItem } from '../types';

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "google-ux",
    index: "01",
    title: "Google UX Design Professional Certificate",
    issuer: "Google Career Certificates",
    issuerOrg: "Google",
    issueDate: "2024",
    credentialId: "GGL-UX-784201",
    category: "ux",
    status: "Verified",
    summary: "Comprehensive 7-course professional specialization encompassing empathetic user research, responsive web design in Figma, wireframing, high-fidelity interactive prototyping, and cross-platform accessibility auditing.",
    skills: ["Figma Component Systems", "User Research & Heuristics", "Usability Testing", "WCAG 2.1 Accessibility", "Interactive Prototyping"],
    verificationUrl: "https://www.coursera.org/account/accomplishments/professional-cert/google-ux-design",
    score: "Honors Pass // Top 5%"
  },
  {
    id: "nng-ux-master",
    index: "02",
    title: "UX Master Certified (UXMC)",
    issuer: "Nielsen Norman Group (NN/g)",
    issuerOrg: "Nielsen Norman Group",
    issueDate: "2023",
    credentialId: "NNG-UXM-409122",
    category: "enterprise",
    status: "Verified",
    summary: "Recognized credential for advanced enterprise systems architecture, complex workflow decomposition, quantitative usability metrics, and scaling design systems across multinational software ecosystems.",
    skills: ["Enterprise UX Architecture", "Quantitative Usability Metrics", "Design Systems Governance", "Heuristic Evaluation", "Information Architecture"],
    verificationUrl: "https://www.nngroup.com/ux-certification/verify/",
    score: "Master Credential // 15 Exam Credits"
  },
  {
    id: "ixdf-design-systems",
    index: "03",
    title: "Design Systems & Component Architecture Specialist",
    issuer: "Interaction Design Foundation (IxDF)",
    issuerOrg: "IxDF",
    issueDate: "2023",
    credentialId: "IXDF-DS-910482",
    category: "enterprise",
    status: "Verified",
    summary: "Specialized accreditation focusing on multi-brand design tokens, atomic design hierarchies, design-to-code synchronizations, motion micro-interactions, and developer handoff automation.",
    skills: ["Design Token Architecture", "Component State Machines", "Micro-Interactions", "Token Studio / Style Dictionary", "Developer Alignment"],
    verificationUrl: "https://www.interaction-design.org/certificates",
    score: "Top 1% Course Finisher"
  },
  {
    id: "aws-cloud-architecture",
    index: "04",
    title: "Certified Cloud Practitioner & Frontend Systems",
    issuer: "Amazon Web Services (AWS)",
    issuerOrg: "AWS",
    issueDate: "2022",
    credentialId: "AWS-CCP-638192",
    category: "architecture",
    status: "Verified",
    summary: "Cloud infrastructure validation focusing on web application resilience, edge CDN asset distribution, API latency optimization, micro-frontend workflows, and cloud-native security.",
    skills: ["Edge CDN Distribution", "Cloud Latency Optimization", "Micro-Frontend Systems", "Serverless API Flow", "Cloud Security"],
    verificationUrl: "https://aws.amazon.com/verification",
    score: "Active Certification"
  },
  {
    id: "scrum-cspo",
    index: "05",
    title: "Certified Scrum Product Owner (CSPO®)",
    issuer: "Scrum Alliance",
    issuerOrg: "Scrum Alliance",
    issueDate: "2022",
    credentialId: "CSPO-SA-550183",
    category: "leadership",
    status: "Verified",
    summary: "Agile product discovery qualification connecting user-centric UX roadmaps directly with engineering sprint planning, stakeholder alignment, user story mapping, and release velocity.",
    skills: ["Agile Product Discovery", "User Story Mapping", "Cross-Functional Sprint Cadence", "Backlog Refinement", "Stakeholder Governance"],
    verificationUrl: "https://www.scrumalliance.org/verify",
    score: "Global Member Credential"
  },
  {
    id: "stanford-hci",
    index: "06",
    title: "Human-Computer Interaction (HCI) Design",
    issuer: "Stanford Center for Professional Development",
    issuerOrg: "Stanford",
    issueDate: "2020",
    credentialId: "STAN-HCI-312984",
    category: "ux",
    status: "Verified",
    summary: "Rigorous academic accreditation in cognitive psychology, human mental models, interface affordances, spatial UI ergonomics, and iterative rapid experimentation protocols.",
    skills: ["Cognitive Mental Models", "Interface Affordances", "Rapid Iteration Protocols", "Spatial UI Ergonomics", "Qualitative Studies"],
    verificationUrl: "https://online.stanford.edu/verify",
    score: "Graduated with Distinction"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    key: "opswat",
    index: "01",
    name: "OPSWAT",
    role: "Sr. Product Designer",
    period: "2025 – Present",
    location: "Ho Chi Minh City",
    description: "Led product design across My OPSWAT, Central Management, MetaDefender Drive, and Industrial Firewall, scaling the design system to keep UX consistent across the enterprise ecosystem.",
    skills: ["Design System", "Enterprise UX", "Cybersecurity", "Micro-interactions"]
  },
  {
    key: "skymavis",
    index: "02",
    name: "SkyMavis",
    role: "Product Designer",
    period: "2024 – 2025",
    location: "Ho Chi Minh City",
    description: "Worked closely across Mavis Market, Mavis Store, and Dev Journey — from competitive research and user interviews to UAT before release.",
    skills: ["Web3 UX", "Marketplace", "Game Ecosystem", "Figma Components"]
  },
  {
    key: "firekamp",
    index: "03",
    name: "FireKamp",
    role: "Sr. Product Designer",
    period: "2022 – 2024",
    location: "Ho Chi Minh City",
    description: "Delivered hi-fi visual design across varied product types (time management, weight-loss supplement, call recording, and more), ensuring live products matched the design.",
    skills: ["Visual Design", "Rapid Prototyping", "Design QA", "Cross-platform"]
  },
  {
    key: "uptivistic",
    index: "04",
    name: "Uptivistic",
    role: "Product Design Lead",
    period: "2020 – 2022",
    location: "Ho Chi Minh City",
    description: "Led a 4-person design team, turning Game Designer wireframes into hi-fi visual designs while working closely with developers to keep live builds on-spec.",
    skills: ["Team Leadership", "Game UI", "Design Ops", "Developer Hand-off"]
  },
  {
    key: "ilabs",
    index: "05",
    name: "ILABS",
    role: "Product Designer",
    period: "2019 – 2020",
    location: "Ho Chi Minh City",
    description: "Partnered directly with client-side POs/PMs across projects, balancing internal/marketing asset production with consistent design quality.",
    skills: ["Client Consultation", "Design Sprint", "Product Discovery"]
  },
  {
    key: "mpire",
    index: "06",
    name: "Mpire",
    role: "UI/UX Designer",
    period: "2018 – 2019",
    location: "Ho Chi Minh City",
    description: "Shaped the visual style and produced advertising/print assets for marketing campaigns, working closely with CDs and ADs.",
    skills: ["Visual Identity", "Campaign Design", "Creative Direction"]
  },
  {
    key: "mingle",
    index: "07",
    name: "Mingle",
    role: "UI UX Design Lead",
    period: "2016 – 2018",
    location: "Ho Chi Minh City",
    description: "Led a 13-person team (5 UX/UI + 8 graphic designers) while designing UX/UI end-to-end for the Mingle 2 and Just Say Hi Dating apps.",
    skills: ["Design Management", "Mobile Dating UX", "User Retention", "A/B Testing"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "skymavis",
    title: "SkyMavis",
    year: "2024-2025",
    tag: "case-study",
    image: "/images/work/case-study-skymavis.webp",
    ratio: 880 / 641,
    cover: "#64ffc1",
    size: "lg",
    summary: "Complete marketplace design and developer portal architecture for the creators of Ronin Network and Axie Infinity.",
    details: {
      overview: "Sky Mavis is the trailblazing gaming studio behind Axie Infinity and Ronin Network. Curtis led UX across Mavis Market and Mavis Store, streamlining token purchases, item discovery, and complex blockchain transactions into friction-free web & mobile experiences.",
      role: "Product Designer — Marketplace & Developer Experience",
      period: "2024 - 2025",
      deliverables: ["Marketplace redesign", "Checkout & token checkout flow", "Mobile responsive design system", "Developer portal journey"],
      highlights: [
        "Reduced transaction drop-off by 34% with simplified wallet signing flows",
        "Unified design tokens across 3 core platforms",
        "Conducted 40+ user interviews across global gaming communities"
      ]
    }
  },
  {
    id: "opswat",
    title: "OPSWAT",
    year: "2025-2026",
    tag: "case-study",
    image: "/images/work/case-study-opswat.webp",
    ratio: 880 / 637,
    cover: "#64ffc1",
    size: "lg",
    summary: "Mission-critical cybersecurity enterprise platform, unifying industrial firewall and peripheral security management.",
    details: {
      overview: "OPSWAT provides critical infrastructure cybersecurity solutions. The challenge was unifying complex data visualization, real-time threat telemetry, and multi-tenant management across MetaDefender and Industrial Firewall into an intuitive, high-density interface.",
      role: "Sr. Product Designer — Enterprise Platform",
      period: "2025 - Present",
      deliverables: ["Central Management console", "Threat telemetry dashboards", "Component library overhaul", "Industrial firewall control flows"],
      highlights: [
        "Consolidated 5 disparate security consoles into My OPSWAT",
        "Streamlined threat response time by 42% through contextual action panels",
        "Architected scalable design token system for enterprise dark/light environments"
      ]
    }
  },
  {
    id: "firekamp",
    title: "Firekamp Website",
    year: "2022",
    tag: "web-design",
    image: "/images/work/web-firekamp.webp",
    ratio: 880 / 660,
    cover: "#64e8ff",
    size: "sm",
    href: "https://www.firekamp.com/",
    summary: "Modern agency branding and digital presence celebrating high-energy product design and engineering."
  },
  {
    id: "pcos-cysterhood",
    title: "PCOS Cysterhood",
    year: "2022",
    tag: "app-design",
    image: "/images/work/app-pcos-cysterhood.webp",
    ratio: 880 / 660,
    cover: "#64e8ff",
    size: "sm",
    href: "https://apps.apple.com/vn/app/cysterhood-pcos-weight-loss/id1638723168",
    summary: "Compassionate health & wellness mobile app supporting thousands of women with PCOS lifestyle management."
  },
  {
    id: "tekcom",
    title: "Tekcom",
    year: "2018",
    tag: "web-design",
    image: "/images/work/web-tekcom.webp",
    ratio: 880 / 660,
    cover: "#64e8ff",
    size: "lg",
    href: "https://www.tekcom.vn/",
    summary: "Corporate industrial tech platform establishing a bold, modern digital presence in Vietnam."
  },
  {
    id: "itrackbites",
    title: "iTrackBites",
    year: "2021",
    tag: "app-design",
    image: "/images/work/app-itrackbites.webp",
    ratio: 816 / 598,
    cover: "#64e8ff",
    size: "sm",
    href: "https://healthiapp.com/",
    summary: "Nutritional tracking and habit formation app with clean visual calorie counters and weight milestones."
  },
  {
    id: "outdoor-gps",
    title: "Outdoor GPS",
    year: "2019",
    tag: "app-design",
    image: "/images/work/app-outdoor-gps.webp",
    ratio: 880 / 660,
    cover: "#64e8ff",
    size: "lg",
    href: "https://apps.apple.com/us/app/outdoors-gps-offline-os-maps/id365688106?l=vi",
    summary: "Rugged topographical mapping and hiking navigation utility built for zero-connectivity environments."
  },
  {
    id: "vinh-tuong",
    title: "Vinh Tuong",
    year: "2018",
    tag: "web-design",
    image: "/images/work/web-vinh-tuong.webp",
    ratio: 880 / 660,
    cover: "#64e8ff",
    size: "lg",
    href: "https://vinhtuong.com/",
    summary: "Architectural ceiling and gypsum building materials portal with interactive project estimators."
  },
  {
    id: "sortly",
    title: "Sortly",
    year: "2020",
    tag: "app-design",
    image: "/images/work/app-sortly.webp",
    ratio: 816 / 598,
    cover: "#64e8ff",
    size: "sm",
    href: "https://apps.apple.com/us/app/sortly-inventory-simplified/id529353551",
    summary: "Visual inventory management platform trusted by over 10,000 businesses worldwide."
  }
];

export const STATS: StatItem[] = [
  { box: "box-1", label: "Product Shipped", value: "30+" },
  { box: "box-2", label: "Years of exp", value: "10+" },
  { box: "box-3", label: "Global Companies", value: "7+" }
];

export const TOOLS: ToolItem[] = [
  { box: "box-4", logo: "figma", alt: "Figma", label: "Figma" },
  { box: "box-5", logo: "claude", alt: "Claude", label: "Claude" },
  { box: "box-7", logo: "photoshop", alt: "Photoshop", label: "Photoshop" },
  { box: "box-8", logo: "illustrator", alt: "Illustrator", label: "Illustrator" }
];

export const SOCIAL_GROUPS: SocialGroup[] = [
  {
    label: "Portfolio",
    links: [
      { label: "Dribbble", href: "https://dribbble.com/CurtisNguyen" },
      { label: "Github", href: "https://github.com/phuocthanh23" }
    ]
  },
  {
    label: "Photography",
    links: [
      { label: "Unsplash", href: "https://unsplash.com/@curtisnguyen" },
      { label: "Pexels", href: "https://www.pexels.com/vi-vn/@curtis-nguyen-482858871/" }
    ]
  },
  {
    label: "Social",
    links: [
      { label: "Linkedin", href: "https://www.linkedin.com/in/curtis-nguyen-255354137/" },
      { label: "Instagram", href: "https://www.instagram.com/tistis.bitbit/" }
    ]
  }
];

export const HERO_INTRO_WORDS = [
  { text: "", className: "w-8 inline-block" },
  { text: "I'm" },
  { text: "a" },
  { text: "regular" },
  { text: "guy" },
  { text: "passionate" },
  { text: "about" },
  { text: "Art", className: "text-[#9df133] font-bold" },
  { text: "and" },
  { text: "<technology/>", className: "text-[#64e8ff] font-mono" },
  { text: "Nothing" },
  { text: "excites" },
  { text: "me" },
  { text: "more" },
  { text: "than" },
  { text: "working" },
  { text: "in" },
  { text: "those" },
  { text: "spaces." },
  { text: "If" },
  { text: "I" },
  { text: "ever" },
  { text: "got" },
  { text: "rich," },
  { text: "I'd" },
  { text: "open" },
  { text: "an" },
  { text: "art" },
  { text: "gallery" },
  { text: "to" },
  { text: "support" },
  { text: "young" },
  { text: "artists." }
];

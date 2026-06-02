import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { getPayload } from "payload";

const PUBLISHED = "published";

const researchAreasSeed = [
  {
    slug: "ai-data-science",
    title: "Artificial Intelligence & Data Science",
    short: "Applied machine learning, decision systems, and large-scale analytics.",
    summary:
      "Research spanning foundational machine learning, applied analytics, and decision-support systems for engineering, healthcare, and industrial domains.",
    description: [
      { paragraph: "The AI and Data Science group develops models and systems that move from research prototypes to deployable decision tools." },
      { paragraph: "A core emphasis is responsible and explainable AI for regulated environments." },
    ],
    highlights: ["Explainable machine learning", "Computer vision", "Forecasting and optimisation"],
    applications: ["Predictive maintenance", "Clinical decision support", "Supply-chain analytics"],
    icon: "brain",
    sortOrder: 1,
  },
  {
    slug: "cybersecurity-forensics",
    title: "Cybersecurity & Digital Forensics",
    short: "Secure systems, threat intelligence, and forensic investigation.",
    summary: "Securing connected systems through applied cryptography, network defence, and digital forensic methodology.",
    description: [{ paragraph: "Research across secure system design, vulnerability assessment, and post-incident forensic analysis." }],
    highlights: ["Network intrusion detection", "IoT security", "Digital forensics"],
    applications: ["Security audits", "Forensic investigation", "Secure-by-design reviews"],
    icon: "shield",
    sortOrder: 2,
  },
  {
    slug: "robotics-automation",
    title: "Robotics & Automation",
    short: "Autonomous systems, motion planning, and intelligent automation.",
    summary: "Design and control of robotic systems and automation for manufacturing and service environments.",
    description: [{ paragraph: "Including MIT Bengaluru's RoboSub autonomous underwater vehicle programme." }],
    highlights: ["Autonomous navigation", "Vision-guided manipulation", "Industrial automation"],
    applications: ["Underwater robotics", "Quality inspection", "Logistics automation"],
    icon: "robot",
    sortOrder: 3,
  },
  {
    slug: "iot-embedded-systems",
    title: "IoT & Embedded Systems",
    short: "Connected sensing, edge computing, and embedded platforms.",
    summary: "End-to-end IoT research from sensor nodes to edge intelligence and cloud integration.",
    description: [{ paragraph: "Low-power embedded design and industrial IoT integration." }],
    highlights: ["Edge AI", "Wireless sensor networks", "Embedded firmware"],
    applications: ["Smart metering", "Asset tracking", "Connected healthcare"],
    icon: "chip",
    sortOrder: 4,
  },
];

const researchersSeed = [
  {
    slug: "prema-kv",
    name: "Dr. Prema K V",
    designation: "Joint Director, School of Computer Engineering",
    email: "prema.kv@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["ai-data-science"],
    expertiseKeywords: ["Academic Leadership", "Computer Science", "Research Strategy"],
    researchInterests: ["Research leadership", "Computing education", "Institutional research policy"],
    bio: "Dr. Prema K V serves as Joint Director of the School of Computer Engineering at MIT Bengaluru, MAHE, supporting research strategy and academic programmes across computing disciplines.",
    consultancyAreas: ["Research programme advisory", "Computing curriculum design"],
    collaborationInterests: ["Institutional research partnerships", "Industry-academia MoUs"],
  },
  {
    slug: "dayananda-p",
    name: "Dr. Dayananda P",
    designation: "Professor and Dean",
    email: "dayananda.p@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["ai-data-science", "cybersecurity-forensics"],
    expertiseKeywords: ["Dean", "Computer Science", "Research Governance"],
    researchInterests: ["Distributed systems", "Network security", "Research administration"],
    bio: "Dr. Dayananda P is Professor and Dean at MIT Bengaluru, with research interests in distributed computing and network security.",
    consultancyAreas: ["Technical advisory", "Research governance"],
    collaborationInterests: ["Sponsored research", "Joint degree programmes"],
  },
  {
    slug: "abhijit-das",
    name: "Dr. Abhijit Das",
    designation: "Professor, School of Computer Engineering",
    email: "abhijit.das@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["ai-data-science", "cybersecurity-forensics"],
    expertiseKeywords: ["Machine Learning", "Cybersecurity", "Data Analytics"],
    researchInterests: ["Applied machine learning", "Secure computing", "Data-driven systems"],
    bio: "Dr. Abhijit Das is a faculty member in the School of Computer Engineering at MIT Bengaluru, working on applied machine learning and secure computing.",
    consultancyAreas: ["AI model development", "Security architecture review"],
    collaborationInterests: ["Industry-sponsored applied ML", "Joint research projects"],
  },
  {
    slug: "gauri-kalnoor",
    name: "Dr. Gauri Kalnoor",
    designation: "Assistant Professor (Senior Scale)",
    email: "gauri.kalnoor@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["ai-data-science"],
    expertiseKeywords: ["Machine Learning", "Data Science", "Deep Learning"],
    researchInterests: ["Machine learning", "Data mining", "Predictive analytics"],
    bio: "Dr. Gauri Kalnoor is Assistant Professor (Senior Scale) at the School of Computer Engineering, MIT Bengaluru. Her research focuses on machine learning and data science.",
    scholar: "https://scholar.google.com",
    consultancyAreas: ["Analytics advisory", "ML model benchmarking"],
    collaborationInterests: ["Healthcare analytics", "Industrial data science"],
  },
  {
    slug: "kaushik-mishra",
    name: "Dr. Kaushik Mishra",
    designation: "Associate Professor, School of Computer Engineering",
    email: "kaushik.mishra@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["iot-embedded-systems", "robotics-automation"],
    expertiseKeywords: ["Embedded Systems", "Robotics", "IoT"],
    researchInterests: ["Embedded systems", "Robotic control", "Sensor fusion"],
    bio: "Dr. Kaushik Mishra researches embedded systems and robotics at MIT Bengaluru, with applications in autonomous systems and industrial IoT.",
    consultancyAreas: ["Embedded prototype development", "Robotics feasibility studies"],
    collaborationInterests: ["Autonomous systems pilots", "Industry 4.0 projects"],
  },
  {
    slug: "rashmi-r",
    name: "Dr. Rashmi R",
    designation: "Associate Professor, School of Computer Engineering",
    email: "rashmi.r@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["cybersecurity-forensics"],
    expertiseKeywords: ["Cybersecurity", "Network Security", "Cryptography"],
    researchInterests: ["Network security", "Intrusion detection", "Applied cryptography"],
    bio: "Dr. Rashmi R focuses on network security and intrusion detection at MIT Bengaluru.",
    consultancyAreas: ["Security audits", "Penetration testing advisory"],
    collaborationInterests: ["Critical infrastructure security", "Secure product design"],
  },
  {
    slug: "prakash-b-metre",
    name: "Dr. Prakash B Metre",
    designation: "Professor, School of Computer Engineering",
    email: "prakash.metre@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["ai-data-science", "iot-embedded-systems"],
    expertiseKeywords: ["High-Performance Computing", "Parallel Computing", "IoT"],
    researchInterests: ["High-performance computing", "Parallel algorithms", "IoT systems"],
    bio: "Dr. Prakash B Metre researches high-performance and parallel computing with IoT applications at MIT Bengaluru.",
    consultancyAreas: ["HPC architecture review", "Performance optimisation"],
    collaborationInterests: ["Scalable computing projects", "Data pipeline design"],
  },
  {
    slug: "preeti-jha",
    name: "Dr. Preeti Jha",
    designation: "Assistant Professor (Senior Scale)",
    email: "preeti.jha@manipal.edu",
    departmentSlug: "school-computer-engineering",
    domainSlugs: ["ai-data-science"],
    expertiseKeywords: ["Natural Language Processing", "Text Analytics", "AI"],
    researchInterests: ["Natural language processing", "Text mining", "Information retrieval"],
    bio: "Dr. Preeti Jha works on natural language processing and text analytics at the School of Computer Engineering, MIT Bengaluru.",
    consultancyAreas: ["NLP solution design", "Text analytics advisory"],
    collaborationInterests: ["Document intelligence", "Conversational AI research"],
  },
];

export async function script(config) {
  if (!process.env.DATABASE_URI) {
    console.error("DATABASE_URI is required. Run: npm run db:up");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  console.log("Seeding MIT Bengaluru research portal (production data)…");

const existingAdmin = await payload.find({
  collection: "users",
  where: { email: { equals: "admin@mit.mahe.edu" } },
  limit: 1,
});
if (existingAdmin.docs.length === 0) {
  await payload.create({
    collection: "users",
    data: {
      email: "admin@mit.mahe.edu",
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
      name: "Research Office Admin",
      role: "research_office",
    },
  });
  console.log("Created admin: admin@mit.mahe.edu");
}

const deptIds = {};
for (const d of [
  { name: "School of Computer Engineering", slug: "school-computer-engineering" },
  { name: "Department of Electronics & Communication Engineering", slug: "ece" },
]) {
  const existing = await payload.find({
    collection: "departments",
    where: { slug: { equals: d.slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    deptIds[d.slug] = existing.docs[0].id;
  } else {
    const doc = await payload.create({
      collection: "departments",
      data: { ...d, status: PUBLISHED },
    });
    deptIds[d.slug] = doc.id;
  }
}

const areaIds = {};
for (const area of researchAreasSeed) {
  const existing = await payload.find({
    collection: "research-areas",
    where: { slug: { equals: area.slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    areaIds[area.slug] = existing.docs[0].id;
  } else {
    const doc = await payload.create({
      collection: "research-areas",
      data: { ...area, status: PUBLISHED },
    });
    areaIds[area.slug] = doc.id;
  }
}

const researcherIds = {};
for (const r of researchersSeed) {
  const existing = await payload.find({
    collection: "researchers",
    where: { slug: { equals: r.slug } },
    limit: 1,
  });
  const data = {
    name: r.name,
    slug: r.slug,
    designation: r.designation,
    email: r.email,
    bio: r.bio,
    department: deptIds[r.departmentSlug],
    domains: r.domainSlugs.map((s) => areaIds[s]),
    expertiseKeywords: r.expertiseKeywords,
    researchInterests: r.researchInterests,
    consultancyAreas: r.consultancyAreas,
    collaborationInterests: r.collaborationInterests,
    scholar: r.scholar,
    status: PUBLISHED,
  };
  if (existing.docs[0]) {
    await payload.update({ collection: "researchers", id: existing.docs[0].id, data });
    researcherIds[r.slug] = existing.docs[0].id;
  } else {
    const doc = await payload.create({ collection: "researchers", data });
    researcherIds[r.slug] = doc.id;
  }
}

const robosubExisting = await payload.find({
  collection: "projects",
  where: { slug: { equals: "robosub-auv-mit-bengaluru" } },
  limit: 1,
});
if (!robosubExisting.docs[0]) {
  await payload.create({
    collection: "projects",
    data: {
      slug: "robosub-auv-mit-bengaluru",
      title: "RoboSub Autonomous Underwater Vehicle — India Representation",
      summary:
        "Interdisciplinary student-led development of an autonomous underwater vehicle representing India at RoboSub 2026, integrating autonomy software, computer vision, embedded systems, and mechanical engineering.",
      pi: researcherIds["kaushik-mishra"],
      coInvestigators: [researcherIds["abhijit-das"]],
      fundingAgency: "MIT Bengaluru & Industry Partners",
      amountLakh: 45,
      projectStatus: "Ongoing",
      startYear: 2024,
      endYear: 2026,
      domain: areaIds["robotics-automation"],
      status: PUBLISHED,
    },
  });
}

await payload.updateGlobal({
  slug: "site-settings",
  data: {
    institutionName: "Manipal Institute of Technology Bengaluru, MAHE",
    contactEmail: "research.blr@manipal.edu",
    contactPhone: "+91 80 0000 0000",
    address: "MIT Bengaluru Campus, Yelahanka, Bengaluru, Karnataka 560064, India",
    metrics: [
      { value: "150+", label: "Active Researchers", detail: "Faculty and research staff" },
      { value: "₹42 Cr", label: "Sanctioned Research Funding", detail: "Cumulative funded research" },
      { value: "90+", label: "Sponsored Projects", detail: "Government and industry projects" },
      { value: "35+", label: "Patents Filed & Granted", detail: "Intellectual property" },
      { value: "20+", label: "Centres, Labs & Facilities", detail: "Research infrastructure" },
      { value: "60+", label: "Industry Collaborations", detail: "Active partnerships" },
    ],
  },
});

console.log("Seed complete.");
console.log("Admin: http://localhost:3000/admin");
console.log("  Email: admin@mit.mahe.edu");
console.log("  Password:", process.env.ADMIN_PASSWORD || "ChangeMe123!");
}

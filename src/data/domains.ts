import type { ResearchDomain } from "@/lib/types";

export const domains: ResearchDomain[] = [
  {
    id: "d1",
    slug: "ai-data-science",
    title: "Artificial Intelligence & Data Science",
    short: "Applied machine learning, decision systems, and large-scale analytics.",
    summary:
      "Research spanning foundational machine learning, applied analytics, and decision-support systems for engineering, healthcare, and industrial domains.",
    description: [
      "The AI and Data Science group develops models and systems that move from research prototypes to deployable decision tools. Work covers supervised and self-supervised learning, time-series forecasting, computer vision, and natural language processing.",
      "A core emphasis is responsible and explainable AI: methods are evaluated not only on accuracy but on robustness, interpretability, and suitability for regulated environments such as healthcare and finance.",
    ],
    highlights: [
      "Explainable and trustworthy machine learning",
      "Computer vision for inspection and diagnostics",
      "Forecasting and optimisation for operations",
    ],
    applications: [
      "Predictive maintenance for manufacturing",
      "Clinical decision support",
      "Demand forecasting and supply-chain analytics",
    ],
    icon: "brain",
  },
  {
    id: "d2",
    slug: "cybersecurity-forensics",
    title: "Cybersecurity & Digital Forensics",
    short: "Secure systems, threat intelligence, and forensic investigation.",
    summary:
      "Securing connected systems through applied cryptography, network defence, malware analysis, and digital forensic methodology.",
    description: [
      "The Cybersecurity group works across the defence lifecycle: secure system design, vulnerability assessment, intrusion detection, and post-incident forensic analysis.",
      "Capabilities include malware reverse-engineering, IoT and OT security assessment, and the development of forensic procedures suitable for evidentiary standards.",
    ],
    highlights: [
      "Network intrusion detection and response",
      "IoT and operational-technology security",
      "Digital forensics and incident response",
    ],
    applications: [
      "Security audits for enterprise and critical infrastructure",
      "Forensic investigation support",
      "Secure-by-design product reviews",
    ],
    icon: "shield",
  },
  {
    id: "d3",
    slug: "iot-embedded-systems",
    title: "IoT & Embedded Systems",
    short: "Connected sensing, edge computing, and embedded platforms.",
    summary:
      "End-to-end Internet of Things research from sensor nodes and embedded firmware to edge intelligence and cloud integration.",
    description: [
      "Research covers low-power embedded design, wireless sensor networks, edge AI, and industrial IoT integration with reliability and security as first-order concerns.",
      "The group supports rapid prototyping of connected devices and the validation of communication stacks under realistic field conditions.",
    ],
    highlights: [
      "Low-power and energy-harvesting nodes",
      "Edge inference on constrained hardware",
      "Industrial IoT and predictive monitoring",
    ],
    applications: [
      "Smart metering and environmental monitoring",
      "Asset tracking and condition monitoring",
      "Connected healthcare devices",
    ],
    icon: "chip",
  },
  {
    id: "d4",
    slug: "robotics-automation",
    title: "Robotics & Automation",
    short: "Autonomous systems, motion planning, and intelligent automation.",
    summary:
      "Design and control of robotic systems, autonomous navigation, and automation for manufacturing and service environments.",
    description: [
      "Work includes manipulator and mobile-robot control, perception-driven navigation, human-robot interaction, and the automation of repetitive industrial tasks.",
      "The group integrates mechanical design, control theory, and machine perception to deliver tested automation cells and autonomous platforms.",
    ],
    highlights: [
      "Autonomous mobile robots and navigation",
      "Vision-guided manipulation",
      "Flexible automation cells",
    ],
    applications: [
      "Warehouse and logistics automation",
      "Quality inspection robotics",
      "Assistive and service robotics",
    ],
    icon: "robot",
  },
  {
    id: "d5",
    slug: "sustainable-energy",
    title: "Sustainable Energy",
    short: "Renewables, storage, and energy-efficient systems.",
    summary:
      "Research on renewable generation, energy storage, power electronics, and grid integration toward low-carbon energy systems.",
    description: [
      "The Sustainable Energy group studies photovoltaic systems, battery and hybrid storage, electric mobility power trains, and smart-grid integration.",
      "Emphasis is placed on field-validated efficiency improvements and techno-economic assessment for deployment at scale.",
    ],
    highlights: [
      "Solar PV performance and reliability",
      "Battery management and storage systems",
      "Smart-grid and microgrid integration",
    ],
    applications: [
      "Rooftop and distributed solar optimisation",
      "EV charging and battery systems",
      "Energy audits and efficiency studies",
    ],
    icon: "leaf",
  },
  {
    id: "d6",
    slug: "smart-infrastructure",
    title: "Smart Infrastructure",
    short: "Connected mobility, structures, and urban systems.",
    summary:
      "Sensing, modelling, and analytics for resilient buildings, transport networks, and urban infrastructure.",
    description: [
      "Research integrates structural health monitoring, intelligent transport systems, and digital-twin modelling of physical assets.",
      "The group works with civil, electronics, and computing teams to instrument infrastructure and translate sensor data into maintenance and planning decisions.",
    ],
    highlights: [
      "Structural health monitoring",
      "Intelligent transport systems",
      "Digital twins for built assets",
    ],
    applications: [
      "Bridge and building condition assessment",
      "Traffic modelling and signal optimisation",
      "Smart-campus and smart-city pilots",
    ],
    icon: "building",
  },
  {
    id: "d7",
    slug: "advanced-computing-networks",
    title: "Advanced Computing & Networks",
    short: "High-performance computing, cloud, and next-generation networks.",
    summary:
      "Distributed and high-performance computing, cloud-native systems, and the design of efficient communication networks.",
    description: [
      "The group studies parallel and distributed algorithms, cloud and edge orchestration, software-defined networking, and next-generation wireless systems.",
      "Research outcomes target throughput, latency, and energy efficiency for data-intensive and latency-sensitive applications.",
    ],
    highlights: [
      "High-performance and parallel computing",
      "Cloud-native and edge orchestration",
      "5G/6G and software-defined networks",
    ],
    applications: [
      "Scalable data-processing pipelines",
      "Network performance optimisation",
      "Latency-critical service design",
    ],
    icon: "network",
  },
  {
    id: "d8",
    slug: "biomedical-health-tech",
    title: "Biomedical & Health Technology",
    short: "Devices, signals, and computing at the clinical interface.",
    summary:
      "Engineering at the interface of medicine: biomedical devices, physiological signal processing, and health informatics.",
    description: [
      "Research spans wearable and point-of-care devices, biomedical signal and image processing, and data systems that support clinical workflows.",
      "Projects are developed with clinical collaborators to ensure relevance, usability, and a credible path to validation.",
    ],
    highlights: [
      "Wearable and point-of-care devices",
      "Biomedical signal and image analysis",
      "Health informatics and clinical data systems",
    ],
    applications: [
      "Remote patient monitoring",
      "Diagnostic decision support",
      "Rehabilitation and assistive technology",
    ],
    icon: "heart",
  },
  {
    id: "d9",
    slug: "materials-manufacturing-design",
    title: "Materials, Manufacturing & Design Innovation",
    short: "Advanced materials, additive manufacturing, and design.",
    summary:
      "Development and characterisation of advanced materials, additive and precision manufacturing, and design-led product innovation.",
    description: [
      "The group works on advanced and composite materials, additive manufacturing processes, and design methodologies that link materials behaviour to product performance.",
      "Capabilities support prototyping, materials characterisation, and process optimisation for industrial partners.",
    ],
    highlights: [
      "Composite and functional materials",
      "Additive and precision manufacturing",
      "Design for manufacturing and reliability",
    ],
    applications: [
      "Lightweight component design",
      "Rapid prototyping and tooling",
      "Materials failure analysis",
    ],
    icon: "cube",
  },
];

export function getDomain(slug: string) {
  return domains.find((d) => d.slug === slug);
}

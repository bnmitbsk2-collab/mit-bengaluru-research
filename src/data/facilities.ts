import type { Facility } from "@/lib/types";

export const facilities: Facility[] = [
  {
    id: "f1",
    slug: "centre-applied-ai",
    name: "Centre for Applied AI & Data Science",
    type: "Centre",
    domain: "ai-data-science",
    short: "Translational AI research and analytics for industry and healthcare.",
    summary:
      "An interdisciplinary centre developing and validating machine-learning systems for engineering, healthcare, and industrial decision-making.",
    description: [
      "The Centre brings together faculty across computing, electronics, and biomedical engineering to move AI research from prototype to deployable systems.",
      "It provides model development, validation, and advisory services to industry and academic partners, with a strong emphasis on responsible and explainable AI.",
    ],
    capabilities: [
      "Custom model development and benchmarking",
      "Computer-vision inspection pipelines",
      "Model validation and explainability audits",
    ],
    equipment: [
      "GPU compute cluster for model training",
      "Annotation and data-curation workstations",
      "Secure data-handling environment",
    ],
    services: [
      "Proof-of-concept model development",
      "Independent model validation",
      "Data strategy and analytics advisory",
    ],
    leadSlug: "ananya-rao",
  },
  {
    id: "f2",
    slug: "cybersecurity-lab",
    name: "Cybersecurity & Digital Forensics Laboratory",
    type: "Laboratory",
    domain: "cybersecurity-forensics",
    short: "Security assessment, forensics, and IoT/OT testbed.",
    summary:
      "A laboratory for vulnerability assessment, malware analysis, and digital forensic investigation, with an industrial IoT security testbed.",
    description: [
      "The laboratory supports security audits, forensic investigations, and applied research on intrusion detection for connected systems.",
      "An isolated testbed allows safe evaluation of malware and security tooling against representative IoT and OT configurations.",
    ],
    capabilities: [
      "Penetration testing and vulnerability assessment",
      "Malware analysis in isolated environments",
      "Digital forensic acquisition and analysis",
    ],
    equipment: [
      "Isolated malware-analysis network",
      "Forensic workstations and write-blockers",
      "Industrial IoT/OT security testbed",
    ],
    services: [
      "Security audits and penetration testing",
      "Forensic investigation support",
      "Secure architecture review",
    ],
    leadSlug: "vikram-menon",
  },
  {
    id: "f3",
    slug: "iot-embedded-lab",
    name: "IoT & Embedded Systems Laboratory",
    type: "Laboratory",
    domain: "iot-embedded-systems",
    short: "Rapid prototyping of connected and embedded devices.",
    summary:
      "A prototyping laboratory for embedded firmware, wireless sensor networks, and edge-AI devices, with field-validation capability.",
    description: [
      "The laboratory supports the full prototyping cycle for connected devices, from embedded firmware to edge inference and cloud integration.",
      "It is equipped for the design, assembly, and reliability testing of low-power IoT nodes.",
    ],
    capabilities: [
      "Embedded firmware and hardware design",
      "Wireless protocol validation",
      "Edge-AI deployment and benchmarking",
    ],
    equipment: [
      "Embedded development and debug hardware",
      "RF and protocol analysis tools",
      "Environmental and reliability test setup",
    ],
    services: [
      "IoT prototype design and assembly",
      "Embedded firmware development",
      "Sensor integration and validation",
    ],
    leadSlug: "sneha-kulkarni",
  },
  {
    id: "f4",
    slug: "robotics-automation-lab",
    name: "Robotics & Intelligent Automation Laboratory",
    type: "Laboratory",
    domain: "robotics-automation",
    short: "Robotic manipulation, mobile robots, and automation cells.",
    summary:
      "A laboratory for the design and validation of robotic manipulation, autonomous navigation, and flexible automation systems.",
    description: [
      "The laboratory integrates manipulators, mobile platforms, and machine vision to develop and test automation solutions.",
      "It supports the design of automation cells and the evaluation of perception-driven control for industrial tasks.",
    ],
    capabilities: [
      "Vision-guided manipulation",
      "Autonomous navigation development",
      "Automation cell design and testing",
    ],
    equipment: [
      "Industrial and collaborative robot arms",
      "Mobile robot platforms",
      "Machine-vision and sensing rigs",
    ],
    services: [
      "Automation feasibility studies",
      "Robotic inspection system design",
      "Process automation prototyping",
    ],
    leadSlug: "rohit-sharma",
  },
  {
    id: "f5",
    slug: "energy-systems-lab",
    name: "Sustainable Energy Systems Laboratory",
    type: "Laboratory",
    domain: "sustainable-energy",
    short: "Solar, storage, and smart-grid integration research.",
    summary:
      "A laboratory for renewable generation, energy storage, and microgrid integration, with techno-economic assessment capability.",
    description: [
      "The laboratory studies photovoltaic systems, battery management, and grid integration under realistic operating conditions.",
      "It supports energy audits, system design, and the demonstration of microgrid configurations.",
    ],
    capabilities: [
      "Solar PV characterisation",
      "Battery and storage testing",
      "Microgrid and power-electronics evaluation",
    ],
    equipment: [
      "Solar emulation and PV test bench",
      "Battery cycling and characterisation setup",
      "Power-electronics and grid-emulation hardware",
    ],
    services: [
      "Energy audits and efficiency studies",
      "Solar and storage system design",
      "EV charging infrastructure advisory",
    ],
    leadSlug: "meera-iyer",
  },
  {
    id: "f6",
    slug: "smart-infrastructure-centre",
    name: "Centre for Smart Infrastructure & Digital Twins",
    type: "Centre",
    domain: "smart-infrastructure",
    short: "Instrumentation and digital-twin modelling of built assets.",
    summary:
      "A centre for structural health monitoring, intelligent transport, and digital-twin modelling of buildings and infrastructure.",
    description: [
      "The Centre instruments physical assets and translates sensor data into maintenance and planning decisions.",
      "It develops digital twins that link real-time sensing to predictive models of structural and urban systems.",
    ],
    capabilities: [
      "Structural health monitoring",
      "Digital-twin development",
      "Intelligent transport analytics",
    ],
    equipment: [
      "Structural sensing and data-acquisition systems",
      "Field instrumentation kits",
      "Simulation and modelling workstations",
    ],
    services: [
      "Structural condition assessment",
      "Infrastructure instrumentation",
      "Digital-twin modelling",
    ],
    leadSlug: "karthik-reddy",
  },
];

export function getFacility(slug: string) {
  return facilities.find((f) => f.slug === slug);
}

import type { Patent, Publication } from "@/lib/types";

export const publications: Publication[] = [
  {
    id: "p1",
    title:
      "Interpretable Deep Learning for Lesion Detection: A Clinically Aligned Evaluation",
    authors: ["A. Rao", "P. Deshpande", "S. Verma"],
    venue: "IEEE Transactions on Medical Imaging",
    year: 2025,
    type: "Journal",
    doi: "10.0000/tmi.2025.000001",
    domain: "ai-data-science",
  },
  {
    id: "p2",
    title: "Privacy-Preserving Federated Learning for Multi-Centre Clinical Data",
    authors: ["A. Rao", "P. Deshpande"],
    venue: "ACM Conference on Health, Inference, and Learning",
    year: 2024,
    type: "Conference",
    doi: "10.0000/chil.2024.000045",
    domain: "ai-data-science",
  },
  {
    id: "p3",
    title: "Lightweight Intrusion Detection for Industrial IoT Using Explainable Models",
    authors: ["V. Menon", "R. Iqbal"],
    venue: "Computers & Security",
    year: 2025,
    type: "Journal",
    doi: "10.0000/cose.2025.000123",
    domain: "cybersecurity-forensics",
  },
  {
    id: "p4",
    title: "An Energy-Harvesting Wearable Node for Continuous Physiological Sensing",
    authors: ["S. Kulkarni", "M. Joseph"],
    venue: "IEEE Sensors Journal",
    year: 2024,
    type: "Journal",
    doi: "10.0000/jsen.2024.000777",
    domain: "iot-embedded-systems",
  },
  {
    id: "p5",
    title: "Vision-Guided Manipulation for In-Line Quality Inspection",
    authors: ["R. Sharma", "K. Reddy"],
    venue: "International Conference on Robotics and Automation (ICRA)",
    year: 2025,
    type: "Conference",
    doi: "10.0000/icra.2025.000333",
    domain: "robotics-automation",
  },
  {
    id: "p6",
    title: "Techno-Economic Assessment of Campus Microgrids with Battery Storage",
    authors: ["M. Iyer", "K. Reddy"],
    venue: "Applied Energy",
    year: 2024,
    type: "Journal",
    doi: "10.0000/apen.2024.000654",
    domain: "sustainable-energy",
  },
  {
    id: "p7",
    title: "Edge-Cloud Orchestration for Latency-Critical Analytics Workloads",
    authors: ["A. Nair", "A. Rao"],
    venue: "IEEE Transactions on Cloud Computing",
    year: 2025,
    type: "Journal",
    doi: "10.0000/tcc.2025.000222",
    domain: "advanced-computing-networks",
  },
  {
    id: "p8",
    title: "A Forensic Methodology for Connected Medical Devices",
    authors: ["V. Menon", "P. Deshpande"],
    venue: "Digital Investigation",
    year: 2023,
    type: "Journal",
    doi: "10.0000/diin.2023.000099",
    domain: "cybersecurity-forensics",
  },
];

export const patents: Patent[] = [
  {
    id: "pt1",
    title: "System and Method for Explainable Anomaly Detection in Imaging Data",
    inventors: ["A. Rao", "S. Verma"],
    applicationNo: "IN-2024-XXXXX1",
    status: "Published",
    year: 2024,
    domain: "ai-data-science",
  },
  {
    id: "pt2",
    title: "Low-Power Wearable Device for Multi-Parameter Physiological Sensing",
    inventors: ["S. Kulkarni", "P. Deshpande"],
    applicationNo: "IN-2023-XXXXX2",
    status: "Granted",
    year: 2023,
    domain: "iot-embedded-systems",
  },
  {
    id: "pt3",
    title: "Modular Fixture for Robotic In-Line Inspection of Machined Parts",
    inventors: ["R. Sharma", "K. Reddy"],
    applicationNo: "IN-2025-XXXXX3",
    status: "Filed",
    year: 2025,
    domain: "robotics-automation",
  },
];

export function getPublication(id: string) {
  return publications.find((p) => p.id === id);
}

export function getPatent(id: string) {
  return patents.find((p) => p.id === id);
}

import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "proj1",
    title: "Explainable AI for Early Detection in Diagnostic Imaging",
    piSlug: "ananya-rao",
    coInvestigators: ["priya-deshpande"],
    fundingAgency: "Science and Engineering Research Board (SERB)",
    amountLakh: 68.5,
    status: "Ongoing",
    startYear: 2024,
    endYear: 2027,
    domain: "ai-data-science",
    summary:
      "Development and clinical validation of interpretable deep-learning models for early detection in radiological imaging, in collaboration with a partner hospital.",
  },
  {
    id: "proj2",
    title: "Intrusion Detection Framework for Industrial IoT Networks",
    piSlug: "vikram-menon",
    coInvestigators: [],
    fundingAgency: "Ministry of Electronics & IT (MeitY)",
    amountLakh: 42.0,
    status: "Ongoing",
    startYear: 2023,
    endYear: 2026,
    domain: "cybersecurity-forensics",
    summary:
      "A lightweight, explainable intrusion-detection framework for operational-technology and industrial IoT environments, validated on a testbed.",
  },
  {
    id: "proj3",
    title: "Low-Power Wearable Platform for Continuous Vital-Sign Monitoring",
    piSlug: "sneha-kulkarni",
    coInvestigators: ["priya-deshpande"],
    fundingAgency: "Department of Science & Technology (DST)",
    amountLakh: 31.2,
    status: "Ongoing",
    startYear: 2024,
    endYear: 2026,
    domain: "iot-embedded-systems",
    summary:
      "Design of an energy-efficient wearable platform with on-device inference for continuous monitoring of physiological signals.",
  },
  {
    id: "proj4",
    title: "Vision-Guided Robotic Inspection for Precision Manufacturing",
    piSlug: "rohit-sharma",
    coInvestigators: ["karthik-reddy"],
    fundingAgency: "Industry-Sponsored (Confidential Partner)",
    amountLakh: 55.0,
    status: "Ongoing",
    startYear: 2025,
    endYear: 2027,
    domain: "robotics-automation",
    summary:
      "An automated inspection cell combining machine vision and robotic manipulation for in-line quality assurance on a manufacturing line.",
  },
  {
    id: "proj5",
    title: "Edge-Orchestrated Analytics for Latency-Critical Applications",
    piSlug: "arjun-nair",
    coInvestigators: ["ananya-rao"],
    fundingAgency: "AICTE Research Promotion Scheme",
    amountLakh: 24.8,
    status: "Sanctioned",
    startYear: 2026,
    endYear: 2028,
    domain: "advanced-computing-networks",
    summary:
      "Frameworks for orchestrating analytics workloads across edge and cloud tiers to meet strict latency and energy budgets.",
  },
  {
    id: "proj6",
    title: "Microgrid Integration and Storage for Campus Energy Resilience",
    piSlug: "meera-iyer",
    coInvestigators: ["karthik-reddy"],
    fundingAgency: "Ministry of New & Renewable Energy (MNRE)",
    amountLakh: 47.6,
    status: "Completed",
    startYear: 2021,
    endYear: 2024,
    domain: "sustainable-energy",
    summary:
      "A demonstration microgrid integrating rooftop solar and battery storage with techno-economic assessment of campus energy resilience.",
  },
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

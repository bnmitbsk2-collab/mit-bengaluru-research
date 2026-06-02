"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/icon";
import type { ResearchDomain } from "@/lib/types";

const categories = [
  "Technical Advisory Services",
  "Faculty Expertise Engagement",
  "Sponsored Research",
  "Product & Prototype Support",
  "Testing & Validation",
  "Executive Training, FDP & Workshops",
  "Industry Problem-Statement Collaboration",
  "Facility & Lab Access",
  "PhD / Internship / Research Assistant",
  "Partnership / MoU",
  "General Enquiry",
];

const orgTypes = [
  "Industry / Enterprise",
  "Government / Funding Agency",
  "Academic / Research Institute",
  "Startup / Incubator",
  "Individual / Student",
];

const inputClass =
  "w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100";
const labelClass = "block text-sm font-medium text-ink-700";

export function EnquiryForm({ domains }: { domains: ResearchDomain[] }) {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    category: categories[0],
    name: "",
    organisation: "",
    role: "",
    email: "",
    phone: "",
    orgType: orgTypes[0],
    domain: "",
    expert: "",
    facility: "",
    timeline: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    const category = searchParams.get("category");
    const expert = searchParams.get("expert");
    const facility = searchParams.get("facility");
    setForm((f) => ({
      ...f,
      category: category && categories.includes(category) ? category : f.category,
      expert: expert ?? f.expert,
      facility: facility ?? f.facility,
    }));
  }, [searchParams]);

  const update = (field: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? ["Something went wrong. Please try again."]);
        return;
      }
      setReference(data.reference);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors(["Could not reach the server. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-accent-200 bg-accent-50 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-600 text-white">
          <Icon name="check" size={26} />
        </span>
        <h3 className="mt-4 font-serif text-xl font-semibold text-ink-900">
          Thank you — your enquiry has been recorded
        </h3>
        {reference && (
          <p className="mx-auto mt-3 inline-block rounded-md border border-accent-200 bg-white px-3 py-1.5 text-sm font-semibold text-ink-800">
            Reference: <span className="text-accent-700">{reference}</span>
          </p>
        )}
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-600">
          Your enquiry was submitted to the portal&apos;s API and logged on the
          server. In production this would be routed to the research and
          consultancy office and the relevant faculty for a scoping response.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setReference(null);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.length > 0 && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="font-semibold">Please correct the following:</p>
          <ul className="mt-1 list-disc pl-5">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="category" className={labelClass}>
          Enquiry category <span className="text-accent-600">*</span>
        </label>
        <select
          id="category"
          required
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className={`mt-1.5 ${inputClass}`}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name <span className="text-accent-600">*</span>
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Designation / role
          </label>
          <input
            id="role"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="e.g. R&D Manager"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation <span className="text-accent-600">*</span>
          </label>
          <input
            id="organisation"
            required
            value={form.organisation}
            onChange={(e) => update("organisation", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="Company / institution"
          />
        </div>
        <div>
          <label htmlFor="orgType" className={labelClass}>
            Organisation type
          </label>
          <select
            id="orgType"
            value={form.orgType}
            onChange={(e) => update("orgType", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          >
            {orgTypes.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-accent-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="you@organisation.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="+91 ..."
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="domain" className={labelClass}>
            Research area of interest
          </label>
          <select
            id="domain"
            value={form.domain}
            onChange={(e) => update("domain", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="">Select an area (optional)</option>
            {domains.map((d) => (
              <option key={d.slug} value={d.title}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="expert" className={labelClass}>
            Expert / faculty of interest
          </label>
          <input
            id="expert"
            value={form.expert}
            onChange={(e) => update("expert", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="Optional"
          />
        </div>
      </div>

      {form.category === "Facility & Lab Access" && (
        <div>
          <label htmlFor="facility" className={labelClass}>
            Facility of interest
          </label>
          <input
            id="facility"
            value={form.facility}
            onChange={(e) => update("facility", e.target.value)}
            className={`mt-1.5 ${inputClass}`}
            placeholder="Facility or laboratory name"
          />
        </div>
      )}

      <div>
        <label htmlFor="timeline" className={labelClass}>
          Indicative timeline / budget
        </label>
        <input
          id="timeline"
          value={form.timeline}
          onChange={(e) => update("timeline", e.target.value)}
          className={`mt-1.5 ${inputClass}`}
          placeholder="e.g. 6 months; budget range (optional)"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Problem statement / message <span className="text-accent-600">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`mt-1.5 ${inputClass} resize-y`}
          placeholder="Describe your objectives, problem statement, and what you would like from the collaboration."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-ink-300 text-accent-600 focus:ring-accent-400"
        />
        <label htmlFor="consent" className="text-sm text-ink-600">
          I consent to MIT Bengaluru&apos;s research and consultancy office
          contacting me regarding this enquiry.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-md bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit enquiry"}
        <Icon name="arrow" size={16} />
      </button>
    </form>
  );
}

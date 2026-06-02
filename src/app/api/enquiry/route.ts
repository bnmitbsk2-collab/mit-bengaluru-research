import { NextResponse } from "next/server";
import { useCms, portalConfig } from "@/lib/config";
import { cms } from "@/lib/content";

export interface EnquiryPayload {
  category: string;
  name: string;
  role?: string;
  organisation: string;
  orgType?: string;
  email: string;
  phone?: string;
  domain?: string;
  expert?: string;
  facility?: string;
  timeline?: string;
  message: string;
  consent: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<EnquiryPayload>): string[] {
  const errors: string[] = [];
  if (!body.category) errors.push("Category is required.");
  if (!body.name || body.name.trim().length < 2)
    errors.push("A valid name is required.");
  if (!body.organisation) errors.push("Organisation is required.");
  if (!body.email || !EMAIL_RE.test(body.email))
    errors.push("A valid email address is required.");
  if (!body.message || body.message.trim().length < 10)
    errors.push("Please provide a message of at least 10 characters.");
  if (!body.consent) errors.push("Consent is required to process the enquiry.");
  return errors;
}

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request body."] }, { status: 400 });
  }

  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const reference = `ENQ-${Date.now().toString(36).toUpperCase()}`;

  if (useCms) {
    try {
      const { referenceNo } = await cms.createConsultancyEnquiry({
        referenceNo: reference,
        category: body.category!,
        name: body.name!,
        role: body.role,
        organisation: body.organisation!,
        orgType: body.orgType,
        email: body.email!,
        phone: body.phone,
        domain: body.domain,
        expert: body.expert,
        facility: body.facility,
        timeline: body.timeline,
        message: body.message!,
        consent: body.consent!,
        enquiryStatus: "new",
      });
      console.log("Enquiry saved to CMS:", referenceNo, "→ notify:", portalConfig.enquiry.notifyEmail);
      return NextResponse.json({ ok: true, reference: referenceNo });
    } catch (err) {
      console.error("CMS enquiry save failed:", err);
      return NextResponse.json(
        { ok: false, errors: ["Could not save enquiry. Please try again or email the research office directly."] },
        { status: 500 },
      );
    }
  }

  // Demo fallback: local file log
  const record = { reference, receivedAt: new Date().toISOString(), ...body };
  console.log("New enquiry received (demo):", record);
  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, "enquiries.json");
    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      existing = [];
    }
    existing.push(record);
    await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
  } catch {
    /* read-only filesystem */
  }

  return NextResponse.json({ ok: true, reference });
}

# 3. Admin Module List (Payload CMS)

Detailed admin modules for the Research & Consultancy portal. Each module maps to a **Payload collection** (or global) with defined screens, fields, permissions, and workflow states.

**Admin URL (production):** `https://cms.mit-bengaluru.example.com/admin`

---

## 3.1 Module overview

| # | Module | Collection | Primary roles | Workflow |
|---|--------|------------|---------------|----------|
| A1 | Dashboard | — | All admins | — |
| A2 | User & role management | `users`, `roles` | Super Admin | — |
| A3 | Organisation | `departments`, `schools` | Super Admin, Research Office | Publish |
| A4 | Researchers | `researchers` | Faculty, Coordinator, Reviewer, Research Office | Draft→Review→Publish |
| A5 | Research areas | `research_areas` | Research Office | Publish |
| A6 | Labs & facilities | `labs`, `facilities` | Coordinator, Research Office | Draft→Review→Publish |
| A7 | Projects & grants | `projects`, `grants`, `funding_agencies` | Faculty, Research Office | Draft→Review→Publish |
| A8 | Publications & IP | `publications`, `patents` | Faculty, Reviewer, Research Office | Draft→Review→Publish |
| A9 | Consultancy | `consultancy_services` | Research Office | Draft→Review→Publish |
| A10 | Enquiries (CRM) | `consultancy_enquiries`, `contact_enquiries` | Research Office, Coordinator | New→Routed→Closed |
| A11 | Collaborations | `collaborations` | Research Office | Draft→Review→Publish |
| A12 | News & events | `news_events` | Coordinator, Research Office | Draft→Review→Publish |
| A13 | Documents | `documents` | Research Office | Publish |
| A14 | Site settings | `globals.site_settings` | Super Admin, Research Office | Publish |
| A15 | Audit & reports | `audit_log` (read-only) | Super Admin, Research Office | — |

---

## 3.2 A1 — Dashboard

**Purpose:** Single landing screen for admins after SSO login.

**Widgets:**
- Pending review queue (count + list)
- New enquiries (last 7 days)
- Recently published content
- Faculty profiles awaiting approval
- Quick actions: Add news, View enquiries, Approve queue

**Roles:** All authenticated admin roles (scoped to their permissions)

---

## 3.3 A2 — User & role management

**Screens:**
- User list (filter by role, department, active)
- User create/edit (name, email, role, department, SSO link)
- Role list (read-only definitions except Super Admin)

**Permissions:**

| Action | Super Admin | Research Office | Others |
|--------|-------------|-----------------|--------|
| Create user | ✅ | ✅ (non-admin roles) | — |
| Assign Super Admin | ✅ | — | — |
| Deactivate user | ✅ | ✅ | — |
| Reset local password | ✅ | — | — |

**Fields — `users`:**
`id`, `name`, `email`, `role_id`, `department_id`, `sso_subject`, `is_active`, `last_login`, `created_at`

**Fields — `roles`:**
`id`, `name`, `slug`, `permissions_json`, `description`

---

## 3.4 A3 — Organisation

**Screens:**
- Department list + edit
- School/unit list (optional org tier)

**Fields — `departments`:**
`id`, `name`, `slug`, `school_unit_id`, `description`, `head_user_id`, `contact_email`, `status`, `sort_order`

**Fields — `schools_units`:**
`id`, `name`, `slug`, `description`

**Who edits:** Super Admin, Research Office  
**Who publishes:** Research Office

---

## 3.5 A4 — Researchers (highest-traffic admin module)

**Screens:**
- Researcher directory (filter: department, area, status, has pending changes)
- Researcher editor (tabbed):
  - **Profile:** photo, name, designation, department, email, scholar URL, bio
  - **Expertise:** research interests, keywords, research areas (multi-select)
  - **Output links:** publications, patents, projects (linked records)
  - **Consultancy:** consultancy areas, collaboration interests
  - **Workflow:** status, reviewer comments, publish schedule

**Workflow:**

```
Faculty creates/edits → status: draft
Faculty submits → status: in_review (assigned to Dept Coordinator)
Coordinator reviews → approve → status: approved OR reject → draft + comment
Research Office / Coordinator → publish → status: published
Archive → status: archived (profile hidden from public)
```

**Field-level permissions:**

| Field | Faculty | Coordinator | Research Office |
|-------|---------|-------------|-----------------|
| bio, interests, keywords | edit | edit | edit |
| designation, department | read | edit | edit |
| status / publish | read | approve | publish |
| email (official) | read | read | edit |

**Fields — `researchers`:** see [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md)

---

## 3.6 A5 — Research areas

**Screens:**
- Area list (ordered)
- Area editor: title, slug, summary, description (rich text blocks), highlights, applications, icon, related labs count

**Who creates/edits:** Research Office only  
**Workflow:** Direct publish (no faculty submission)

---

## 3.7 A6 — Labs & facilities

**Screens:**
- Lab/centre list (filter: type, department, area)
- Lab editor: name, type, department, lead researcher, summary, description, capabilities, equipment, services, booking notes
- Facility sub-records (equipment items) if granular booking needed later

**Workflow:** Coordinator drafts → Research Office reviews → publish

**Public output:** `/facilities/[slug]` pages

---

## 3.8 A7 — Projects & grants

**Screens:**
- Project list (filter: status, agency, area, PI, year)
- Project editor: title, summary, PI, co-investigators, grant link, funding agency, amount, dates, area, status
- Grant editor: title, agency, sanction number, amount, dates
- Funding agency master list

**Workflow:**
- Faculty/Research Office creates draft
- Research Office verifies funding figures and agency → publish
- **Sensitive:** industry-sponsored confidential amounts → flag `visibility: internal_summary_only`

---

## 3.9 A8 — Publications & patents

**Screens:**
- Publication list (filter: year, type, area, author)
- Publication editor: title, authors, venue, year, type, DOI, linked researchers, research areas
- Patent editor: title, inventors, application no, status, year, linked researchers
- **Phase 2:** "Import from DOI" button → pre-fill metadata → reviewer confirms

**Workflow:** Faculty submits → Reviewer checks duplicates/metadata → publish

**Reviewer tools (Phase 2):** duplicate detection panel showing similar existing records

---

## 3.10 A9 — Consultancy services

**Screens:**
- Service list (8+ categories)
- Service editor: title, icon, description, deliverables, owning department, default enquiry owner

**Who edits:** Research Office  
**Workflow:** Draft → Research Office approve → publish

**Links to:** enquiry routing rules (category → department → default owner)

---

## 3.11 A10 — Enquiries (CRM module)

**Screens:**
- **Inbox:** all enquiries (filter: status, category, department, date, priority)
- **Detail view:** full submission, routing history, internal notes, assigned owner, status timeline
- **Routing panel:** assign to faculty/dept, set priority, add internal note
- **Reports:** count by category, avg response time (Phase 2)

**Statuses:** `new` → `routed` → `in_discussion` → `closed` (with optional `spam`)

**Auto-routing rules (Phase 2 AI-assisted):**
- Category + keywords → suggested department + owner (human confirms)

**Fields — `consultancy_enquiries`:** see DATABASE-SCHEMA

**Public source:** `/contact` form → `POST /api/enquiry` → creates CMS record

---

## 3.12 A11 — Collaborations / MoUs

**Screens:**
- Partner list (filter: type, active)
- Collaboration editor:
  - **Public:** partner name, type, summary, start date, logo
  - **Internal (restricted):** full MoU terms, contact person, renewal date, legal notes

**Workflow:** Research Office drafts → Super Admin / legal review → publish public summary only

---

## 3.13 A12 — News & events

**Screens:**
- Content list (filter: type, status, date)
- Editor: type (News/Event/Announcement), title, summary, body, event date, expiry, featured flag

**Workflow:** Coordinator drafts → Reviewer approves → publish (optional scheduled)

**Auto-archive:** events past `event_date + 30 days` → archived

---

## 3.14 A13 — Documents

**Screens:**
- Document library (brochures, reports, policies)
- Upload: file, title, type, visibility (public/internal), related entity

**Replaces:** `scripts/generate-brochures.mjs` in production (PDFs managed in CMS)

---

## 3.15 A14 — Site settings (global)

**Fields:**
- Institution name, contact email, phone, address
- Homepage metrics (researchers count, funding total, etc.) — **Research Office authoritative**
- Social/SEO defaults
- Maintenance mode flag
- Demo mode flag (off in production)

---

## 3.16 A15 — Audit & reports

**Read-only screens:**
- Audit log search (actor, entity, action, date range)
- Export CSV for compliance

**Logged events:** create, update, status change, publish, archive, login, enquiry assignment

---

## 3.17 Admin navigation structure

```
Dashboard
├── Content
│   ├── Researchers
│   ├── Research Areas
│   ├── Labs & Facilities
│   ├── Projects & Grants
│   ├── Publications & Patents
│   ├── Consultancy Services
│   ├── Collaborations
│   ├── News & Events
│   └── Documents
├── Enquiries
│   ├── Consultancy Enquiries
│   └── Contact Enquiries
├── Organisation
│   ├── Departments
│   └── Schools / Units
├── Administration
│   ├── Users
│   ├── Site Settings
│   └── Audit Log
└── (Phase 2) Analytics
    ├── Enquiry trends
    └── Content health
```

---

## 3.18 Notification rules

| Event | Notify |
|-------|--------|
| Faculty submits profile for review | Dept Coordinator + email |
| Enquiry submitted | Research Office + assigned dept |
| Content approved | Author (faculty) |
| Content rejected | Author + reviewer comment |
| Enquiry assigned | Assigned faculty owner |
| Scheduled news publish | — (silent) |

Delivery: email + optional Microsoft Teams webhook for Research Office channel.

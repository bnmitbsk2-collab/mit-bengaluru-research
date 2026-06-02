# 4. Database / Content Schema

PostgreSQL schema for production. Payload CMS collections map 1:1 to these tables. Demo mode uses TypeScript interfaces in `src/lib/types.ts` (subset).

**Conventions:**
- All content tables: `id` (UUID), `created_at`, `updated_at`, `created_by`, `updated_by`
- Content lifecycle: `status` ENUM (`draft`, `in_review`, `approved`, `published`, `archived`)
- Slugs: unique, URL-safe
- Soft delete: prefer `archived` status over hard delete

---

## 4.1 Entity relationship diagram (summary)

```
schools_units ──< departments ──< researchers
                      │              │
                      │              ├──< researcher_areas >── research_areas
                      │              ├──< publication_researchers >── publications
                      │              ├──< project_researchers >── projects
                      │              └──< patent_researchers >── patents
                      │
                      ├──< labs ──< facilities
                      └──< consultancy_services

projects ──> grants ──> funding_agencies
projects ──> research_areas

consultancy_enquiries ──> consultancy_services
consultancy_enquiries ──> departments
consultancy_enquiries ──> users (routed_owner)

collaborations (standalone)
news_events (standalone)
documents (polymorphic related_entity)
contact_enquiries (standalone)
audit_log (polymorphic)
users ──> roles
```

---

## 4.2 Table definitions

### `roles`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(100) | e.g. "Research Office Admin" |
| slug | VARCHAR(50) UNIQUE | e.g. `research_office_admin` |
| permissions_json | JSONB | Collection-level ACL |
| description | TEXT | |
| created_at | TIMESTAMPTZ | |

### `users`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(200) | |
| email | VARCHAR(255) UNIQUE | |
| role_id | UUID FK → roles | |
| department_id | UUID FK → departments NULL | |
| sso_subject | VARCHAR(255) NULL | Entra/Google ID |
| password_hash | VARCHAR NULL | Fallback only |
| is_active | BOOLEAN DEFAULT true | |
| last_login | TIMESTAMPTZ NULL | |
| created_at | TIMESTAMPTZ | |

### `schools_units`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(200) | |
| slug | VARCHAR(100) UNIQUE | |
| description | TEXT NULL | |
| status | lifecycle ENUM | |

### `departments`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(200) | |
| slug | VARCHAR(100) UNIQUE | |
| school_unit_id | UUID FK NULL | |
| description | TEXT NULL | |
| head_user_id | UUID FK → users NULL | |
| contact_email | VARCHAR(255) NULL | |
| sort_order | INT DEFAULT 0 | |
| status | lifecycle ENUM | |

### `research_areas`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| title | VARCHAR(200) | |
| slug | VARCHAR(100) UNIQUE | |
| short | VARCHAR(500) | Card summary |
| summary | TEXT | |
| description | JSONB | Array of paragraphs |
| highlights | JSONB | String array |
| applications | JSONB | String array |
| icon | VARCHAR(50) | Icon key |
| sort_order | INT | |
| status | lifecycle ENUM | |
| search_vector | TSVECTOR | Generated for FTS |

### `researchers`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| user_id | UUID FK → users NULL | Links to login |
| slug | VARCHAR(100) UNIQUE | |
| name | VARCHAR(200) | |
| photo_url | VARCHAR(500) NULL | S3 URL |
| designation | VARCHAR(200) | Official title |
| department_id | UUID FK → departments | |
| bio | TEXT | |
| research_interests | JSONB | String array |
| expertise_keywords | JSONB | String array |
| consultancy_areas | JSONB | String array |
| collaboration_interests | JSONB | String array |
| email | VARCHAR(255) | Public contact |
| scholar_url | VARCHAR(500) NULL | |
| owner_id | UUID FK → users | Content owner |
| status | lifecycle ENUM | |
| published_at | TIMESTAMPTZ NULL | |
| search_vector | TSVECTOR | |

### `researcher_areas` (M:N)
| Field | Type |
|-------|------|
| researcher_id | UUID FK |
| research_area_id | UUID FK |
| PRIMARY KEY (researcher_id, research_area_id) | |

### `labs`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| slug | VARCHAR(100) UNIQUE | |
| name | VARCHAR(300) | |
| type | ENUM | Centre, Laboratory, Facility |
| department_id | UUID FK | |
| lead_researcher_id | UUID FK → researchers NULL | |
| research_area_id | UUID FK → research_areas | |
| short | VARCHAR(500) | |
| summary | TEXT | |
| description | JSONB | |
| capabilities | JSONB | |
| equipment | JSONB | |
| services | JSONB | |
| status | lifecycle ENUM | |
| search_vector | TSVECTOR | |

### `facilities`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| lab_id | UUID FK → labs NULL | Optional parent |
| name | VARCHAR(300) | |
| equipment | JSONB | |
| capabilities | JSONB | |
| services | JSONB | |
| booking_info | TEXT NULL | Phase 2 |
| status | lifecycle ENUM | |

### `funding_agencies`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(300) | |
| type | ENUM | Govt, Industry, International, Other |
| website | VARCHAR(500) NULL | |

### `grants`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| title | VARCHAR(500) | |
| funding_agency_id | UUID FK | |
| sanction_number | VARCHAR(100) NULL | |
| amount_inr | DECIMAL(14,2) | |
| start_date | DATE | |
| end_date | DATE NULL | |
| status | ENUM | Active, Completed, Sanctioned |
| internal_notes | TEXT NULL | Restricted |

### `projects`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| slug | VARCHAR(150) UNIQUE NULL | |
| title | VARCHAR(500) | |
| summary | TEXT | |
| grant_id | UUID FK → grants NULL | |
| funding_agency_id | UUID FK NULL | Denormalised for display |
| research_area_id | UUID FK | |
| amount_lakh | DECIMAL(10,2) NULL | |
| project_status | ENUM | Ongoing, Completed, Sanctioned |
| start_year | INT | |
| end_year | INT | |
| visibility | ENUM | public, internal_summary_only |
| owner_id | UUID FK → users | |
| status | lifecycle ENUM | |
| search_vector | TSVECTOR | |

### `project_researchers` (M:N)
| Field | Type | Notes |
|-------|------|-------|
| project_id | UUID FK | |
| researcher_id | UUID FK | |
| role | ENUM | PI, Co-PI, Member |

### `publications`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| title | VARCHAR(1000) | |
| authors | JSONB | Ordered string array |
| venue | VARCHAR(500) | |
| year | INT | |
| type | ENUM | Journal, Conference, Book Chapter |
| doi | VARCHAR(200) NULL UNIQUE | |
| research_area_id | UUID FK NULL | Primary area |
| abstract | TEXT NULL | |
| public_summary | TEXT NULL | AI-assisted, approved |
| owner_id | UUID FK | |
| status | lifecycle ENUM | |
| search_vector | TSVECTOR | |

### `publication_researchers` (M:N)
| publication_id, researcher_id | |

### `publication_areas` (M:N)
| publication_id, research_area_id | |

### `patents`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| title | VARCHAR(500) | |
| application_number | VARCHAR(100) | |
| patent_status | ENUM | Filed, Published, Granted |
| year | INT | |
| research_area_id | UUID FK NULL | |
| owner_id | UUID FK | |
| status | lifecycle ENUM | |

### `patent_researchers` (M:N)
| patent_id, researcher_id | |

### `consultancy_services`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| slug | VARCHAR(100) UNIQUE | |
| title | VARCHAR(200) | |
| icon | VARCHAR(50) | |
| description | TEXT | |
| deliverables | JSONB | |
| department_id | UUID FK | |
| default_owner_id | UUID FK → users NULL | |
| sort_order | INT | |
| status | lifecycle ENUM | |

### `consultancy_enquiries`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| reference_no | VARCHAR(20) UNIQUE | ENQ-XXXX |
| category | VARCHAR(100) | Form category |
| name | VARCHAR(200) | |
| role | VARCHAR(200) NULL | |
| organisation | VARCHAR(300) | |
| org_type | VARCHAR(100) NULL | |
| email | VARCHAR(255) | |
| phone | VARCHAR(50) NULL | |
| research_area_id | UUID FK NULL | |
| service_id | UUID FK NULL | |
| department_id | UUID FK NULL | |
| routed_owner_id | UUID FK → users NULL | |
| expert_requested | VARCHAR(200) NULL | |
| facility_requested | VARCHAR(300) NULL | |
| timeline | VARCHAR(300) NULL | |
| message | TEXT | |
| consent | BOOLEAN | |
| enquiry_status | ENUM | new, routed, in_discussion, closed, spam |
| priority | ENUM | low, normal, high |
| internal_notes | TEXT NULL | Admin only |
| ai_suggested_route | JSONB NULL | Phase 2 |
| created_at | TIMESTAMPTZ | |
| closed_at | TIMESTAMPTZ NULL | |

### `collaborations`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| partner_name | VARCHAR(300) | |
| collaboration_type | ENUM | MoU, Joint Research, Startup, Other |
| public_summary | TEXT | |
| internal_terms | TEXT NULL | Admin only |
| start_date | DATE | |
| end_date | DATE NULL | |
| logo_url | VARCHAR(500) NULL | |
| status | lifecycle ENUM | |

### `news_events`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| slug | VARCHAR(150) UNIQUE | |
| content_type | ENUM | News, Event, Announcement |
| title | VARCHAR(500) | |
| summary | TEXT | |
| body | TEXT NULL | Rich text |
| event_date | DATE NULL | |
| expiry_date | DATE NULL | |
| featured | BOOLEAN DEFAULT false | |
| publish_at | TIMESTAMPTZ NULL | Scheduled |
| status | lifecycle ENUM | |

### `documents`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| title | VARCHAR(300) | |
| file_url | VARCHAR(500) | S3 |
| file_type | ENUM | Brochure, Report, Policy, Other |
| mime_type | VARCHAR(100) | |
| file_size_bytes | INT | |
| visibility | ENUM | public, internal |
| related_entity_type | VARCHAR(50) NULL | e.g. "research_area" |
| related_entity_id | UUID NULL | |
| status | lifecycle ENUM | |

### `contact_enquiries`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| name | VARCHAR(200) | |
| email | VARCHAR(255) | |
| subject | VARCHAR(300) | |
| message | TEXT | |
| enquiry_status | ENUM | new, responded, closed |
| created_at | TIMESTAMPTZ | |

### `testimonials_achievements`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| title | VARCHAR(300) | |
| body | TEXT | |
| researcher_id | UUID FK NULL | |
| achievement_date | DATE NULL | |
| status | lifecycle ENUM | |

### `audit_log`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID PK | |
| actor_id | UUID FK → users | |
| entity_type | VARCHAR(50) | |
| entity_id | UUID | |
| action | VARCHAR(50) | create, update, publish, archive, assign |
| from_status | VARCHAR(30) NULL | |
| to_status | VARCHAR(30) NULL | |
| comment | TEXT NULL | |
| metadata_json | JSONB NULL | |
| created_at | TIMESTAMPTZ | |

### `site_settings` (singleton global)
| Field | Type | Notes |
|-------|------|-------|
| id | INT PK DEFAULT 1 | Single row |
| institution_name | VARCHAR(300) | |
| contact_email | VARCHAR(255) | |
| contact_phone | VARCHAR(50) | |
| address | TEXT | |
| metrics_json | JSONB | Homepage stats |
| seo_defaults_json | JSONB | |
| maintenance_mode | BOOLEAN | |

---

## 4.3 Search indexes

```sql
-- Example: researcher full-text
ALTER TABLE researchers ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(name,'') || ' ' ||
      coalesce(bio,'') || ' ' ||
      coalesce(research_interests::text,'') || ' ' ||
      coalesce(expertise_keywords::text,'')
    )
  ) STORED;
CREATE INDEX idx_researchers_search ON researchers USING GIN(search_vector);
```

Repeat for: `research_areas`, `labs`, `projects`, `publications`, `consultancy_services`.

**Phase 2:** sync published records to Typesense + pgvector embedding column on `researchers`, `publications`, `labs`.

---

## 4.4 Demo → production mapping

| Demo (`src/data/*`) | Production table |
|---------------------|------------------|
| `domains.ts` | `research_areas` |
| `researchers.ts` | `researchers` + `researcher_areas` |
| `facilities.ts` | `labs` |
| `projects.ts` | `projects` + `grants` |
| `publications.ts` | `publications` + `patents` |
| `site.ts` (services) | `consultancy_services` |
| `site.ts` (news) | `news_events` |
| `site.ts` (metrics) | `site_settings.metrics_json` |
| `/api/enquiry` log | `consultancy_enquiries` |

Migration script (Phase 1): `scripts/migrate-demo-to-cms.ts` — reads demo JSON shape, POSTs to Payload API.

---

## 4.5 Data volume estimates (Year 1)

| Entity | Expected count |
|--------|----------------|
| Researchers | 150–250 |
| Research areas | 10–15 |
| Labs/centres | 20–30 |
| Projects | 100–200 |
| Publications | 500–2000 |
| Patents | 40–60 |
| Enquiries/year | 200–500 |
| News/events/year | 30–50 |

PostgreSQL handles this easily. Plan indexing at 500+ publications.

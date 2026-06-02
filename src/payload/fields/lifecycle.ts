import type { CollectionConfig } from "payload";

export const lifecycleStatuses = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "in_review" },
  { label: "Approved", value: "approved" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
] as const;

export const statusField = {
  name: "status",
  type: "select" as const,
  defaultValue: "draft",
  options: [...lifecycleStatuses],
  required: true,
  admin: { position: "sidebar" as const },
};

export const slugField = (fieldName = "slug") => ({
  name: fieldName,
  type: "text" as const,
  required: true,
  unique: true,
  admin: { position: "sidebar" as const },
});

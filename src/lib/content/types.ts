export type ContentSource = "static-demo" | "cms-api";

export type ContentLifecycle =
  | "draft"
  | "in_review"
  | "approved"
  | "published"
  | "archived";

export type EnquiryStatus =
  | "new"
  | "routed"
  | "in_discussion"
  | "closed";

/** Site Content: every public page's copy is a typed JSON document, edited in the admin CMS. */

export type ContentGroup =
  | "Site settings"
  | "Home"
  | "Solutions"
  | "Services"
  | "Industries"
  | "Company"
  | "Legal";

export type FieldKind = "text" | "textarea" | "url" | "color" | "select" | "image";

/** Editor hints, keyed by a field path where array indices are written as `*` (e.g. `features.items.*.icon`). */
export interface FieldHint {
  label?: string;
  help?: string;
  kind?: FieldKind;
  options?: readonly string[];
  /** Not shown in the editor; the stored value is always the default. */
  hidden?: boolean;
  /** Arrays only: items can be edited and reordered but not added or removed. */
  fixedLength?: boolean;
}

export interface ContentDefinition<T = unknown> {
  key: string;
  label: string;
  group: ContentGroup;
  description?: string;
  /** Public URL this document renders on; "*" means it appears on every page. */
  path?: string;
  defaults: T;
  hints?: Record<string, FieldHint>;
  /** Blank item shapes for arrays whose default is empty, keyed like hints. */
  templates?: Record<string, unknown>;
}

/** Serializable subset of a definition sent to the admin editor. */
export type ContentSchema = Omit<ContentDefinition, "defaults">;

export interface StoredContent {
  data: unknown;
  updated_at: string;
  updated_by: string;
}

export interface ContentSummary {
  key: string;
  label: string;
  group: ContentGroup;
  description?: string;
  path?: string;
  customized: boolean;
  updated_at?: string;
  updated_by?: string;
}

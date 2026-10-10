export interface GenericFormRequest {
  email: string;
  form: string;
  message: string;
  name: string;
  turnstileToken: string;
}

export interface APIResponse {
  error?: unknown;
  message?: string;
  result?: unknown;
  success: boolean;
}

export interface TurnstileResponse {
  challenge_ts: string;
  "error-codes": string[];
  hostname: string;
  success: boolean;
}

export type CalendarName = "sc2" | "frc";

/** `start` and `end` are ISO 8601 instants. */
export interface CalendarEvent {
  uid: string;
  /** Set only when an agenda merges several feeds. */
  calendar?: CalendarName;
  allDay: boolean;
  description: string;
  end: string;
  location: string;
  start: string;
  title: string;
}

export interface CalendarResponse {
  events?: CalendarEvent[];
  message?: string;
  missing?: CalendarName[];
}

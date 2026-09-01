export interface GenericFormRequest {
  email?: string;
  form: string;
  message?: string;
  name?: string;
  turnstileToken: string;
}

export interface APIResponse {
  error?: unknown;
  message?: string;
  /** Echoed back to the caller as JSON; the shape is the endpoint's business, not this type's. */
  result?: unknown;
  success: boolean;
}

export interface TurnstileVerificationResponse {
  response?: TurnstileResponse;
  valid: boolean;
}

export interface TurnstileResponse {
  challenge_ts: string;
  "error-codes": string[];
  hostname: string;
  success: boolean;
}

/**
 * One occurrence on a public calendar, as `/api/calendar/[name]` returns it. `start` and `end`
 * are ISO 8601 instants; the page formats them in the visitor's own locale and zone.
 */
export interface CalendarEvent {
  allDay: boolean;
  description: string;
  end: string;
  location: string;
  start: string;
  title: string;
}

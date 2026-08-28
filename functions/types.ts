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
  "error-codes": Array<string>;
  hostname: string;
  success: boolean;
}

export interface GenericFormRequest {
  form: string;
  turnstileToken: string;
  name?: string;
  email?: string;
  message?: string;
}

export interface APIResponse {
  success: boolean;
  // TODO: Fix this any type
  result?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: unknown;
  message?: string;
}

export interface TurnstileVerificationResponse {
  valid: boolean;
  response?: TurnstileResponse;
}

export interface TurnstileResponse {
  success: boolean;
  "error-codes": string[];
  hostname: string;
  challenge_ts: string;
}

export interface GenericFormRequest {
  form: string;
  turnstileToken: string;
  name?: string;
  email?: string;
  message?: string;
}

export interface APIResponse {
  success: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: "TODO: Fix this"
  result?: any;
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

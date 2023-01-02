export interface Shortlink {
  code?: string;
  url?: string;
  date?: Date;
}

export interface GenericFormRequest {
  formName: string;
  "cf-turnstile-response": string;
  name?: string;
  email?: string;
  message?: string;
}

export interface APIResponse {
  success: boolean;
  result?: any;
  error?: Error;
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

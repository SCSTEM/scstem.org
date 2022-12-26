export interface Shortlink {
  code?: string;
  url?: string;
  date?: Date;
}

export interface APIResponse {
  success: boolean;
  result?: any;
  error?: Error;
  message?: string;
}

export interface TurnstileResponse {
  success: boolean;
  // Note, Turnstile returns other values, but we don't need to care about them here
}

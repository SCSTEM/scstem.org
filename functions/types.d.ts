export interface Shortlink {
  code?: string;
  url?: URL;
  date?: Date;
}

export interface APIResponse {
  success: boolean;
  result?: any;
  error?: Error;
  message?: string;
}

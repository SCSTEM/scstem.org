import type {
  APIResponse,
  CalendarResponse,
  TurnstileResponse,
  TurnstileVerificationResponse,
} from "@/types";

/**
 * A JSON response from any endpoint. `headers` are added to the content type. A failed
 * `APIResponse` that carries an error also logs it, so it reaches the Functions log.
 */
export const res = (
  body: APIResponse | CalendarResponse,
  status: number,
  headers: Record<string, string> = {},
): Response => {
  if ("success" in body && !body.success && body.error) {
    console.error(body.error);
  }

  return new Response(JSON.stringify(body), {
    headers: { ...headers, "Content-Type": "application/json" },
    status,
  });
};

export const validateTurnstile = async (
  secretKey: string,
  response: string,
  ip: string | null,
): Promise<TurnstileVerificationResponse> => {
  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", response);
  // Turnstile treats remoteip as optional; sending a stringified null fails verification.
  if (ip !== null) {
    formData.append("remoteip", ip);
  }

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, { body: formData, method: "POST" });
  const outcome = await result.json<TurnstileResponse>();

  return { response: outcome, valid: outcome.success };
};

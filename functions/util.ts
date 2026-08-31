import type { APIResponse, TurnstileResponse, TurnstileVerificationResponse } from "@/types";

export const res = (apiResponse: APIResponse, status: number): Response => {
  if (!apiResponse.success && apiResponse.error) {
    console.error(apiResponse.error);
  }

  return new Response(JSON.stringify(apiResponse), {
    headers: {
      "Content-Type": "application/json",
    },
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

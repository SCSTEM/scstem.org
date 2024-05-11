import type {
  APIResponse,
  TurnstileResponse,
  TurnstileVerificationResponse,
} from "@/functions/types";

/**
 * Helper function to generate response message to return to the client. Helps standardize
 * communication and error logging between API and web frontend.
 * @param apiResponse A standardized response object, shared between the API and web frontend
 * @param status HTTP status code
 * @returns A standard HTTP Response object
 */
export const res = (apiResponse: APIResponse, status: number): Response => {
  if (!apiResponse.success && apiResponse.error)
    console.error(apiResponse.error);

  return new Response(JSON.stringify(apiResponse), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Helper function to verify CF Turnstile challenges
 * @param secretKey Turnstile secret key (generated from the Cloudflare Dashboard)
 * @param response Response provided by the Turnstile client
 * @param ip IP Provided by the Turnstile client
 * @returns A boolean indicating whether or not the turnstile verification passed
 */
export const validateTurnstile = async (
  secretKey: string,
  response: string,
  ip: string,
): Promise<TurnstileVerificationResponse> => {
  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", response);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, { body: formData, method: "POST" });
  const outcome = await result.json<TurnstileResponse>();

  return Promise.resolve({ valid: outcome.success, response: outcome });
};

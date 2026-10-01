import type { GenericFormRequest } from "@/types";

import { res, validateTurnstile } from "@/util";

/** A posted field before it is checked; only a non-blank string passes `isFilled`. */
type PostedValue = boolean | number | string | null | undefined;

/** The body as posted: the browser's `required` attributes are a courtesy, not a guarantee. */
interface PostedForm {
  readonly email?: PostedValue;
  readonly form?: PostedValue;
  readonly message?: PostedValue;
  readonly name?: PostedValue;
  readonly turnstileToken?: PostedValue;
}

const isFilled = (value: PostedValue): value is string =>
  typeof value === "string" && value.trim() !== "";

/**
 * Both secrets are required: without `TS_SECRET_KEY` the challenge cannot be verified, and
 * without `SLACK_FORM_POST_GENERIC` a submission has nowhere to go. Either missing is an error
 * answer, never a "received" one. Local development sets them in `.dev.vars` (`docs/tooling.md`).
 */
export const onRequestPost: PagesFunction<{
  SLACK_FORM_POST_GENERIC?: string;
  TS_SECRET_KEY?: string;
}> = async ({ env, request }) => {
  if (!env.TS_SECRET_KEY || !env.SLACK_FORM_POST_GENERIC) {
    return res(
      {
        error: "Form secrets are not configured",
        message: "The form is not accepting submissions right now",
        success: false,
      },
      500,
    );
  }

  let body: PostedForm | null;
  try {
    body = await request.json<PostedForm | null>();
  } catch {
    return res({ message: "Request body is not valid JSON", success: false }, 400);
  }

  const { email, form, message, name, turnstileToken } = body ?? {};
  if (
    !isFilled(email) ||
    !isFilled(form) ||
    !isFilled(message) ||
    !isFilled(name) ||
    !isFilled(turnstileToken)
  ) {
    return res({ message: "Every field is required", success: false }, 400);
  }
  const data: GenericFormRequest = { email, form, message, name, turnstileToken };

  try {
    const challenge = await validateTurnstile(
      env.TS_SECRET_KEY,
      turnstileToken,
      request.headers.get("CF-Connecting-IP"),
    );

    if (!challenge.success) {
      return res(
        {
          message: "Challenge verification failed",
          result: challenge,
          success: false,
        },
        418,
      );
    }

    const posted = await fetch(env.SLACK_FORM_POST_GENERIC, {
      body: JSON.stringify({ email, form, message, name }),
      method: "POST",
    });

    if (!posted.ok) {
      return res(
        {
          error: `Slack webhook returned ${String(posted.status)}`,
          message: "Error handling submission",
          success: false,
        },
        502,
      );
    }

    return res({ message: "Submission received", result: data, success: true }, 200);
  } catch (error) {
    return res(
      {
        error,
        message: "Error handling submission",
        success: false,
      },
      500,
    );
  }
};

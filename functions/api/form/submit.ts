import type { GenericFormRequest } from "@/types";

import { res, validateTurnstile } from "@/util";

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

  let data: GenericFormRequest;
  try {
    data = await request.json<GenericFormRequest>();
  } catch {
    return res({ message: "Request body is not valid JSON", success: false }, 400);
  }

  try {
    const ts = await validateTurnstile(
      env.TS_SECRET_KEY,
      data.turnstileToken,
      request.headers.get("CF-Connecting-IP"),
    );

    if (!ts.valid) {
      return res(
        {
          message: "Challenge verification failed",
          result: ts.response,
          success: false,
        },
        418,
      );
    }

    const posted = await fetch(env.SLACK_FORM_POST_GENERIC, {
      body: JSON.stringify({
        email: data.email ?? "",
        form: data.form,
        message: data.message ?? "",
        name: data.name ?? "",
      }),
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

import type { GenericFormRequest } from "@/types";
import { res, validateTurnstile } from "@/util";

export const onRequestPost: PagesFunction<{
  TS_SECRET_KEY: string;
  SLACK_FORM_POST_GENERIC: string;
}> = async ({ request, env }) => {
  const data = await request.json<GenericFormRequest>();

  let key = env.TS_SECRET_KEY;
  if (!key) key = "1x0000000000000000000000000000000AA";

  try {
    const ts = await validateTurnstile(
      key,
      data.turnstileToken,
      request.headers.get("CF-Connecting-IP"),
    );

    if (!ts.valid)
      return res(
        {
          success: false,
          message: "Challenge verification failed",
          result: ts.response,
        },
        418,
      );

    if (env.SLACK_FORM_POST_GENERIC)
      await fetch(env.SLACK_FORM_POST_GENERIC, {
        method: "POST",
        body: JSON.stringify({
          form: data.form,
          name: data.name ?? "",
          email: data.email ?? "",
          message: data.message ?? "",
        }),
      });

    return res(
      { success: true, message: "Submission received", result: data },
      200,
    );
  } catch (error) {
    return res(
      {
        success: false,
        message: "Error handling submission",
        error: error,
      },
      500,
    );
  }
};

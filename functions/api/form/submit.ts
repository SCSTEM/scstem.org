import { Res, ValidateTurnstile } from "../../util";
import { GenericFormRequest } from "@site/functions/types";

export const onRequestPost: PagesFunction<{
  TS_SECRET_KEY: string;
  SLACK_FORM_POST_GENERIC: string;
}> = async ({ request, env }) => {
  const data = await request.json<GenericFormRequest>();

  let key = env.TS_SECRET_KEY;
  if (!key) key = "1x0000000000000000000000000000000AA";

  try {
    const ts = await ValidateTurnstile(
      key,
      data["cf-turnstile-response"],
      request.headers.get("CF-Connecting-IP")
    );

    if (!ts.valid)
      return Res(
        {
          success: false,
          message: "Challenge verification failed",
          result: ts.response,
        },
        418
      );

    if (env.SLACK_FORM_POST_GENERIC)
      await fetch(env.SLACK_FORM_POST_GENERIC, {
        method: "POST",
        body: JSON.stringify({
          name: data.name ?? "",
          email: data.email ?? "",
          message: data.message ?? "",
        }),
      });

    return Res(
      { success: true, message: "Submission received", result: data },
      200
    );
  } catch (error) {
    return Res(
      {
        success: false,
        message: "Error handling submission",
        error: error,
      },
      500
    );
  }
};

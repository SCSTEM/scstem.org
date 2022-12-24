import { Res, ValidateTurnstile } from "../../util";

export const onRequestPost: PagesFunction<{ TS_SECRET_KEY: string }> = async (
  context
) => {
  const formData = await context.request.formData();

  let key = context.env.TS_SECRET_KEY;
  if (!key) key = "1x00000000000000000000AA";

  const valid = await ValidateTurnstile(
    key,
    (formData.get("cf-turnstile-response") as string) ?? "",
    context.request.headers.get("CF-Connecting-IP")
  );

  if (!valid)
    return Res(
      { success: false, message: "Challenge verification failed" },
      418
    );

  const res = {};
  formData.forEach((value, key) => {
    res[key] = value;
  });

  return Res(
    { success: true, message: "Submission received", result: res },
    200
  );
};

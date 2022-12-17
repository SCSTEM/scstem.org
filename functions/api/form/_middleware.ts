import staticFormsPlugin, {
  PluginArgs,
} from "@cloudflare/pages-plugin-static-forms";
import { ValidateTurnstile } from "../../util";

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
    return new Response("Challenge verification failed", { status: 418 });

  return;
};

/* eslint-disable */
export const onRequest: PagesFunction<
  { TS_SECRET_KEY: string },
  any,
  PluginArgs
> = async (context) => {
  let key = context.env.TS_SECRET_KEY;
  if (!key) key = "1x00000000000000000000AA";

  return staticFormsPlugin({
    respondWith: async ({ formData, name }) => {
      const valid = await ValidateTurnstile(
        key,
        (formData.get("cf-turnstile-response") as string) ?? "",
        context.request.headers.get("CF-Connecting-IP")
      );

      if (!valid)
        return new Response("Challenge verification failed", { status: 418 });

      await fetch("https://scstem.requestcatcher.com/test", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      switch (name) {
        case "contact":
          await fetch("https://scstem.requestcatcher.com/test", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          break;
        case "webmaster":
          return new Response(formData, { status: 200 });
        default:
          return new Response("Invalid form name", { status: 403 });
      }
    },
  })(context);
};

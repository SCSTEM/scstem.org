import staticFormsPlugin, {
  PluginArgs,
} from "@cloudflare/pages-plugin-static-forms";
import { ValidateTurnstile } from "./util";

/* eslint-disable */
export const onRequest: PagesFunction<
  { TS_SECRET_KEY: string },
  any,
  PluginArgs
> = async (context) => {
  return staticFormsPlugin({
    respondWith: async ({ formData, name }) => {
      const valid = await ValidateTurnstile(
        context.env.TS_SECRET_KEY,
        formData.get("cf-turnstile-response") as string,
        context.request.headers.get("CF-Connecting-IP")
      );

      if (!valid)
        return new Response("Challenge verification failed", { status: 418 });

      switch (name) {
        case "contact":
          return new Response(formData);
          break;
        case "webmaster":
          return new Response(formData);
          break;
        default:
          return new Response("Invalid form name", { status: 403 });
      }
    },
  })(context);
};

import cloudflareAccessPlugin, {
  PluginData,
} from "@cloudflare/pages-plugin-cloudflare-access";

/* eslint-disable */
export const onRequestGet: PagesFunction<
  { AUTH_AUD: string; AUTH_DISABLED: string },
  any,
  PluginData
> = (context) => {
  if (context.env.AUTH_DISABLED !== "true")
    return cloudflareAccessPlugin({
      domain: "https://scstem.cloudflareaccess.com",
      aud: context.env.AUTH_AUD,
    })(context);
};

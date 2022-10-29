import cloudflareAccessPlugin, {
  PluginData,
} from "@cloudflare/pages-plugin-cloudflare-access";

// BUG: This is currently broken, sending the user into a redirect loop.
// See https://discord.com/channels/595317990191398933/967071916160610344/1023227497497759784
// and https://github.com/cloudflare/pages-plugins/issues/13 for more info

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

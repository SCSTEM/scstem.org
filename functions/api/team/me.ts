import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";

/* eslint-disable */
export const onRequestGet: PagesFunction<
  { AUTH_DISABLED: string },
  any,
  PluginData
> = async ({ data, env }) => {
  if (env.AUTH_DISABLED) {
    return new Response("");
  }

  const identity = await data.cloudflareAccess.JWT.getIdentity();
  return new Response(identity.name);
};

import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";

/* eslint-disable */
export const onRequestGet: PagesFunction<
  { AUTH_DISABLED: string },
  any,
  PluginData
> = async ({ data, env }) => {
  const identity = await data.cloudflareAccess.JWT.getIdentity();
  return new Response(env.AUTH_DISABLED !== "true" ? identity.name : "");
};

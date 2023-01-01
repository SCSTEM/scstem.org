import { Shortlink } from "@site/functions/types";
import { Res } from "@site/functions/util";

export const onRequestGet: PagesFunction<{ KV_LINKS: KVNamespace }> = async ({
  request,
  env,
}) => {
  const links: Shortlink[] = [];

  try {
    const entries = await env.KV_LINKS.list();

    if (entries.list_complete && entries.keys.length > 0) {
      await Promise.all(
        entries.keys.map(async (entry) => {
          const url = await env.KV_LINKS.get(entry.name).catch(() => undefined);

          if (url) {
            links.push({
              url,
              code: entry.name,
              date: entry.metadata["dateTime"],
            });
          }
        })
      );
    }
  } catch (error) {
    return Res({ success: false, message: "Unable to get links", error }, 500);
  }

  // If there are no links...
  if (links.length === 0)
    return Res({ success: true, message: "No shortlinks found" }, 200);

  // If the user is requesting prettyprint
  if (new URL(request.url).searchParams.get("pretty") === "1")
    return Res({ success: true, result: JSON.stringify(links, null, 2) }, 200);

  return Res({ success: true, result: links }, 200);
};

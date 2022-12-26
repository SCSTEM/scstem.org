import Shortlinks from "@site/src/pages/team/shortlinks";
import type { Shortlink } from "../../../types";
import { Res } from "../../../util";

export const onRequest: PagesFunction<{ KV_LINKS: KVNamespace }> = async ({
  env,
  request,
}) => {
  let body: Shortlink;

  try {
    body = await request.json();
  } catch {
    return Res(
      {
        success: false,
        message: "You must specify a URL and code to shorten link",
      },
      400
    );
  }

  // Make sure the request is good before continuing
  const error = await checkRequest(body).catch((error) => error);
  if (error) return Res({ success: false, message: "Bad Request", error }, 400);

  const shortlink: Shortlink | undefined = await getLink(
    env.KV_LINKS,
    body.code
  ).catch(() => undefined);

  // Process request based on method
  switch (request.method) {
    case "POST": {
      // Make sure code does not already exist
      if (shortlink)
        return Res(
          {
            success: false,
            message: `Code \`${shortlink.code}\` already exists.`,
          },
          400
        );

      // Add code to KV
      return setLink(env.KV_LINKS, { code: body.code, url: body.url })
        .then((link) =>
          Res(
            {
              success: true,
              result: { url: link.url, code: link.code, date: link.date },
            },
            200
          )
        )
        .catch((e) =>
          Res(
            {
              success: false,
              message: "Problem writing shortlink to KV store",
              error: e,
            },
            500
          )
        );
    }

    case "DELETE": {
      // Make sure code exists
      if (!shortlink)
        return Res(
          { success: false, message: `Code \`${shortlink.code}\` not found.` },
          400
        );

      // Delete the key value pair
      return removeLink(env.KV_LINKS, shortlink)
        .then(() => Res({ success: true, message: "Link removed" }, 200))
        .catch((error) =>
          Res(
            {
              success: false,
              message: "Problem deleting shortlink from KV store",
              error,
            },
            500
          )
        );
    }

    case "PATCH": {
      // Make sure code exists
      if (!shortlink)
        return Res(
          { success: false, message: `Code \`${shortlink.code}\` not found.` },
          400
        );

      // Delete the existing link
      try {
        removeLink(env.KV_LINKS, shortlink);
      } catch (error) {
        return Res(
          { success: false, message: "Error removing link from KV", error },
          500
        );
      }

      // Re-add the link
      return setLink(env.KV_LINKS, shortlink)
        .then((link) =>
          Res({ success: true, message: "Link updated", result: link }, 200)
        )
        .catch((error) =>
          Res({ success: false, message: "Error updating link", error }, 500)
        );
    }
  }
};

const getLink = async (
  store: KVNamespace,
  code: string
): Promise<Shortlink> => {
  return store.getWithMetadata(code).then((item) => ({
    url: item.value,
    code: code,
    date: item.metadata["dateTime"],
  }));
};

const setLink = async (
  store: KVNamespace,
  sl: Shortlink
): Promise<Shortlink> => {
  return store
    .put(sl.code, sl.url, {
      metadata: { dateTime: Date.now() },
    })
    .then(() => sl);
};

const removeLink = async (store: KVNamespace, sl: Shortlink): Promise<void> => {
  return store.delete(sl.code);
};

/**
 * Helper function to check requests before processing. Checks to ensure a URL and code is provided,
 * as well as making sure the request itself matches the correct type
 * @param sl The Shortlink request
 * @returns A Promise that will be rejected if the request does not the appropriate parameters
 */
const checkRequest = async (sl: Shortlink): Promise<void> => {
  // Make sure a request body was provided
  if (!sl) return Promise.reject("Request body not valid");

  // Make sure a URL was provided
  if (!sl.url) return Promise.reject("You must supply a valid URL to shorten");

  // Make sure a code was provided
  if (!sl.code)
    return Promise.reject("You must supply a code to associate with this URL");
};

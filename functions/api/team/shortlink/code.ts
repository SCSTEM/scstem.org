import { Res } from "../../../util";
import Filter from "bad-words";

export const onRequestGet: PagesFunction<{ KV_LINKS: KVNamespace }> = async ({
  request,
  env,
}) => {
  const length = parseInt(new URL(request.url).searchParams.get("length")) || 6;

  try {
    const code = await generateCode(length, env.KV_LINKS);

    return Res({ success: true, result: code }, 200);
  } catch (error) {
    return Res(
      { success: false, error, message: "Unable to generate code" },
      500
    );
  }
};

/**
 * Generates a code using alphabetic lower-case letters only. Checks tow
 * make sure code does not already exist in KV
 * Inspired by: https://stackoverflow.com/a/1349426
 * @param length Length of code to generate
 * @param kv Key-value store to check against when generating codes
 * @returns Generated code
 */
const generateCode = async (length: number, kv: KVNamespace) => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Check for profanity
  if (new Filter().isProfane(code)) code = await generateCode(length, kv);

  // Check for duplicates
  if (await kv.get(code)) code = await generateCode(length, kv);

  return code;
};

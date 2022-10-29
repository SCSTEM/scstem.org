import { Res } from "../../util";

export const onRequestGet: PagesFunction<{ KV_LINKS: KVNamespace }> = async ({
  request,
  env,
}) => {
  const length = parseInt(new URL(request.url).searchParams.get("length")) || 6;

  return Res(
    { success: true, result: await generateCode(length, env.KV_LINKS) },
    200
  );
};

/**
 * Generates a code using alphabetic lower-case letters only. Checks to
 * make sure code does not already exist in KV
 * Inspired by: https://stackoverflow.com/a/1349426
 * @param length Length of code to generate
 * @param kv Key-value store to check against when generating codes
 * @returns Generated code
 */
const generateCode = async (length: number, kv: KVNamespace) => {
  const chars = "ab";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  if (await kv.get(code)) code = await generateCode(length, kv);

  return code;
};

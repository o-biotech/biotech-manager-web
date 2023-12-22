import { initializeDenoKv } from "@fathym/eac";

export const denoKv = await initializeDenoKv(
  Deno.env.get("DENO_KV_PATH") || undefined,
);

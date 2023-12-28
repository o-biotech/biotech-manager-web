import { initializeDenoKv } from "@fathym/eac";

import "$std/dotenv/load.ts";

export const denoKv = await initializeDenoKv(
  Deno.env.get("DENO_KV_PATH") || undefined,
);

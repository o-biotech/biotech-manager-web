import { existsSync } from "@fathym/common";
import { dirname } from "$std/path/mod.ts";

const denoKvPath = Deno.env.get("DENO_KV_PATH") || undefined;

if (denoKvPath && !denoKvPath.startsWith("https") && !existsSync(denoKvPath)) {
  const path = dirname(denoKvPath);

  if (path && !existsSync(path)) {
    Deno.mkdirSync(path);
  }
}

export const denoKv = await Deno.openKv(denoKvPath);

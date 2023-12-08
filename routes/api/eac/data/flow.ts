// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../../configs/deno-kv.config.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const flowing = !!(formData.get("flowing") as string);

    const entLookup = ctx.state.EaC!.EnterpriseLookup!;

    await denoKv.set(["EaC", entLookup, "Current", "Flowing"], flowing);

    return redirectRequest("/data");
  },
};

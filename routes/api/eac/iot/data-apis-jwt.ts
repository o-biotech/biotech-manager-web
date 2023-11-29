// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { EaCStatusProcessingTypes } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../../configs/deno-kv.config.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const jwt = formData.get("jwt") as string;

    const entLookup = ctx.state.EaC!.EnterpriseLookup!;

    const username = ctx.state.Username;

    await denoKv.set(["User", username, "EaC", entLookup, "JWT"], jwt);

    return redirectRequest("/devices");
  },
};

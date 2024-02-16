// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { respond } from "@fathym/common";
import { loadEaCAzureSvc } from "@fathym/eac";
import { OpenBiotechManagerAPIState } from "../../../../src/api/OpenBiotechManagerAPIState.ts";

export const handler: Handlers<any, OpenBiotechManagerAPIState> = {
  async GET(req, ctx) {
    const entLookup = ctx.state.EnterpriseLookup;

    const cloudLookup = ctx.state.CloudLookup;

    const url = new URL(req.url);

    const scopes: string[] = (url.searchParams.get("scope") as string).split(
      ",",
    );

    const eacAzureSvc = await loadEaCAzureSvc(ctx.state.EaCJWT!);

    const authToken = await eacAzureSvc.CloudAuthToken(
      entLookup,
      cloudLookup,
      scopes,
    );

    return respond(authToken);
  },
};

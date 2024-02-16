// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import { loadEaCSvc, UserEaCRecord } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  GET(_req, ctx) {
    return respond(ctx.state.EaC || {});
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const username = formData.get("username") as string;

    const isOwner = !!formData.get("isOwner");

    // const parentEaCSvc = await loadEaCSvc();

    // const jwt = await parentEaCSvc.JWT(
    //   ctx.state.EaC!.EnterpriseLookup,
    //   username
    // );

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const inviteResp = await eacSvc.InviteUser(
      ctx.state.EaC!.EnterpriseLookup!,
      {
        Owner: isOwner,
        Username: username,
      } as UserEaCRecord,
    );

    console.log(inviteResp);

    return redirectRequest("/teams");
  },
};

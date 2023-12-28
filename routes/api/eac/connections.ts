// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { respond } from "@fathym/common";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { loadEaCSvc } from "../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const eacConnections = await eacSvc.Connections<OpenBiotechEaC>(
      ctx.state.EaC!,
    );

    return respond(eacConnections);
  },

  async POST(req, ctx) {
    const eac: OpenBiotechEaC = await req.json();

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const eacConnections = await eacSvc.Connections<OpenBiotechEaC>(
      eac || ctx.state.EaC!,
    );

    return respond(eacConnections);
  },
};

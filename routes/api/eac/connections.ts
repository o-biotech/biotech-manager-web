// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCStatus,
  EaCStatusProcessingTypes,
  sleep,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";
import { eacSvc } from "../../../services/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    const eacConnections = await eacSvc.Connections<OpenBiotechEaC>(
      ctx.state.EaC!,
    );

    return respond(eacConnections);
  },

  async POST(req, ctx) {
    const eac: OpenBiotechEaC = await req.json();

    const eacConnections = await eacSvc.Connections<OpenBiotechEaC>(
      eac || ctx.state.EaC!,
    );

    return respond(eacConnections);
  },
};

// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { respond } from "@fathym/common";
import { ExplorerRequest } from "@fathym/eac";
import { OpenBiotechManagerAPIState } from "../../../../src/api/OpenBiotechManagerAPIState.ts";
import { loadEaCExplorerSvc } from "../../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerAPIState> = {
  async GET(_req, ctx) {
    const entLookup = ctx.state.EnterpriseLookup;

    const _username = ctx.state.Username;

    const cloudLookup = ctx.state.CloudLookup;

    const resGroupLookup = ctx.state.ResourceGroupLookup;

    const resLookups = ["iot-flow", "iot-flow-warm"];

    const expReq: ExplorerRequest = {
      Query: `Devices
      | where RawData != ""`,
    };

    const eacExplorerSvc = await loadEaCExplorerSvc(ctx.state.EaCJWT!);

    const queryResp = await eacExplorerSvc.Query(
      entLookup,
      cloudLookup,
      resGroupLookup,
      resLookups,
      "Telemetry",
      expReq,
    );

    return respond(JSON.stringify(queryResp));
  },
};

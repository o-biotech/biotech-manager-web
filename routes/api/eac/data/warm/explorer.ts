// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { respond } from "@fathym/common";
import { ExplorerRequest } from "@fathym/eac";
import { eacExplorerSvc } from "../../../../../services/eac.ts";
import { OpenBiotechManagerAPIState } from "../../../../../src/api/OpenBiotechManagerAPIState.ts";

export const handler: Handlers<any, OpenBiotechManagerAPIState> = {
  async GET(req, ctx) {
    // const formData = await req.formData();

    const entLookup = ctx.state.EnterpriseLookup;

    const cloudLookup = ctx.state.CloudLookup;

    const resGroupLookup = ctx.state.ResourceGroupLookup;

    const resLookups = ["iot-flow", "iot-flow-warm"];

    const expReq: ExplorerRequest = {
      Query: `Devices
      | where RawData != ""`,
    };

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

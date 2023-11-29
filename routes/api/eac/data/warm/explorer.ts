// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import { ExplorerRequest } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../../src/OpenBiotechManagerState.tsx";
import { eacExplorerSvc } from "../../../../../services/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    // const formData = await req.formData();

    const entLookup = ctx.state.EaC!.EnterpriseLookup!;

    const cloudLookup = ctx.state.Cloud.CloudLookup!;

    const resGroupLookup = ctx.state.Cloud.ResourceGroupLookup!;

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

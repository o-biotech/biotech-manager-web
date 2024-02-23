// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { loadEaCDataLakeSvc } from "@fathym/eac";
import { OpenBiotechManagerAPIState } from "../../../../src/api/OpenBiotechManagerAPIState.ts";

export const handler: Handlers<any, OpenBiotechManagerAPIState> = {
  async GET(req, ctx) {
    const entLookup = ctx.state.EnterpriseLookup;

    const _username = ctx.state.Username;

    const cloudLookup = ctx.state.CloudLookup;

    const resGroupLookup = ctx.state.ResourceGroupLookup;

    const resLookups = ["iot-flow", "iot-flow-cold"];

    const eacDataLakeSvc = await loadEaCDataLakeSvc(ctx.state.EaCJWT!);

    const url = new URL(req.url);

    const resultType = url.searchParams.get("resultType") as
      | "json"
      | "csv"
      | "jsonl";

    const flatten = JSON.parse(
      url.searchParams.get("flatten") || "false",
    ) as boolean;

    const download = JSON.parse(
      url.searchParams.get("download") || "false",
    ) as boolean;

    const resp = await eacDataLakeSvc.Execute(
      entLookup,
      cloudLookup,
      resGroupLookup,
      resLookups,
      "telemetry",
      resultType || "jsonl",
      flatten,
      download,
    );

    return new Response(resp.body!, {
      headers: resp.headers,
    });
  },
};

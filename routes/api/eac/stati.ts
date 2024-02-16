// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { respond } from "@fathym/common";
import { EaCStatusProcessingTypes, loadEaCSvc } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const url = new URL(req.url);

    const takeParam = url.searchParams.get("take");

    const statusTypes = url.searchParams
      .getAll("statusType")
      ?.map((st) => Number.parseInt(st) as EaCStatusProcessingTypes);

    const take = takeParam ? Number.parseInt(takeParam) : undefined;

    const eacStati = await eacSvc.ListStati(
      ctx.state.EaC!.EnterpriseLookup!,
      take,
      statusTypes,
    );

    return respond(eacStati);
  },
};

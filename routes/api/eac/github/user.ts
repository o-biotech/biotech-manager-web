// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { respond } from "@fathym/common";
import { loadMainOctokit } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { denoKv } from "../../../../configs/deno-kv.config.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    const sourceDetails = ctx.state.EaC!
      .SourceConnections![`GITHUB://${ctx.state.GitHub!.Username}`].Details!;

    const octokit = await loadMainOctokit(sourceDetails);

    const { data } = await octokit.rest.users
      .getAuthenticated();

    return respond(data);
  },
};

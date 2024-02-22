import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCSourceConnectionAsCode,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { GitHubAccessAction } from "../../../../../islands/molecules/GitHubAccessAction.tsx";
import { OpenBiotechManagerState } from "../../../../../src/OpenBiotechManagerState.tsx";
import { DeleteAction } from "../../../../../islands/molecules/DeleteAction.tsx";

export type EaCSourceConnectionsPageData = {
  manageSrcConn?: EaCSourceConnectionAsCode;

  manageSrcConnLookup?: string;
};

export const handler: Handlers<
  EaCSourceConnectionsPageData,
  OpenBiotechManagerState
> = {
  GET(_, ctx) {
    const manageSrcConnLookup: string = ctx.params.srcConnType
      ? `${ctx.params.srcConnType}://${ctx.params.srcConnUsername}`
      : "";

    let manageSrcConn: EaCSourceConnectionAsCode | undefined = undefined;

    if (manageSrcConnLookup) {
      manageSrcConn = ctx.state.EaC!.SourceConnections![manageSrcConnLookup]!;

      if (!manageSrcConn) {
        return redirectRequest("/enterprises/source-connections");
      }
    }

    const data: EaCSourceConnectionsPageData = {
      manageSrcConn: manageSrcConn,
      manageSrcConnLookup: manageSrcConnLookup,
    };

    return ctx.render(data);
  },

  async DELETE(req, ctx) {
    const srcConnLookup: string = ctx.params.srcConnLookup
      ? decodeURIComponent(ctx.params.srcConnLookup)
      : "";

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        SourceConnections: {
          [srcConnLookup]: null,
        },
      },
      false,
      60,
    );

    const status = await waitForStatus(
      eacSvc,
      deleteResp.EnterpriseLookup!,
      deleteResp.CommitID,
    );

    return respond(status);
  },
};

export default function EaCSourceConnections({
  data,
}: PageProps<EaCSourceConnectionsPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC Source Connections"
        callToAction="Configure connections to source control providers to access and work with your code."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-[#000028] text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <div class="max-w-sm mx-auto mb-4 mt-4 text-center">
        <h1 class="text-lg font-bold mb-4">
          {data.manageSrcConn
            ? `Manage the '${data.manageSrcConn.Details?.Name}' source connection`
            : "Create new source connection"}
        </h1>

        <GitHubAccessAction class="w-full mx-auto">
          {data.manageSrcConn ? "Refresh" : "Create"} GitHub Source Connection
        </GitHubAccessAction>
      </div>

      {data.manageSrcConnLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC Source Connection '${data.manageSrcConnLookup}?`}
          >
            Delete EaC Source Connection
          </DeleteAction>
        </div>
      )}
    </>
  );
}

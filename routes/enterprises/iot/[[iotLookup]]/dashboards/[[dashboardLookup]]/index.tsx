import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCDashboardAsCode,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../../../src/OpenBiotechManagerState.tsx";
import { loadEaCSvc } from "../../../../../../configs/eac.ts";
import { OpenBiotechEaC } from "../../../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../../../islands/molecules/DeleteAction.tsx";

export type EaCIoTDashboardPageData = {
  entLookup: string;

  iotLookup: string;

  manageDashboard?: EaCDashboardAsCode;

  manageDashboardLookup?: string;
};

export const handler: Handlers<
  EaCIoTDashboardPageData,
  OpenBiotechManagerState
> = {
  GET(_, ctx) {
    const iotLookup: string = ctx.params.iotLookup;

    const manageDashboardLookup: string = ctx.params.dashboardLookup;

    let manageDashboard: EaCDashboardAsCode | undefined = undefined;

    if (manageDashboardLookup) {
      manageDashboard = ctx.state.EaC!.IoT![iotLookup]!
        .Dashboards![manageDashboardLookup]!;

      if (!manageDashboard) {
        return redirectRequest(`/enterprises/iot/${iotLookup}/dashboards`);
      }
    }

    const data: EaCIoTDashboardPageData = {
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      iotLookup: iotLookup,
      manageDashboard: manageDashboard,
      manageDashboardLookup: manageDashboardLookup,
    };

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const iotLookup = formData.get("iotLookup") as string;

    const dashboardLookup = formData.get("dashboardLookup") as string;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      IoT: {
        [iotLookup]: {
          Dashboards: {
            [dashboardLookup]: {
              Details: {
                Name: formData.get("name") as string,
                Description: formData.get("description") as string,
                Type: formData.get("type") as string,
              },
            },
          },
        },
      },
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(saveEaC, 60);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest(`/enterprises/iot/${iotLookup}/dashboards`);
    } else {
      return redirectRequest(
        `/enterprises/iot/${iotLookup}/dashboards?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const iotLookup = ctx.params.iotLookup;

    const dashboardLookup = ctx.params.dashboardLookup;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        IoT: {
          [iotLookup]: {
            Dashboards: {
              [dashboardLookup]: null,
            },
          },
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

export default function EaCIoTDashboard({
  data,
}: PageProps<EaCIoTDashboardPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC IoT Dashboards"
        callToAction="Setup dashboard to visualize your IoT data out of the box."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <div class="max-w-sm mx-auto mb-4 mt-4 text-center">
        <h1 class="text-lg font-bold mb-4">
          {data.manageDashboard
            ? `Manage the '${data.manageDashboard.Details?.Name}' IoT dashboard`
            : "Create new dashboard"}
        </h1>

        TODO: Add non existing dashboards
      </div>

      {data.manageDashboardLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC IoT Dashboard '${data.manageDashboard?.Details?.Name}?`}
          >
            Delete EaC IoT Dashboard
          </DeleteAction>
        </div>
      )}
    </>
  );
}

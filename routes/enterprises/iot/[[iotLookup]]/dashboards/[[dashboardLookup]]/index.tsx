import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Action,
  ActionGroup,
  classSet,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
  Input,
  Select,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCDashboardAsCode,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../../../islands/molecules/DeleteAction.tsx";
import { callToActionStyles } from "../../../../../../components/styles/actions.tsx";
import { DashboardDisplay } from "../../../../../../islands/organisms/data/dashboard-display.tsx";

export type EaCIoTDashboardPageData = {
  dashboardOptions: { name: string; lookup: string }[];

  dashboardTypes: string[];

  entLookup: string;

  iotLookup: string;

  jwt: string;

  kustoCluster: string;

  kustoLocation: string;

  manageDashboard?: EaCDashboardAsCode;

  manageDashboardLookup?: string;
};

export const handler: Handlers<
  EaCIoTDashboardPageData,
  OpenBiotechManagerState
> = {
  async GET(_, ctx) {
    const iotLookup: string = ctx.params.iotLookup;

    const manageDashboardLookup: string = ctx.params.dashboardLookup;

    let manageDashboard: EaCDashboardAsCode | undefined = undefined;

    let dashboardTypes: string[] = [];

    let kustoCluster = "";

    let kustoLocation = "";

    if (manageDashboardLookup) {
      const iot = ctx.state.EaC!.IoT![iotLookup]!;

      manageDashboard = iot.Dashboards![manageDashboardLookup]!;

      if (!manageDashboard) {
        return redirectRequest(`/enterprises/iot/${iotLookup}/dashboards`);
      }

      const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

      const eacConnections = await eacSvc.Connections<OpenBiotechEaC>({
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
        Clouds: {
          [iot.CloudLookup!]: {
            ResourceGroups: {
              [iot.ResourceGroupLookup!]: {
                Resources: {
                  ["iot-flow"]: {
                    Resources: {},
                  },
                },
              },
            },
          },
        },
      });

      const iotFlowResource =
        eacConnections.Clouds![iot.CloudLookup!].ResourceGroups![
          iot.ResourceGroupLookup!
        ].Resources!["iot-flow"];

      const resKeys = iotFlowResource.Keys as Record<string, unknown>;

      const shortName = iot
        .ResourceGroupLookup!.split("-")
        .map((p) => p.charAt(0))
        .join("");

      const resLocations = iotFlowResource.Resources!["iot-flow-warm"]
        .Locations as Record<string, string>;

      kustoCluster = `${shortName}-data-explorer`;

      kustoLocation = resLocations[`Microsoft.Kusto/clusters/${kustoCluster}`];

      dashboardTypes = [manageDashboard.Details!.Type];
    }

    const data: EaCIoTDashboardPageData = {
      dashboardOptions: [],
      dashboardTypes: dashboardTypes,
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      iotLookup: iotLookup,
      jwt: ctx.state.Devices.JWT,
      kustoCluster: kustoCluster,
      kustoLocation: kustoLocation,
      manageDashboard: manageDashboard,
      manageDashboardLookup: manageDashboardLookup,
    };

    data.dashboardOptions = [
      { name: "Freeboard", lookup: "freeboard" },
      { name: "Azure Data Explorer", lookup: "azure-data-explorer" },
    ].filter(
      (d) => !(d.lookup in (ctx.state.EaC!.IoT![iotLookup]!.Dashboards || {})),
    );
    // data.dashboardOptions = [""].filter((do) => ture);
    // Array.from([""]).forEach((do) => true);

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
              Details: dashboardLookup === "freeboard"
                ? {
                  Name: "Freeboard",
                  Description: "The embeded instance of freeboard.",
                  Type: "Freeboard",
                }
                : {
                  Name: "Azure Data Explorer",
                  Description: "The embeded instance of azure data explorer.",
                  Type: "AzureDataExplorer",
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
        `/enterprises/iot/${iotLookup}/dashboards?commitId=${commitResp.CommitID}`,
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
      </div>

      {!data.manageDashboard &&
        (data.dashboardOptions.length > 0
          ? (
            <form method="post" class="mx-auto max-w-sm">
              <div class="w-full mb-2">
                <Input
                  id="entLookup"
                  name="entLookup"
                  type="hidden"
                  value={data.entLookup}
                />

                <Input
                  id="iotLookup"
                  name="iotLookup"
                  type="hidden"
                  value={data.iotLookup}
                />

                <label
                  for="dashboardLookup"
                  class="block uppercase tracking-wide font-bold mb-2 text-sm"
                >
                  Dashboard Type
                </label>

                <Select
                  id="dashboardLookup"
                  name="dashboardLookup"
                  required
                >
                  <option>-- Select Dashboard --</option>
                  {data.dashboardOptions.map((d) => {
                    return <option value={d.lookup}>{d.name}</option>;
                  })}
                </Select>
              </div>

              <ActionGroup class="mt-8 flex-col">
                <>
                  <Action
                    type="submit"
                    class={classSet(
                      [
                        "w-full text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
                      ],
                      callToActionStyles.props,
                    )}
                  >
                    Add Dashboard
                  </Action>
                </>
              </ActionGroup>
            </form>
          )
          : (
            <h1 class="text-lg mx-auto max-w-sm">
              All dashboard types are added, no dashboards available to add
            </h1>
          ))}

      {data.manageDashboardLookup && (
        <>
          <div class="flex flex-wrap mx-3 mb-4 text-left">
            <div class="w-full p-3">
              <DashboardDisplay
                dashboardTypes={data.dashboardTypes}
                jwt={data.jwt}
                kustoCluster={data.kustoCluster}
                kustoLocation={data.kustoLocation}
              />
            </div>
          </div>

          <div class="max-w-sm mx-auto mb-4">
            <DeleteAction
              message={`Are you sure you want to delete EaC IoT Dashboard '${data.manageDashboard?.Details?.Name}?`}
            >
              Delete EaC IoT Dashboard
            </DeleteAction>
          </div>
        </>
      )}
    </>
  );
}

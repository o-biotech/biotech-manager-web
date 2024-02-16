// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import {
  EaCDashboardAsCode,
  EaCIoTAsCode,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const iotLookup = formData.get("iotLookup") as string;

    const dataExplorer = !!(formData.get("dataExplorer") as string);

    // const fathymDataDashboard =
    //   !!(formData.get("fathymDataDashboard") as string);

    const freeboard = !!(formData.get("freeboard") as string);

    const iotDashboards: {
      [key: string]: EaCDashboardAsCode;
    } = {};

    if (dataExplorer) {
      iotDashboards[`azure-data-explorer`] = {
        Details: {
          Name: "Azure Data Explorer",
          Description: "The embeded instance of azure data explorer.",
          Type: "AzureDataExplorer",
        },
      };
    }

    if (freeboard) {
      iotDashboards[`freeboard`] = {
        Details: {
          Name: "Freeboard",
          Description: "The embeded instance of freeboard.",
          Type: "Freeboard",
        },
      };
    }

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      IoT: {
        [iotLookup]: {
          Dashboards: iotDashboards,
        } as EaCIoTAsCode,
      },
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(eac, 60 * 30);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest(`/`);
    } else {
      return redirectRequest(
        `/getting-started/devices?commitId=${commitResp.CommitID}`,
      );
    }
  },
};

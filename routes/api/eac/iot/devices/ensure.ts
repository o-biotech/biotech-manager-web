// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import {
  EaCCloudResourceAsCode,
  EaCCloudResourceFormatDetails,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../../src/eac/OpenBiotechEaC.ts";
import { eacSvc } from "../../../../../services/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const resGroupLookup = formData.get("resGroupLookup") as string;

    const iotLookup = formData.get("iotLookup") as string;

    const deviceLookup = (formData.get("deviceLookup") as string) || `iot-flow`;

    const isIoTEdge = !!(formData.get("isIoTEdge") as string);

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      IoT: {
        [iotLookup]: {
          CloudLookup: cloudLookup,
          ResourceGroupLookup: resGroupLookup,
          Devices: {
            [deviceLookup]: {
              Details: {
                Name: deviceLookup,
                Description: deviceLookup,
                IsIoTEdge: isIoTEdge,
              },
            },
          },
        },
      },
    };

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(eac, 60 * 30);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest("/devices");
    } else {
      return redirectRequest(
        `/devices?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${commitResp.CommitID}`,
      );
    }
  },
};

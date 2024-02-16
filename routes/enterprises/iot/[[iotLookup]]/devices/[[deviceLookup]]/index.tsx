import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DisplayStyleTypes,
  EaCManageIoTDeviceForm,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCDeviceAsCode,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../../../islands/molecules/DeleteAction.tsx";

export type EaCIoTDevicePageData = {
  entLookup: string;

  iotLookup: string;

  manageDevice?: EaCDeviceAsCode;

  manageDeviceLookup?: string;
};

export const handler: Handlers<EaCIoTDevicePageData, OpenBiotechManagerState> =
  {
    GET(_, ctx) {
      const iotLookup: string = ctx.params.iotLookup;

      const manageDeviceLookup: string = ctx.params.deviceLookup;

      let manageDevice: EaCDeviceAsCode | undefined = undefined;

      if (manageDeviceLookup) {
        manageDevice = ctx.state.EaC!.IoT![iotLookup]!
          .Devices![manageDeviceLookup]!;

        if (!manageDevice) {
          return redirectRequest(`/enterprises/iot/${iotLookup}/devices`);
        }
      }

      const data: EaCIoTDevicePageData = {
        entLookup: ctx.state.EaC!.EnterpriseLookup!,
        iotLookup: iotLookup,
        manageDevice: manageDevice,
        manageDeviceLookup: manageDeviceLookup,
      };

      return ctx.render(data);
    },

    async POST(req, ctx) {
      const formData = await req.formData();

      const iotLookup = formData.get("iotLookup") as string;

      const deviceLookup = formData.get("deviceLookup") as string;

      const saveEaC: OpenBiotechEaC = {
        EnterpriseLookup: formData.get("entLookup") as string,
        IoT: {
          [iotLookup]: {
            Devices: {
              [deviceLookup]: {
                Details: {
                  Name: formData.get("name") as string,
                  Description: formData.get("description") as string,
                  IsIoTEdge: !!(formData.get("isIoTEdge") as string),
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
        return redirectRequest(`/enterprises/iot/${iotLookup}/devices`);
      } else {
        return redirectRequest(
          `/enterprises/iot/${iotLookup}/devices?commitId=${commitResp.CommitID}`,
        );
      }
    },

    async DELETE(req, ctx) {
      const iotLookup = ctx.params.iotLookup;

      const deviceLookup = ctx.params.deviceLookup;

      const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

      const deleteResp = await eacSvc.Delete(
        {
          EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
          IoT: {
            [iotLookup]: {
              Devices: {
                [deviceLookup]: null,
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

export default function EaCIoTDevice({
  data,
}: PageProps<EaCIoTDevicePageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC IoT Device"
        callToAction="Create IoT devices to connect your edge to the cloud."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <EaCManageIoTDeviceForm
        entLookup={data.entLookup}
        iotLookup={data.iotLookup || ""}
        deviceLookup={data.manageDeviceLookup || ""}
        deviceName={data.manageDevice?.Details?.Name || ""}
        deviceDescription={data.manageDevice?.Details?.Description || ""}
        deviceIsIoTEdge={data.manageDevice?.Details?.IsIoTEdge || false}
      />

      {data.manageDeviceLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC IoT Device '${data.manageDeviceLookup}?`}
          >
            Delete EaC IoT Device
          </DeleteAction>
        </div>
      )}
    </>
  );
}

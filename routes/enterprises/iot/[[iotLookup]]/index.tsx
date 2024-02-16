import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DataLookup,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCIoTAsCode,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../islands/molecules/DeleteAction.tsx";
import { EaCManageIoTFormIsland } from "../../../../islands/molecules/EaCManageIoTFormIsland.tsx";

export type EaCIoTPageData = {
  cloudOptions: DataLookup[];

  entLookup: string;

  resGroupOptions: {
    [cloudLookup: string]: DataLookup[];
  };

  manageIoT?: EaCIoTAsCode;

  manageIoTLookup?: string;
};

export const handler: Handlers<EaCIoTPageData, OpenBiotechManagerState> = {
  GET(_, ctx) {
    const manageIoTLookup: string = ctx.params.iotLookup;

    let manageIoT: EaCIoTAsCode | undefined = undefined;

    if (manageIoTLookup) {
      manageIoT = ctx.state.EaC!.IoT![manageIoTLookup]!;

      if (!manageIoT) {
        return redirectRequest("/enterprises/iot");
      }
    }

    const data: EaCIoTPageData = {
      cloudOptions: [],
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      resGroupOptions: {},
      manageIoT: manageIoT,
      manageIoTLookup: manageIoTLookup,
    };

    for (const cloudLookup in ctx.state.EaC!.Clouds) {
      const cloud = ctx.state.EaC!.Clouds![cloudLookup];

      data.cloudOptions.push({
        Lookup: cloudLookup,
        Name: cloud.Details!.Name!,
      });

      data.resGroupOptions[cloudLookup] = [];

      for (const resGroupLookup in cloud.ResourceGroups) {
        const resGroup = cloud.ResourceGroups![resGroupLookup];

        data.resGroupOptions[cloudLookup].push({
          Lookup: resGroupLookup,
          Name: resGroup.Details!.Name!,
        });
      }
    }

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const iotLookup = formData.get("iotLookup") as string;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      IoT: {
        [iotLookup]: {
          Details: {
            Name: formData.get("name") as string,
            Description: formData.get("description") as string,
          },
          CloudLookup: formData.get("cloudLookup") as string,
          ResourceGroupLookup: formData.get("resGroupLookup") as string,
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
      return redirectRequest("/enterprises/iot");
    } else {
      return redirectRequest(
        `/enterprises/iot?commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const iotLookup = ctx.params.iotLookup;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        IoT: {
          [iotLookup]: null,
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

export default function EaCIoT({
  data,
}: PageProps<EaCIoTPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC IoT"
        callToAction="Configure reusable secrets to use in your system, where values are stored in a secure key vault."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <EaCManageIoTFormIsland
        entLookup={data.entLookup}
        iotLookup={data.manageIoTLookup || ""}
        iotName={data.manageIoT?.Details?.Name || ""}
        iotDescription={data.manageIoT?.Details?.Description || ""}
        iotCloudLookup={data.manageIoT?.CloudLookup || ""}
        iotResGroupLookup={data.manageIoT?.ResourceGroupLookup || ""}
        cloudOptions={data.cloudOptions}
        resGroupOptions={data.resGroupOptions}
      />

      {data.manageIoTLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC IoT '${data.manageIoTLookup}?`}
          >
            Delete EaC IoT
          </DeleteAction>
        </div>
      )}
    </>
  );
}

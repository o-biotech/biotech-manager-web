import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DisplayStyleTypes,
  EaCManageDevOpsActionForm,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCDevOpsActionAsCode,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { loadEaCSvc } from "../../../../configs/eac.ts";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../islands/molecules/DeleteAction.tsx";

export type EaCDevOpsActionsPageData = {
  entLookup: string;

  manageDoa?: EaCDevOpsActionAsCode;

  manageDoaLookup?: string;
};

export const handler: Handlers<
  EaCDevOpsActionsPageData,
  OpenBiotechManagerState
> = {
  GET(_, ctx) {
    const manageDoaLookup: string = ctx.params.doaLookup;

    let manageDoa: EaCDevOpsActionAsCode | undefined = undefined;

    if (manageDoaLookup) {
      manageDoa = ctx.state.EaC!.DevOpsActions![manageDoaLookup]!;

      if (!manageDoa) {
        return redirectRequest("/enterprises/devops-actions");
      }
    }

    const data: EaCDevOpsActionsPageData = {
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      manageDoa: manageDoa,
      manageDoaLookup: manageDoaLookup,
    };

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const doaLookup = formData.get("doaLookup") as string;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      DevOpsActions: {
        [doaLookup]: {
          Details: {
            Name: formData.get("name") as string,
            Description: formData.get("description") as string,
            Path: formData.get("path") as string,
            Templates: (formData.get("templatePaths") as string).split("\r\n"),
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
      return redirectRequest("/enterprises/devops-actions");
    } else {
      return redirectRequest(
        `/enterprises/devops-actions?commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const doaLookup = ctx.params.doaLookup;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        DevOpsActions: {
          [doaLookup]: null,
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

export default function EaCDevOpsActions({
  data,
}: PageProps<EaCDevOpsActionsPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC DevOps Action"
        callToAction="Configure reusable DevOps Action profiles to manage build processes for your source control locations."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <EaCManageDevOpsActionForm
        entLookup={data.entLookup}
        doaLookup={data.manageDoaLookup || ""}
        doaName={data.manageDoa?.Details?.Name || ""}
        doaDescription={data.manageDoa?.Details?.Description || ""}
        doaPath={data.manageDoa?.Details?.Path || ""}
        doaTemplatePaths={data.manageDoa?.Details?.Templates || []}
      />

      {data.manageDoaLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC DevOps Action '${data.manageDoaLookup}?`}
          >
            Delete EaC DevOps Action
          </DeleteAction>
        </div>
      )}
    </>
  );
}

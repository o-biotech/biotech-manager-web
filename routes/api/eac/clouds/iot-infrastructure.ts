// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import { EaCStatusProcessingTypes } from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { loadEaCSvc } from "../../../../configs/eac.ts";
import { setupEaCIoTFlow } from "../../../../src/utils/eac/setupEaCIoTFlow.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const resGroupLookup = formData.get("resGroupLookup") as string;

    const resLookup = (formData.get("resLookup") as string) || `iot-flow`;

    const storageFlowCold = !!(formData.get("storageFlowCold") as string);

    const storageFlowWarm = !!(formData.get("storageFlowWarm") as string);

    const storageFlowHot = !!(formData.get("storageFlowHot") as string);

    const gitHubOrg = formData.get("gitHubOrg") as string;

    const gitHubRepo = formData.get("gitHubRepo") as string;

    const gitHubUsername = ctx.state.GitHub?.Username!;

    const eac = setupEaCIoTFlow(
      ctx.state.EaC!.EnterpriseLookup!,
      ctx.state.EaC!.Clouds!,
      cloudLookup,
      resGroupLookup,
      resLookup,
      storageFlowCold,
      storageFlowWarm,
      storageFlowHot,
      gitHubOrg,
      gitHubRepo,
      gitHubUsername,
    );

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(eac, 60 * 30);

    // const status = await waitForStatus(
    //   eacSvc,
    //   commitResp.EnterpriseLookup,
    //   commitResp.CommitID,
    // );

    const status = await eacSvc.Status(
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (
      status.Processing == EaCStatusProcessingTypes.PROCESSING ||
      status.Processing == EaCStatusProcessingTypes.QUEUED
    ) {
      return redirectRequest(
        `/commit/${commitResp.CommitID}/status?successRedirect=/&errorRedirect=/getting-started/cloud`,
      );
    } else {
      return redirectRequest(
        `/getting-started/cloud?commitId=${commitResp.CommitID}`,
      );
    }
  },
};

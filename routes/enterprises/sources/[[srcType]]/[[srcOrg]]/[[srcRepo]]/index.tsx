import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DataLookup,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCSourceAsCode,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatus,
} from "@fathym/eac";
import { GitHubAccessAction } from "../../../../../../islands/molecules/GitHubAccessAction.tsx";
import { OpenBiotechManagerState } from "../../../../../../src/OpenBiotechManagerState.tsx";
import { DeleteAction } from "../../../../../../islands/molecules/DeleteAction.tsx";
import { OpenBiotechEaC } from "../../../../../../src/eac/OpenBiotechEaC.ts";
import { EaCManageSourceFormIsland } from "../../../../../../islands/molecules/EaCManageSourceFormIsland.tsx";

export type EaCSourcesPageData = {
  entLookup: string;

  hasGitHubAuth: boolean;

  manageSrc?: EaCSourceAsCode;

  manageSrcLookup?: string;

  organizationOptions: string[];

  repositoryOptions: {
    [cloudLookup: string]: string[];
  };

  secretOptions: DataLookup[];
};

export const handler: Handlers<EaCSourcesPageData, OpenBiotechManagerState> = {
  async GET(_, ctx) {
    const manageSrcLookup: string = ctx.params.srcType
      ? `${ctx.params.srcType}://${ctx.params.srcOrg}/${ctx.params.srcRepo}`
      : "";

    let manageSrc: EaCSourceAsCode | undefined = undefined;

    if (manageSrcLookup) {
      manageSrc = ctx.state.EaC!.Sources![manageSrcLookup]!;

      if (!manageSrc) {
        return redirectRequest("/enterprises/sources");
      }
    }

    const data: EaCSourcesPageData = {
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      hasGitHubAuth: !!ctx.state.GitHub,
      manageSrc: manageSrc,
      manageSrcLookup: manageSrcLookup,
      organizationOptions: [],
      repositoryOptions: {},
      secretOptions: [],
    };

    if (ctx.state.GitHub && ctx.state.EaC!.SourceConnections) {
      const sourceKey = `GITHUB://${ctx.state.GitHub!.Username}`;

      if (ctx.state.EaC!.SourceConnections![sourceKey]) {
        const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

        const eacConnections = await eacSvc.Connections<OpenBiotechEaC>({
          EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
          SourceConnections: {
            [sourceKey]: {},
          },
        });

        if (eacConnections.SourceConnections) {
          data.organizationOptions = Object.keys(
            eacConnections.SourceConnections[sourceKey].Organizations || {},
          );
        }
      }
    }

    for (const secretLookup in ctx.state.EaC!.Secrets) {
      const secret = ctx.state.EaC!.Secrets![secretLookup]!;

      data.secretOptions.push({
        Lookup: secretLookup,
        Name: secret.Details!.Name!,
      });
    }

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const org = formData.get("org") as string;

    const repo = formData.get("repo") as string;

    const action = formData.get("action") as string;

    const remote = formData.get("remote") as string;

    const remoteUrl = new URL(remote);

    const [remoteOrg, remoteRepo] = remoteUrl.pathname.substring(1).split("/");

    const configuredSrcLookup = !action || action === "configure"
      ? `GITHUB://${org}/${repo}`
      : `GITHUB://${remoteOrg}/${remoteRepo}`;

    const srcLookup = (formData.get("srcLookup") as string) ||
      `GITHUB://${org}/${repo}`;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      Sources: {
        [srcLookup]: {
          Details: {
            Name: formData.get("name") as string,
            Description: formData.get("description") as string,
            Branches: ["main", "integration"],
            MainBranch: "integration",
            Organization: org,
            Repository: repo,
            Type: "GITHUB",
            Username: ctx.state.GitHub!.Username,
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
      return redirectRequest("/enterprises/sources");
    } else {
      return redirectRequest(
        `/enterprises/sources?commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const srcLookup: string = ctx.params.srcLookup
      ? decodeURIComponent(ctx.params.srcLookup)
      : "";

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        Sources: {
          [srcLookup]: null,
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

export default function EaCSources({
  data,
}: PageProps<EaCSourcesPageData, OpenBiotechManagerState>) {
  const activeDisplay = data.hasGitHubAuth
    ? (
      <EaCManageSourceFormIsland
        entLookup={data.entLookup}
        sourceLookup={data.manageSrcLookup || ""}
        sourceName={data.manageSrc?.Details?.Name || ""}
        sourceDescription={data.manageSrc?.Details?.Description || ""}
        sourceOrgnaization={data.manageSrc?.Details?.Organization || ""}
        sourceRepository={data.manageSrc?.Details?.Repository || ""}
        organizationOptions={data.organizationOptions}
        // repositoryOptions={data.repositoryOptions}
        secretOptions={data.secretOptions}
      />
    )
    : (
      <div class="max-w-sm mx-auto mb-4">
        <h1 class="text-lg font-bold">Connect to GitHub to continue</h1>

        <GitHubAccessAction>Sign in to GitHub</GitHubAccessAction>
      </div>
    );
  return (
    <>
      <Hero
        title="Manage EaC Sources"
        callToAction="Configure connections to source control providers to access and work with your code."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-[#000028] text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      {activeDisplay}

      {data.manageSrc && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC Source '${data.manageSrcLookup}?`}
          >
            Delete EaC source
          </DeleteAction>
        </div>
      )}
    </>
  );
}

import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DataLookup,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCSecretAsCode,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { loadEaCSvc } from "../../../../configs/eac.ts";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../islands/molecules/DeleteAction.tsx";
import { EaCManageSecretFormIsland } from "../../../../islands/molecules/EaCManageSecretFormIsland.tsx";

export type EaCSecretsPageData = {
  cloudOptions: DataLookup[];

  entLookup: string;

  keyVaultOptions: {
    [cloudLookup: string]: DataLookup[];
  };

  manageSecret?: EaCSecretAsCode;

  manageSecretLookup?: string;
};

export const handler: Handlers<EaCSecretsPageData, OpenBiotechManagerState> = {
  GET(_, ctx) {
    const manageSecretLookup: string = ctx.params.secretLookup;

    let manageSecret: EaCSecretAsCode | undefined = undefined;

    if (manageSecretLookup) {
      manageSecret = ctx.state.EaC!.Secrets![manageSecretLookup]!;

      if (!manageSecret) {
        return redirectRequest("/enterprises/secrets");
      }
    }

    const data: EaCSecretsPageData = {
      cloudOptions: [],
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      keyVaultOptions: {},
      manageSecret: manageSecret,
      manageSecretLookup: manageSecretLookup,
    };

    for (const cloudLookup in ctx.state.EaC!.Clouds) {
      const cloud = ctx.state.EaC!.Clouds![cloudLookup];

      data.cloudOptions.push({
        Lookup: cloudLookup,
        Name: cloud.Details!.Name!,
      });

      data.keyVaultOptions[cloudLookup] = [];

      for (const resGroupLookup in cloud.ResourceGroups) {
        const resGroup = cloud.ResourceGroups![resGroupLookup];

        const shortName = resGroupLookup
          .split("-")
          .map((p) => p.charAt(0))
          .join("");

        data.keyVaultOptions[cloudLookup].push({
          Lookup: `${shortName}-key-vault`,
          Name: resGroup.Details!.Name!,
        });
      }
    }

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const secretLookup = formData.get("secretLookup") as string;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      Secrets: {
        [secretLookup]: {
          Details: {
            Name: formData.get("name") as string,
            Description: formData.get("description") as string,
            Value: (formData.get("value") as string) || undefined,
          },
          CloudLookup: formData.get("cloudLookup") as string,
          KeyVaultLookup: formData.get("keyVaultLookup") as string,
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
      return redirectRequest("/enterprises/secrets");
    } else {
      return redirectRequest(
        `/enterprises/secrets?commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const secretLookup = ctx.params.secretLookup;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        Secrets: {
          [secretLookup]: null,
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

export default function EaCSecrets({
  data,
}: PageProps<EaCSecretsPageData, OpenBiotechManagerState>) {
  const secretValue = data.manageSecret?.Details?.Value?.startsWith("$secret:")
    ? ""
    : data.manageSecret?.Details?.Value || "";
  return (
    <>
      <Hero
        title="Manage EaC Secret"
        callToAction="Configure reusable secrets to use in your system, where values are stored in a secure key vault."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <EaCManageSecretFormIsland
        entLookup={data.entLookup}
        secretLookup={data.manageSecretLookup || ""}
        secretName={data.manageSecret?.Details?.Name || ""}
        secretDescription={data.manageSecret?.Details?.Description || ""}
        secretValue={secretValue}
        secretCloudLookup={data.manageSecret?.CloudLookup || ""}
        secretKeyVaultLookup={data.manageSecret?.KeyVaultLookup || ""}
        cloudOptions={data.cloudOptions}
        keyVaultOptions={data.keyVaultOptions}
      />

      {data.manageSecretLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC Secret '${data.manageSecretLookup}?`}
          >
            Delete EaC Secret
          </DeleteAction>
        </div>
      )}
    </>
  );
}

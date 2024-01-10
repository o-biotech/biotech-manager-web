// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import {
  EaCCloudAzureDetails,
  EaCCloudResourceAsCode,
  EaCCloudResourceFormatDetails,
  EaCSourceAsCode,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { loadEaCSvc } from "../../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const resGroupLookup = formData.get("resGroupLookup") as string;

    const resLookup = (formData.get("resLookup") as string) || `iot-flow`;

    const resGroupLocation =
      ctx.state.EaC!.Clouds![cloudLookup].ResourceGroups![resGroupLookup]
        .Details!.Location;

    const storageFlowCold = !!(formData.get("storageFlowCold") as string);

    const storageFlowWarm = !!(formData.get("storageFlowWarm") as string);

    const storageFlowHot = !!(formData.get("storageFlowHot") as string);

    const shortName = resGroupLookup
      .split("-")
      .map((p) => p.charAt(0))
      .join("");

    const iotResources: {
      [key: string]: EaCCloudResourceAsCode;
    } = {};

    const sources: {
      [key: string]: EaCSourceAsCode;
    } = {};

    const details = ctx.state.EaC!.Clouds![cloudLookup]
      .Details as EaCCloudAzureDetails;

    const servicePrincipalId = details!.ID;

    if (storageFlowCold) {
      iotResources[`${resLookup}-cold`] = {
        Details: {
          Type: "Format",
          Name: "IoT Infrastructure - Cold Flow",
          Description:
            "The cold flow IoT Infrastructure to use for the enterprise.",
          Order: 1,
          Template: {
            Content:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/cold/template.jsonc",
            Parameters:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/cold/parameters.jsonc",
          },
          Data: {
            CloudLookup: cloudLookup,
            Location: resGroupLocation,
            Name: resGroupLookup,
            ParentResourceLookup: `${resLookup}`,
            ResourceLookup: `${resLookup}-cold`,
            ShortName: shortName,
          },
          Outputs: {},
        } as EaCCloudResourceFormatDetails,
      };
    }

    if (storageFlowWarm) {
      iotResources[`${resLookup}-warm`] = {
        Details: {
          Type: "Format",
          Name: "IoT Infrastructure - Warm Flow",
          Description:
            "The warm flow IoT Infrastructure to use for the enterprise.",
          Order: 1,
          Template: {
            Content:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/warm/template.jsonc",
            Parameters:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/warm/parameters.jsonc",
          },
          Data: {
            CloudLookup: cloudLookup,
            Location: resGroupLocation,
            Name: resGroupLookup,
            PrincipalID: "", // TODO: Pass in user email (email used to login to OpenBiotech must match one used for Azure)
            ResourceLookup: `${resLookup}-warm`,
            ServicePrincipalID: servicePrincipalId,
            ShortName: shortName,
          },
          Outputs: {},
        } as EaCCloudResourceFormatDetails,
      };
    }

    if (storageFlowHot) {
      iotResources[`${resLookup}-hot`] = {
        Details: {
          Type: "Format",
          Name: "IoT Infrastructure - Hot Flow",
          Description:
            "The hot flow IoT Infrastructure to use for the enterprise.",
          Order: 1,
          Template: {
            Content:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/hot/template.jsonc",
            Parameters:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/hot/parameters.jsonc",
          },
          Data: {
            Branch: "main",
            CloudLookup: cloudLookup,
            Location: resGroupLocation,
            Name: resGroupLookup,
            RepositoryURL:
              "https://github.com/fathym-deno/iot-ensemble-device-data",
            ResourceLookup: `${resLookup}-hot`,
            ShortName: shortName,
          },
          Outputs: {},
        } as EaCCloudResourceFormatDetails,
      };
    }

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          ResourceGroups: {
            [resGroupLookup]: {
              Resources: {
                [resLookup]: {
                  Details: {
                    Type: "Format",
                    Name: "IoT Infrastructure",
                    Description:
                      "The IoT Infrastructure to use for the enterprise.",
                    Order: 1,
                    Template: {
                      Content:
                        "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/template.jsonc",
                      Parameters:
                        "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/parameters.jsonc",
                    },
                    Data: {
                      CloudLookup: cloudLookup,
                      Location: resGroupLocation,
                      Name: resGroupLookup,
                      PrincipalID: "", // TODO: Pass in actual principal ID (maybe retrievable from MSAL account record? I think can just be the email?)
                      ResourceLookup: resLookup,
                      ServicePrincipalID: servicePrincipalId,
                      ShortName: shortName,
                    },
                    Outputs: {},
                  } as EaCCloudResourceFormatDetails,
                  Resources: iotResources,
                },
              },
            },
          },
        },
      },
      DevOpsActions: {},
      Secrets: {},
      SourceConnections: {},
      Sources: {},
    };

    if (storageFlowHot) {
      const gitHubOrg = formData.get("gitHubOrg") as string;

      const gitHubRepo = formData.get("gitHubRepo") as string;

      const gitHubUsername = ctx.state.GitHub?.Username;

      const secretLookup = `${shortName}-iot-devices-flow-publish-profile`;

      eac.Secrets![secretLookup] = {
        Details: {
          Value:
            `$connections:$.eac.Clouds['${cloudLookup}'].ResourceGroups['${resGroupLookup}'].Resources['${resLookup}'].Resources['${resLookup}-hot'].Profiles['Microsoft.Web/sites/${shortName}-iot-devices-flow']['_']`,
        },
        CloudLookup: cloudLookup,
        KeyVaultLookup: `${shortName}-key-vault`,
      };

      const doaLookup = "azure-function-deploy-nodejs";
      eac.DevOpsActions![doaLookup] = {
        Details: {
          Name: "Azure Function Deploy - NodeJS",
          Description:
            "Automated deployments of NodeJS Azure Functions to Azure Web Apps",
          Path: "build-and-deploy.yml",
          Templates: [
            "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/github/nodejs/.hbs._header.yml",
            "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/github/nodejs/azure-function-deploy.yml",
          ],
        },
      };

      const iotDeviceFlowArtifactLookup = "iot-ensemble-device-flow";

      eac.Sources![`template|GITHUB://fathym-deno/iot-ensemble-device-flow`] = {
        Details: {
          Type: "GITHUB",
          Branches: ["main", "integration"],
          MainBranch: "integration",
          Name: "IoT Ensemble Device Flow",
          Description: "A hot flow to SignalR for device telemetry",
          Organization: gitHubOrg,
          Repository: gitHubRepo,
          Username: gitHubUsername,
        },
        SecretLookups: {
          AZURE_FUNCTIONAPP_PUBLISH_PROFILE: secretLookup,
        },
        Artifacts: {
          [iotDeviceFlowArtifactLookup]: {
            Details: {
              Name: "IoT Ensemble Device Flow",
              Description:
                "Build & deployment configuration for the IoT Ensemble Device Flow",
              FunctionAppName: `${shortName}-iot-devices-flow`,
              // Branches: 'main',
              // PackagePath: '.',
              // NodeVersion: '18.x',
            },
            DevOpsActionTriggerLookup: doaLookup,
          },
        },
      };
    }

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
        `/commit/${commitResp.CommitID}/status?successRedirect=/&errorRedirect=/cloud`,
      );
    } else {
      return redirectRequest(
        `/cloud?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${commitResp.CommitID}`,
      );
    }
  },
};

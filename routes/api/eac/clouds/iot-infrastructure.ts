// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { redirectRequest } from "@fathym/common";
import {
  EaCCloudResourceAsCode,
  EaCCloudResourceFormatDetails,
  EaCStatusProcessingTypes,
  waitForStatus,
} from "@fathym/eac";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { eacSvc } from "../../../../services/eac.ts";

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

    // if (storageFlowCold) {
    //   iotResources[`${resLookup}-cold`] = {
    //     Type: "Format",
    //     Details: {
    //       Name: "IoT Infrastructure - Cold Flow",
    //       Description:
    //         "The cold flow IoT Infrastructure to use for the enterprise.",
    //       Order: 1,
    //       Template: {
    //         Content: "",
    //         Parameters: "",
    //       },
    //       Data: {},
    //       Outputs: {},
    //     } as EaCCloudResourceFormatDetails,
    //   };
    // }

    if (storageFlowWarm) {
      iotResources[`${resLookup}-warm`] = {
        Type: "Format",
        Details: {
          Name: "IoT Infrastructure - Warm Flow",
          Description:
            "The warm flow IoT Infrastructure to use for the enterprise.",
          Order: 1,
          Template: {
            Content:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/warm/template.jsonc",
            Parameters:
              "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/warm/parameters.jsonc",
          },
          Data: {
            CloudLookup: cloudLookup,
            Location: resGroupLocation,
            Name: resGroupLookup,
            PrincipalID: "", // TODO: Pass in user email (email used to login to OpenBiotech must match one used for Azure)
            ResourceLookup: resLookup,
            ShortName: shortName,
          },
          Outputs: {},
        } as EaCCloudResourceFormatDetails,
      };
    }

    // if (storageFlowHot) {
    //   iotResources[`${resLookup}-hot`] = {
    //     Type: "Format",
    //     Details: {
    //       Name: "IoT Infrastructure - Hot Flow",
    //       Description:
    //         "The hot flow IoT Infrastructure to use for the enterprise.",
    //       Order: 1,
    //       Template: {
    //         Content: "",
    //         Parameters: "",
    //       },
    //       Data: {},
    //       Outputs: {},
    //     } as EaCCloudResourceFormatDetails,
    //   };
    // }

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          ResourceGroups: {
            [resGroupLookup]: {
              Resources: {
                [resLookup]: {
                  Type: "Format",
                  Details: {
                    Name: "IoT Infrastructure",
                    Description:
                      "The IoT Infrastructure to use for the enterprise.",
                    Order: 1,
                    Template: {
                      Content:
                        "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/template.jsonc",
                      Parameters:
                        "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/azure/iot/ref-arch/parameters.jsonc",
                    },
                    Data: {
                      CloudLookup: cloudLookup,
                      Location: resGroupLocation,
                      Name: resGroupLookup,
                      PrincipalID: "", // TODO: Pass in actual principal ID (maybe retrievable from MSAL account record?)
                      ResourceLookup: resLookup,
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
    };

    const commitResp = await eacSvc.Commit<OpenBiotechEaC>(eac, 60 * 30);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest("/cloud");
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

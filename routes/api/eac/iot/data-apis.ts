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
import { loadEaCSvc } from "../../../../configs/eac.ts";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = formData.get("cloudLookup") as string;

    const resGroupLookup = formData.get("resGroupLookup") as string;

    const resLookup = (formData.get("resLookup") as string) || "data-apis";

    const resGroupLocation =
      ctx.state.EaC!.Clouds![cloudLookup].ResourceGroups![resGroupLookup]
        .Details!.Location;

    const orgName = ctx.state.EaC!.Details!.Name;

    // const storageFlowHot = !!(formData.get("storageFlowHot") as string);

    const shortName = resGroupLookup
      .split("-")
      .map((p) => p.charAt(0))
      .join("");

    const iotResources: {
      [key: string]: EaCCloudResourceAsCode;
    } = {};

    const eac: OpenBiotechEaC = {
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          ResourceGroups: {
            [resGroupLookup]: {
              Resources: {
                "iot-flow": {
                  Resources: {
                    [resLookup]: {
                      Details: {
                        Type: "Format",
                        Name: "Data APIs",
                        Description: "The Data APIs to use for the enterprise.",
                        Order: 1,
                        Template: {
                          Content:
                            "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/api/template.jsonc",
                          Parameters:
                            "https://raw.githubusercontent.com/lowcodeunit/infrastructure/master/templates/o-biotech/iot/ref-arch/api/parameters.jsonc",
                        },
                        Data: {
                          CloudLookup: cloudLookup,
                          Location: resGroupLocation,
                          Name: resGroupLookup,
                          OrganizationName: orgName,
                          PrincipalID: ctx.state.Username,
                          ResourceLookup: resLookup,
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
        },
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

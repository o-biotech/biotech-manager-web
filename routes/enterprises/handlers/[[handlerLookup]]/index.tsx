import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DisplayStyleTypes,
  EaCManageHandlerForm,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import CreateEaCHero from "../../../../components/organisms/heros/CreateEaCHero.tsx";
import {
  EaCHandler,
  EaCStatusProcessingTypes,
  EverythingAsCode,
  waitForStatus,
} from "@fathym/eac";
import { denoKv } from "../../../../configs/deno-kv.config.ts";
import { loadEaCSvc } from "../../../../configs/eac.ts";
import { OpenBiotechEaC } from "../../../../src/eac/OpenBiotechEaC.ts";
import { DeleteAction } from "../../../../islands/molecules/DeleteAction.tsx";

export type EaCHandlersPageData = {
  entLookup: string;

  manageHandler?: EaCHandler;

  manageHandlerLookup?: string;
};

export const handler: Handlers<EaCHandlersPageData, OpenBiotechManagerState> = {
  GET(_, ctx) {
    const manageHandlerLookup: string = ctx.params.handlerLookup;

    let manageHandler: EaCHandler | undefined = undefined;

    if (manageHandlerLookup) {
      manageHandler = ctx.state.EaC!.Handlers![manageHandlerLookup]!;

      if (!manageHandler) {
        return redirectRequest("/enterprises/handlers");
      }
    }

    const data: EaCHandlersPageData = {
      entLookup: ctx.state.EaC!.EnterpriseLookup!,
      manageHandler: manageHandler,
      manageHandlerLookup: manageHandlerLookup,
    };

    return ctx.render(data);
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const handlerLookup = formData.get("handlerLookup") as string;

    const saveEaC: OpenBiotechEaC = {
      EnterpriseLookup: formData.get("entLookup") as string,
      Handlers: {
        [handlerLookup]: {
          APIPath: formData.get("apiPath") as string,
          Order: Number.parseInt(formData.get("order") as string),
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
      return redirectRequest("/enterprises/handlers");
    } else {
      return redirectRequest(
        `/enterprises/handlers?error=${
          encodeURIComponent(
            status.Messages["Error"] as string,
          )
        }&commitId=${commitResp.CommitID}`,
      );
    }
  },

  async DELETE(req, ctx) {
    const handlerLookup = ctx.params.handlerLookup;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const deleteResp = await eacSvc.Delete(
      {
        EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup,
        Handlers: {
          [handlerLookup]: null,
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

export default function EaCHandlers({
  data,
}: PageProps<EaCHandlersPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Manage EaC Handler"
        callToAction="Work with your EaC Handlers to control how your EaC is managed."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <EaCManageHandlerForm
        entLookup={data.entLookup}
        handlerLookup={data.manageHandlerLookup}
        handlerApiPath={data.manageHandler?.APIPath}
        handlerOrder={data.manageHandler?.Order}
      />

      {data.manageHandlerLookup && (
        <div class="max-w-sm mx-auto mb-4">
          <DeleteAction
            message={`Are you sure you want to delete EaC Handler '${data.manageHandlerLookup}?`}
          >
            Delete EaC Handler
          </DeleteAction>
        </div>
      )}
    </>
  );
}

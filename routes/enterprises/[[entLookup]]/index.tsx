import { Handlers, PageProps } from "$fresh/server.ts";
import { EaCManageForm } from "@fathym/atomic";
import { redirectRequest, respond } from "@fathym/common";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";
import CreateEaCHero from "../../../components/organisms/heros/CreateEaCHero.tsx";
import {
  EaCStatusProcessingTypes,
  EverythingAsCode,
  UserEaCRecord,
  waitForStatus,
} from "@fathym/eac";
import { denoKv } from "../../../configs/deno-kv.config.ts";
import { EntepriseManagementItem } from "../../../islands/molecules/EntepriseManagementItem.tsx";
import { loadEaCSvc } from "../../../configs/eac.ts";
import { OpenBiotechEaC } from "../../../src/eac/OpenBiotechEaC.ts";

export type EnterprisesPageData = {
  currentEaC?: OpenBiotechEaC;

  enterprises: UserEaCRecord[];

  manageEaC?: OpenBiotechEaC;
};

export const handler: Handlers<EnterprisesPageData, OpenBiotechManagerState> = {
  async GET(_, ctx) {
    const manageEaCLookup: string = ctx.params.entLookup;

    let manageEaC: OpenBiotechEaC | undefined = undefined;

    if (manageEaCLookup) {
      const parentEaCSvc = await loadEaCSvc();

      const jwtResp = await parentEaCSvc.JWT(
        manageEaCLookup,
        ctx.state.Username,
      );

      const eacSvc = await loadEaCSvc(jwtResp.Token);

      manageEaC = await eacSvc.Get(manageEaCLookup);

      if (!manageEaC?.EnterpriseLookup) {
        return redirectRequest("/enterprises");
      }
    }

    const data: EnterprisesPageData = {
      currentEaC: ctx.state.EaC,
      enterprises: [],
      manageEaC: manageEaC,
    };

    data.enterprises = ctx.state.UserEaCs!;

    return ctx.render(data);
  },

  async PUT(req, ctx) {
    const eac: EverythingAsCode = await req.json();

    await denoKv.set(
      ["User", ctx.state.Username!, "Current", "EaC"],
      eac.EnterpriseLookup,
    );

    return respond({ Processing: EaCStatusProcessingTypes.COMPLETE });
  },

  async DELETE(req, ctx) {
    const eac: EverythingAsCode = await req.json();

    const parentEaCSvc = await loadEaCSvc();

    const username = ctx.state.Username;

    const jwt = await parentEaCSvc.JWT(eac.EnterpriseLookup, username);

    const eacSvc = await loadEaCSvc(jwt.Token);

    const deleteResp = await eacSvc.Delete(eac, true, 60);

    const status = await waitForStatus(
      eacSvc,
      eac.EnterpriseLookup!,
      deleteResp.CommitID,
    );

    const currentEaC = await denoKv.get<string>([
      "User",
      ctx.state.Username,
      "Current",
      "EaC",
    ]);

    if (currentEaC.value === eac.EnterpriseLookup && ctx.state.UserEaCs) {
      const nextCurrentEaC = ctx.state.UserEaCs.find(
        (ue) => ue.EnterpriseLookup !== eac.EnterpriseLookup,
      );

      if (nextCurrentEaC) {
        await denoKv.set(
          ["User", ctx.state.Username, "Current", "EaC"],
          nextCurrentEaC.EnterpriseLookup!,
        );
      }
    }

    return respond(status);
  },
};

export default function Enterprises({
  data,
}: PageProps<EnterprisesPageData, OpenBiotechManagerState>) {
  return (
    <>
      <CreateEaCHero />

      <EaCManageForm
        entLookup={data.manageEaC?.EnterpriseLookup}
        entName={data.manageEaC?.Details?.Name || undefined}
        entDescription={data.manageEaC?.Details?.Description || undefined}
      />

      <div class="max-w-sm m-auto">
        <div class="border-b-[1px] border-dotted border-slate-400 dark:border-slate-700">
        </div>

        {data.enterprises &&
          data.enterprises.map((enterprise) => {
            return !data.manageEaC ||
                data.manageEaC.EnterpriseLookup ===
                  enterprise.EnterpriseLookup
              ? (
                <EntepriseManagementItem
                  active={data.currentEaC?.EnterpriseLookup ===
                    enterprise.EnterpriseLookup}
                  enterprise={enterprise}
                />
              )
              : undefined;
          })}
      </div>
    </>
  );
}

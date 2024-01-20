import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { EaCCreateForm } from "@fathym/atomic";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import CreateEaCHero from "../components/organisms/heros/CreateEaCHero.tsx";
import {
  EaCStatusProcessingTypes,
  EverythingAsCode,
  UserEaCRecord,
} from "@fathym/eac";
import { denoKv } from "../configs/deno-kv.config.ts";
import { respond } from "@fathym/common";
import { EntepriseManagementItem } from "../islands/molecules/EntepriseManagementItem.tsx";

export type EnterprisesPageData = {
  enterprises: UserEaCRecord[];
};

export const handler: Handlers<EnterprisesPageData, OpenBiotechManagerState> = {
  GET(_, ctx) {
    const data: EnterprisesPageData = {
      enterprises: [],
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
};

export default function Home({
  data,
}: PageProps<EnterprisesPageData, OpenBiotechManagerState>) {
  //  TODO: List of EaCs view for changing enterprise and more management

  return (
    <>
      <CreateEaCHero />

      <EaCCreateForm />

      <div>
        {data.enterprises &&
          data.enterprises.map((enterprise) => {
            return <EntepriseManagementItem enterprise={enterprise} />;
          })}
      </div>
    </>
  );
}

import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { EaCCreateForm } from "@fathym/atomic";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import CreateEaCHero from "../components/organisms/heros/CreateEaCHero.tsx";
import { UserEaCRecord } from "@fathym/eac";
import { loadEaCSvc } from "../configs/eac.ts";

export type EnterprisesPageData = {
  enterprises: UserEaCRecord[];
};

export const handler: Handlers<EnterprisesPageData, OpenBiotechManagerState> = {
  async GET(_, ctx) {
    const data: EnterprisesPageData = {
      enterprises: [],
    };

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    data.enterprises = await eacSvc.ListForUser();

    return ctx.render(data);
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
        <pre>{JSON.stringify(data.enterprises)}</pre>
      </div>
    </>
  );
}

import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import CreateEaCHero from "../components/organisms/heros/CreateEaCHero.tsx";
import { EaCCreateForm } from "../components/organisms/eac/create.form.tsx";

export type EnterprisesPageData = {};

export const handler: Handlers<
  EnterprisesPageData | null,
  OpenBiotechManagerState
> = {
  GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: EnterprisesPageData = {};

    return ctx.render(data);
  },
};

export default function Home(
  _props: PageProps<EnterprisesPageData | null, OpenBiotechManagerState>,
) {
  //  TODO: List of EaCs view for changing enterprise and more management

  return (
    <>
      <CreateEaCHero />

      <EaCCreateForm />
    </>
  );
}

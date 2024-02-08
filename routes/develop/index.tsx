import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import {
  Display,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { loadJwtConfig } from "@fathym/eac";
import { APIDevelopForm } from "../../islands/organisms/data/api-develop-form.tsx";

interface DevelopPageData {
  jwt: string;
}

export const handler: Handlers<
  DevelopPageData | null,
  OpenBiotechManagerState
> = {
  async GET(_, ctx) {
    const jwt = await loadJwtConfig().Create({
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
      CloudLookup: ctx.state.Cloud.CloudLookup!,
      ResourceGroupLookup: ctx.state.Cloud.ResourceGroupLookup!,
      Username: ctx.state.Username,
    });

    const data: DevelopPageData = {
      jwt: jwt,
    };

    return ctx.render(data);
  },
};

export default function Develop({
  data,
  state,
}: PageProps<DevelopPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Develop IoT Solutions"
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <div class="flex flex-col md:flex-row gap-4 my-8 mx-4">
        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Cold Storage APIs</h2>
        </Display>

        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Warm Storage APIs</h2>

          <APIDevelopForm jwt={data.jwt} />
        </Display>

        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Hot Storage APIs</h2>
        </Display>
      </div>
    </>
  );
}

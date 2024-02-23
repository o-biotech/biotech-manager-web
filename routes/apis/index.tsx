import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import {
  Action,
  Display,
  DisplayStyleTypes,
  Hero,
  HeroStyleTypes,
} from "@fathym/atomic";
import { loadJwtConfig } from "@fathym/eac";
import { APIDevelopForm } from "../../islands/organisms/data/api-develop-form.tsx";

interface APIsPageData {
  jwt: string;
}

export const handler: Handlers<APIsPageData | null, OpenBiotechManagerState> = {
  async GET(_, ctx) {
    const jwt = await loadJwtConfig().Create({
      EnterpriseLookup: ctx.state.EaC!.EnterpriseLookup!,
      CloudLookup: ctx.state.Cloud.CloudLookup!,
      ResourceGroupLookup: ctx.state.Cloud.ResourceGroupLookup!,
      Username: ctx.state.Username,
    });

    const data: APIsPageData = {
      jwt: jwt,
    };

    return ctx.render(data);
  },
};

export default function APIs({
  data,
  state,
}: PageProps<APIsPageData, OpenBiotechManagerState>) {
  return (
    <>
      <Hero
        title="Develop IoT Solutions"
        class="[&_*]:mx-auto [&>*>*]:w-full bg-[#000028] text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      >
      </Hero>

      <div class="flex flex-col md:flex-row gap-4 my-8 mx-4">
        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Cold Storage APIs</h2>

          <APIDevelopForm apiPath="/api/data/cold/execute" jwt={data.jwt} />

          <div class="w-full mb-8 px-8">
            <p>
              Try this API out for downloading your cold storage data in csv
              format.
            </p>

            <Action
              class="mt-2 text-center"
              href="/api/data/cold/execute?resultType=true&download=true"
              target="blank"
            >
              Download Last 7 Days of Data
            </Action>
          </div>
        </Display>

        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Warm Storage APIs</h2>

          <APIDevelopForm apiPath="/api/data/warm/explorer" jwt={data.jwt} />

          <div class="w-full mb-8 px-8">
            <p>
              See this API in action on your main dashboard, on the 'Payloads'
              tab.
            </p>

            <Action class="mt-2 text-center" href="/">
              Dashboard
            </Action>
          </div>
        </Display>

        <Display class="flex-1 p-2 bg-slate-50 dark:bg-slate-800 shadow-slate-500 dark:shadow-black">
          <h2 class="text-xl">Hot Storage APIs</h2>

          <p>
            In order to connec to this API, use the following and connect with a
            SignalR client, in any language.
          </p>

          <APIDevelopForm apiPath="/api/data/hot/connect" jwt={data.jwt} />

          <div class="w-full mb-8 px-8">
            <p>
              See this API in action on your main dashboard, on the 'Streaming'
              tab.
            </p>

            <Action class="mt-2 text-center" href="/?tab=streaming">
              Dashboard
            </Action>
          </div>
        </Display>
      </div>
    </>
  );
}

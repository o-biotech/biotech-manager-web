import { Handlers, PageProps } from "$fresh/server.ts";
import { DisplayStyleTypes, Hero, HeroStyleTypes } from "@fathym/atomic";
import { DataStepsFeatures } from "../../components/organisms/features/DataStepsFeatures.tsx";
import { DataPhaseTypes } from "../../src/DataPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";

interface DataPageData {
  dataPhase: DataPhaseTypes;
}

export const handler: Handlers<DataPageData | null, OpenBiotechManagerState> = {
  GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    if (ctx.state.SetupPhase < 2) {
      const headers = new Headers();

      headers.set("location", "/");

      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }

    const data: DataPageData = {
      dataPhase: DataPhaseTypes.Cold,
    };

    return ctx.render(data);
  },
};

export default function Devices(
  { data }: PageProps<DataPageData | null, OpenBiotechManagerState>,
) {
  return (
    <div>
      <Hero
        title="Data, APIs, and Dashboards"
        callToAction="Get eyes on your data, share with downstream analytics and ML services, all with turnkey dashboarding capabilities."
        class="[&_*]:mx-auto [&>*>*]:w-full bg-hero-pattern text-center"
        heroStyle={HeroStyleTypes.None}
        displayStyle={DisplayStyleTypes.Center | DisplayStyleTypes.Large}
      />

      <DataStepsFeatures dataPhase={data!.dataPhase} />
    </div>
  );
}

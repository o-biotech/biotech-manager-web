import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import CreateApplicationsHero from "../components/organisms/heros/CreateApplicationsHero.tsx";
import BiotechStepsFeatures from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { SetupPhaseTypes } from "../components/SetupPhaseTypes.tsx";

interface HomePageData {
  setupPhase: SetupPhaseTypes;
}

export const handler: Handlers<HomePageData | null> = {
  async GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: HomePageData = {
      setupPhase: SetupPhaseTypes.Cloud,
    };

    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<HomePageData | null>) {
  let currentHero: JSX.Element | undefined = undefined;

  switch (data!.setupPhase) {
    case SetupPhaseTypes.Cloud:
      currentHero = <CloudConnectHero />;
      break;

    case SetupPhaseTypes.Device:
      currentHero = <ConnectDevicesHero />;
      break;

    case SetupPhaseTypes.Application:
      currentHero = <CreateApplicationsHero />;
      break;

    case SetupPhaseTypes.Complete:
      break;
  }

  return (
    <>
      {currentHero}

      <BiotechStepsFeatures
        setupPhase={data!.setupPhase}
      />

      <div>
        {
          /* <YouTubePlayer
          width={640}
          height={390}
          videoId={"r9jwGansp1E"}
          playerVars={{ mute: 1 }}
          // playerHandler={playerHandler}
          // onPlayerReady={onPlayerReady}
        /> */
        }
      </div>
    </>
  );
}

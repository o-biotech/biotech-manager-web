import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import CreateApplicationsHero from "../components/organisms/heros/CreateApplicationsHero.tsx";
import BiotechStepsFeatures from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { JSX } from "preact";

interface HomePageData {
  setupPhase: SetupPhaseTypes;
}

enum SetupPhaseTypes {
  Cloud = 0,
  Device = 1,
  Application = 2,
  Complete = 3,
}

export const handler: Handlers<HomePageData | null> = {
  async GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: HomePageData = {
      setupPhase: SetupPhaseTypes.Complete,
    };

    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<HomePageData | null>) {
  let currentHero: JSX.Element | undefined = undefined;

  let actionPath: string | undefined = undefined;

  let actionText: string | undefined = undefined;

  let showCallToAction = true;

  switch (data!.setupPhase) {
    case SetupPhaseTypes.Cloud:
      currentHero = <CloudConnectHero />;

      actionPath = "./cloud/connect";

      actionText = "Connect Now";
      break;

    case SetupPhaseTypes.Device:
      currentHero = <ConnectDevicesHero />;

      actionPath = "./devices/flows";

      actionText = "Connect Devices";
      break;

    case SetupPhaseTypes.Application:
      currentHero = <CreateApplicationsHero />;

      actionPath = "./applications";

      actionText = "Create Application";
      break;

    case SetupPhaseTypes.Complete:
      showCallToAction = false;
      break;
  }

  return (
    <>
      {currentHero}

      <BiotechStepsFeatures
        cloudComplete={data!.setupPhase !== SetupPhaseTypes.Cloud}
        devicesComplete={data!.setupPhase !== SetupPhaseTypes.Cloud &&
          data!.setupPhase !== SetupPhaseTypes.Device}
        applicationsComplete={data!.setupPhase === SetupPhaseTypes.Complete}
        callToActionText={actionText || ""}
        callToActionHref={actionPath || "./"}
        showCallToAction={showCallToAction}
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

import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import CreateApplicationsHero from "../components/organisms/heros/CreateApplicationsHero.tsx";
import BiotechStepsFeatures from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { SetupPhaseTypes } from "../components/SetupPhaseTypes.tsx";
import { IoTDisplay } from "@fathym/atomic-iot";
import { DeviceIcon } from "$fathym/atomic-icons";
import InteractiveSlideToggle from "../islands/atoms/InteractiveSlideToggle.tsx";

interface HomePageData {
  setupPhase: SetupPhaseTypes;
}

export const handler: Handlers<HomePageData | null> = {
  GET(_, ctx) {
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

// interface TestState extends StateFlow {
//   FirstName: string;

//   get FullName(): string;

//   LastName: string;
// }

// class TestStateFlowContextService extends StateFlowContextService<TestState> {
//   constructor(initState: TestState) {
//     super(initState);
//   }

//   public ChangeName(first: string, last: string): void {
//     this.$Draft((draft) => {
//       draft.FirstName = first;

//       draft.LastName = last;
//     });
//   }
// }

export default function Home({ data }: PageProps<HomePageData | null>) {
  // const OpenBiotechAppStateFlowContext =
  //   new OpenBiotechAppStateFlowContextService({
  //     FirstName: "",
  //     LastName: "",
  //     get FullName(): string {
  //       return `${OpenBiotechAppStateFlowContext.State.FirstName} ${OpenBiotechAppStateFlowContext.State.LastName}`;
  //     },
  //   });

  // const testCtxt = new TestStateFlowContextService({
  //   FirstName: "",
  //   LastName: "",
  //   get FullName(): string {
  //     return `${testCtxt.State.FirstName} ${testCtxt.State.LastName}`;
  //   },
  // });

  let currentHero: JSX.Element | undefined = undefined;

  switch (data!.setupPhase) {
    case SetupPhaseTypes.Cloud:
      currentHero = <CloudConnectHero />;
      break;

    case SetupPhaseTypes.Devices:
      currentHero = <ConnectDevicesHero />;
      break;

    case SetupPhaseTypes.Applications:
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

      <IoTDisplay
        title={<h2 class="text-2xl font-bold">Emulated Devices</h2>}
        icon={<DeviceIcon class="ml-4 mr-2 w-[36px] h-[36px] text-blue-500" />}
        controls={
          <>
            <InteractiveSlideToggle checked={true} />
          </>
        }
      >
        <p>
          To see the dashboard in action without connecting a device, enable the
          emulated device data. When enabled, emulated data will be provided in
          your data queries. The emulated device we are showing here is for
          smart room detection and provides data on the temperature, humidity
          and occupancy of a room.
        </p>
      </IoTDisplay>

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

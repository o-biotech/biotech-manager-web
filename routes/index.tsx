import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import CreateApplicationsHero from "../components/organisms/heros/CreateApplicationsHero.tsx";
import BiotechStepsFeatures from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { SetupPhaseTypes } from "../components/SetupPhaseTypes.tsx";
import { IoTDisplay } from "@fathym/atomic-iot";
import {
  ConnectedDevicesIcon,
  DeviceTelemetryIcon,
  EmulatedDeviceIcon,
} from "$fathym/atomic-icons";
import InteractiveSlideToggle from "../islands/atoms/InteractiveSlideToggle.tsx";
import { Action, Input } from "@fathym/atomic";
import snakeCase from "https://deno.land/x/case@2.1.1/snakeCase.ts";
import EmulatedDevices from "../components/organisms/devices/EmulatedDevices.tsx";
import ConnectedDevices from "../components/organisms/devices/ConnectedDevices.tsx";
import DevicesTelemetry from "../components/organisms/devices/DevicesTelemetry.tsx";

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

      <div class="p-2 md:p-4">
        <EmulatedDevices class="mb-8 md:mb-16" />

        <div class="flex flex-col md:flex-row mt-2 gap-8 md:gap-16">
          <ConnectedDevices class="w-full md:w-1/3" />

          <DevicesTelemetry class="w-full md:w-2/3" />
        </div>
      </div>

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

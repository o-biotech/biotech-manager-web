import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import CreateApplicationsHero from "../components/organisms/heros/CreateApplicationsHero.tsx";
import BiotechStepsFeatures from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { SetupPhaseTypes } from "../components/SetupPhaseTypes.tsx";
import { Icon } from "$atomic/icons";
import { CheckCircleIcon, ExclaimIcon, XCircleIcon } from "$atomic/mycons";
// import {
//   StateFlow,
//   StateFlowContextService,
// } from "$atomic/state-flow/StateFlowContext.tsx";

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

      <div>
        {
          /* {deep.FirstName} <br />
        {deep.LastName} <br />
        {deep.FullName} <br /> */
        }

        {
          /* <Action
          onClick={() =>
            OpenBiotechAppStateFlowContext.ChangeName("Micheal", "Gearhardt")}
        >
          Michael Gearhardt
        </Action>

        <Action
          onClick={() =>
            OpenBiotechAppStateFlowContext.ChangeName("Pete", "Sanchez")}
        >
          Pete Sanchez
        </Action> */
        }
      </div>
      {
        /* <Action>
        Michael Gearhardt
      </Action> */
      }

      <Icon
        src="./iconset/icons"
        icon="x-circle"
        class="text-blue-500 w-[50px] h-[50px]"
      />

      <XCircleIcon class="text-purple-500 w-[50px] h-[50px]" />

      <Icon
        src="./iconset/icons"
        icon="check-circle"
        class="text-blue-500 w-[50px] h-[50px]"
      />

      <CheckCircleIcon class="text-purple-500 w-[50px] h-[50px]" />

      <Icon
        src="./iconset/icons"
        icon="exclaim"
        class="text-blue-500 w-[50px] h-[50px]"
      />

      <ExclaimIcon class="text-purple-500 w-[50px] h-[50px]" />

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

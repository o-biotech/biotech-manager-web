import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { EaCCreateForm } from "@fathym/atomic";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import SetupDataHero from "../components/organisms/heros/SetupDataHero.tsx";
import CreateApplicationsHero from "../components/organisms/heros/CreateApplicationsHero.tsx";
import { BiotechStepsFeatures } from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { BiotechDashboard } from "../components/organisms/BiotechDashboard.tsx";
import { redirectRequest } from "@fathym/common";
import { OpenBiotechEaC } from "../src/eac/OpenBiotechEaC.ts";
import { eacSvc } from "../services/eac.ts";
import CreateEaCHero from "../components/organisms/heros/CreateEaCHero.tsx";
import { EaCStatus, EaCStatusProcessingTypes, sleep } from "@fathym/eac";

interface HomePageData {
  setupPhase: SetupPhaseTypes;
}

export const handler: Handlers<HomePageData | null, OpenBiotechManagerState> = {
  GET(_, ctx) {
    // const {} = ctx.params;

    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }

    const data: HomePageData = {
      setupPhase: ctx.state.Phase,
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

export default function Home({
  data,
  state,
}: PageProps<HomePageData | null, OpenBiotechManagerState>) {
  let currentHero: JSX.Element | undefined = undefined;

  let initialSteps: JSX.Element | undefined = undefined;

  if (!state.EaC) {
    currentHero = <CreateEaCHero isFirst={state.UserEaCs!.length > 0} />;

    initialSteps = <EaCCreateForm />;
  } else {
    initialSteps = <BiotechStepsFeatures setupPhase={data!.setupPhase} />;

    switch (data!.setupPhase) {
      case SetupPhaseTypes.Cloud:
        currentHero = <CloudConnectHero />;
        break;

      case SetupPhaseTypes.Devices:
        currentHero = <ConnectDevicesHero />;
        break;

      case SetupPhaseTypes.Data:
        currentHero = <SetupDataHero />;
        break;

      case SetupPhaseTypes.Applications:
        currentHero = <CreateApplicationsHero />;
        break;

      case SetupPhaseTypes.Complete:
        break;
    }
  }

  return (
    <>
      {currentHero}

      {initialSteps}

      {state.Phase > 1 ? <BiotechDashboard /> : <></>}
    </>
  );
}

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
import CreateEaCHero from "../components/organisms/heros/CreateEaCHero.tsx";

interface HomePageData {
  setupPhase: SetupPhaseTypes;
}

export const handler: Handlers<HomePageData | null, OpenBiotechManagerState> = {
  GET(_, ctx) {
    const data: HomePageData = {
      setupPhase: ctx.state.Phase,
    };

    return ctx.render(data);
  },
};

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

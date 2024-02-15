import { JSX } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { EaCManageForm } from "@fathym/atomic";
import CloudConnectHero from "../components/organisms/heros/CloudConnectHero.tsx";
import ConnectDevicesHero from "../components/organisms/heros/ConnectDevicesHero.tsx";
import SetupDataHero from "../components/organisms/heros/SetupDataHero.tsx";
import { BiotechStepsFeatures } from "../components/organisms/features/BiotechStepsFeatures.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { BiotechDashboard } from "../components/organisms/BiotechDashboard.tsx";
import CreateEaCHero from "../components/organisms/heros/CreateEaCHero.tsx";
import { EaCDeviceAsCode, EaCIoTAsCode, loadJwtConfig } from "@fathym/eac";

interface HomePageData {
  devices?: Record<string, EaCDeviceAsCode>;

  jwt?: string;

  setupPhase: SetupPhaseTypes;
}

export const handler: Handlers<HomePageData | null, OpenBiotechManagerState> = {
  GET(_, ctx) {
    const data: HomePageData = {
      devices: ctx.state.EaC?.IoT
        ? ctx.state.EaC.IoT!["iot-flow"]!.Devices!
        : undefined,
      jwt: ctx.state.Devices?.JWT,
      setupPhase: ctx.state.Phase,
    };

    return ctx.render(data);
  },
};

export default function Home({
  data,
  state,
}: PageProps<HomePageData, OpenBiotechManagerState>) {
  let currentHero: JSX.Element | undefined = undefined;

  let initialSteps: JSX.Element | undefined = undefined;

  if (!state.EaC) {
    currentHero = <CreateEaCHero isFirst={state.UserEaCs!.length > 0} />;

    initialSteps = <EaCManageForm />;
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

      case SetupPhaseTypes.Complete:
        currentHero = (
          <>
            <div class="flex flex-col md:flex-row items-start md:items-center divide-y-4 md:divide-x-4 md:divide-y-0 divide-[#4a918e]">
              <div class="flex-none md:w-100 px-5 py-10 mx-5 md:py-10 md:px-20 md:my-10 text-2xl md:text-3xl">
                <h1 class="text-[#4a918e]">Welcome to</h1>

                <h1 class="">Open Biotech</h1>
              </div>

              <div class="flex-1 px-5 py-10 mx-5 md:py-10 md:px-20 md:my-10">
                <h2 class="text-xl md:text-2xl text-[#4a918e]">
                  Device Data Dashboard
                </h2>

                <h3 class="md:text-lg">
                  Stream, view and query your device data.
                </h3>
              </div>
            </div>
          </>
        );
        break;
    }
  }

  return (
    <>
      {currentHero}

      {state.Phase < 3 && initialSteps}

      {state.Phase > 2
        ? <BiotechDashboard class="m-4" devices={data.devices} jwt={data.jwt} />
        : <></>}
    </>
  );
}

import { WithSession } from "$fresh/session";
import { CloudPhaseTypes } from "./CloudPhaseTypes.tsx";
import { SetupPhaseTypes } from "./SetupPhaseTypes.tsx";

export type OpenBiotechManagerState = {
  Cloud: OpenBiotechCloudState;

  Phase: SetupPhaseTypes;
} & WithSession;

export type OpenBiotechCloudState = {
  IsConnected: boolean;

  Phase: CloudPhaseTypes;
};

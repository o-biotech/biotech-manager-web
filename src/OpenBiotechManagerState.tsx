import { WithSession } from "$fresh/session";
import { UserEaCRecord } from "@fathym/eac";
import { CloudPhaseTypes } from "./CloudPhaseTypes.tsx";
import { SetupPhaseTypes } from "./SetupPhaseTypes.tsx";
import { OpenBiotechEaC } from "./eac/OpenBiotechEaC.ts";
import { DevicesPhaseTypes } from "./DevicesPhaseTypes.tsx";
import { DataPhaseTypes } from "./DataPhaseTypes.tsx";

export type OpenBiotechManagerState =
  & {
    Cloud: OpenBiotechCloudState;

    Data: OpenBiotechDataState;

    Devices: OpenBiotechDevicesState;

    EaC?: OpenBiotechEaC;

    GitHub?: OpenBiotechGitHubState;

    Phase: SetupPhaseTypes;

    UserEaCs?: UserEaCRecord[];

    Username: string;
  }
  & WithSession
  & Record<string, unknown>;

export type OpenBiotechCloudState = {
  IsConnected: boolean;

  CloudLookup?: string;

  Phase: CloudPhaseTypes;

  ResourceGroupLookup?: string;
};

export type OpenBiotechDevicesState = {
  IoTLookup?: string;

  JWT: string;

  Phase: DevicesPhaseTypes;
};

export type OpenBiotechDataState = {
  Phase: DataPhaseTypes;
};

export type OpenBiotechGitHubState = {
  Username: string;
};

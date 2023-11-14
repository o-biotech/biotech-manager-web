import { WithSession } from "$fresh/session";
import { UserEaCRecord } from "@fathym/eac";
import { CloudPhaseTypes } from "./CloudPhaseTypes.tsx";
import { SetupPhaseTypes } from "./SetupPhaseTypes.tsx";
import { OpenBiotechEaC } from "./eac/OpenBiotechEaC.ts";

export type OpenBiotechManagerState =
  & {
    Cloud: OpenBiotechCloudState;

    EaC?: OpenBiotechEaC;

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

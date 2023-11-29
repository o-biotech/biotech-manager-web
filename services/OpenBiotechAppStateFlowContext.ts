import {
  StateFlow,
  StateFlowContextService,
} from "$atomic/state-flow/StateFlowContext.tsx";
import { deepSignal } from "https://esm.sh/deepsignal@1.3.4";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";

export interface OpenBiotechAppStateFlow extends StateFlow {
  FirstName?: string;

  get FullName(): string;

  LastName?: string;

  SetupPhase?: SetupPhaseTypes;
}

export class OpenBiotechAppStateFlowContextService
  extends StateFlowContextService<OpenBiotechAppStateFlow> {
  constructor(initState: OpenBiotechAppStateFlow) {
    super(initState);
  }

  public ChangeName(first: string, last: string): void {
    this.$Draft((draft) => {
      draft.FirstName = first;

      draft.LastName = last;
    });
  }

  public SetSetupPhase(setupPhase: SetupPhaseTypes): void {
    this.$Draft((draft) => {
      draft.SetupPhase = setupPhase;
    });
  }
}

export const deep = deepSignal({
  FirstName: "",
  LastName: "",
  get FullName(): string {
    return `${deep.FirstName} ${deep.LastName}`;
  },
});

// export const OpenBiotechAppStateFlowContext = new OpenBiotechAppStateFlowContextService({
//     FirstName: "",
//     LastName: "",
//     get FullName(): string {
//       return `${OpenBiotechAppStateFlowContext.State.FirstName} ${OpenBiotechAppStateFlowContext.State.LastName}`;
//     },
// });

import { msalPluginConfig } from "../../../configs/msal.config.ts";
import { buildIsConnectedCheckMiddleware } from "@fathym/msal";
import { OpenBiotechManagerState } from "../../../src/OpenBiotechManagerState.tsx";

export const handler = [
  // buildIsConnectedCheckMiddleware<OpenBiotechManagerState>(
  //   msalPluginConfig,
  //   (ctx, err) => {
  //     ctx.state.Cloud.IsConnected = false;

  //     return Promise.resolve();
  //   },
  // ),
];

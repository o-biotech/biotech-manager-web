import * as ArmResource from "npm:@azure/arm-subscriptions";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../../src/OpenBiotechManagerState.tsx";
import { msalAuthProvider } from "../../configs/msal.config.ts";
import { AccessToken } from "npm:@azure/identity";

async function currentState(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  if (ctx.state.Cloud.IsConnected) {
    const subClient = new ArmResource.SubscriptionClient({
      getToken: async () => {
        const token = await msalAuthProvider.GetAccessToken(
          ctx.state.session,
        );

        return {
          token,
        } as AccessToken;
      },
    });

    const subsList = subClient.subscriptions.list();

    try {
      for await (const sub of subsList) {
        break;
      }
    } catch (err) {
      ctx.state.Cloud.IsConnected = false;
    }
  }

  return ctx.next();
}

export const handler = [
  currentState,
];

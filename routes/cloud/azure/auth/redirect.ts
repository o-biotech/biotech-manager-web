import { Handlers } from "$fresh/server.ts";
import { AuthorizationCodePayload } from "npm:@azure/msal-node";
import { msalAuthProvider } from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    return msalAuthProvider.HandleRedirect(
      ctx.state.session,
      await req.json(),
    );
  },
};

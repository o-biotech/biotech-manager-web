import { Handlers } from "$fresh/server.ts";
import {
  MSAL_POST_LOGOUT_REDIRECT_URI,
  msalAuthProvider,
} from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(_req, ctx) {
    return await msalAuthProvider.SignOut(ctx.state.session, {
      ClearSession: false,
      PostLogoutRedirectUri: MSAL_POST_LOGOUT_REDIRECT_URI,
    });
  },
};

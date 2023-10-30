import { Handlers } from "$fresh/server.ts";
import {
  MSAL_POST_LOGOUT_REDIRECT_URI,
  msalAuthProvider,
} from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  GET(_req, ctx) {
    return msalAuthProvider.SignOut(ctx.state.session, {
      PostLogoutRedirectUri: MSAL_POST_LOGOUT_REDIRECT_URI,
    });
  },
};

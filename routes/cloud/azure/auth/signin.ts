import { Handlers } from "$fresh/server.ts";
import {
  MSAL_REDIRECT_URI,
  msalAuthProvider,
} from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

export const handler: Handlers<any, OpenBiotechManagerState> = {
  GET(_req, ctx) {
    return msalAuthProvider.SignIn(ctx.state.session, {
      Scopes: [],
      RedirectURI: MSAL_REDIRECT_URI,
      SuccessRedirect: "/",
    });
  },
};

import { Handlers } from "$fresh/server.ts";
import {
  MSAL_REDIRECT_URI,
  msalAuthProvider,
} from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, OpenBiotechManagerState> = {
  GET(_req, ctx) {
    return msalAuthProvider.AcquireToken(ctx.state.session, {
      Scopes: ["User.Read"],
      RedirectURI: MSAL_REDIRECT_URI,
      SuccessRedirect: "/users/profile",
    });
  },
};

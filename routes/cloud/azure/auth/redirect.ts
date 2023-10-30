import { Handlers } from "$fresh/server.ts";
import { msalAuthProvider } from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, OpenBiotechManagerState> = {
  async GET(req, ctx) {
    return msalAuthProvider.HandleRedirect(
      ctx.state.session,
      await req.json(),
    );
  },
};

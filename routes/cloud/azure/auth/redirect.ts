import { Handlers } from "$fresh/server.ts";
import { msalAuthProvider } from "../../../../configs/msal.config.ts";
import { OpenBiotechManagerState } from "../../../../src/OpenBiotechManagerState.tsx";
import { MSALAuthSession } from "../../../../src/msal/MSALAuthSession.ts";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, OpenBiotechManagerState> = {
  async POST(req, ctx) {
    const authReq = await req.formData();

    const code = authReq.get("code");

    const state = authReq.get("state");

    const response = await msalAuthProvider.HandleRedirect(
      ctx.state.session || {},
      {
        code: code!.toString(),
        state: state!.toString(),
      },
    );

    return response;
    // helper(ctx.state.session);
    // ctx.state.session.set("hello", new Date().toString());

    // ctx.state.session.set("test", new Date().toString());

    // const headers = new Headers();

    // headers.set("location", "/cloud");

    // return new Response(null, {
    //   status: 303,
    //   headers,
    // });
  },
};

function helper(session: MSALAuthSession) {
  session.set("test", new Date().toString());
}

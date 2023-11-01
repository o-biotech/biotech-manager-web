import { Handlers } from "$fresh/server.ts";
import { Session, WithSession } from "$fresh/session";
import { MSALAuthSession } from "../src/msal/MSALAuthSession.ts";

function helper(session: MSALAuthSession) {
  session.set("hello", new Date().toString());
}

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, WithSession> = {
  GET(_req, ctx) {
    helper(ctx.state.session);
    // ctx.state.session.set("hello", new Date().toString());

    const headers = new Headers();

    headers.set("location", "/test");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

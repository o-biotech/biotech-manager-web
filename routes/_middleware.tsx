import { getCookies } from "$std/http/cookie.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";

function loggedInCheck(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  const cookies = getCookies(req.headers);

  const userCookie = cookies["user"];

  if (!userCookie) {
    const headers = new Headers();

    headers.set("location", "http://openbiotech.co");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  }

  return ctx.next();
}

function currentState(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  // Call to get state
  const state: OpenBiotechManagerState = {
    SetupPhase: SetupPhaseTypes.Cloud,
  };

  ctx.state = state;

  return ctx.next();
}

export const handler = [
  // loggedInCheck,
  currentState,
];

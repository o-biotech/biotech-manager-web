import { getCookies } from "$std/http/cookie.ts";
import { cookieSession } from "$fresh/session";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { CloudPhaseTypes } from "../src/CloudPhaseTypes.tsx";
import { redirectRequest } from "../src/utils/request.helpers.ts";

function loggedInCheck(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  const cookies = getCookies(req.headers);

  const userCookie = cookies["user"];

  if (!userCookie) {
    return redirectRequest("/");
  }

  return ctx.next();
}

function currentState(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  // Call to get state
  const state: OpenBiotechManagerState = {
    ...ctx.state,
    Phase: SetupPhaseTypes.Cloud,
    Cloud: {
      IsConnected: false,
      Phase: CloudPhaseTypes.Connect,
    },
  };

  ctx.state = state;

  return ctx.next();
}

function userSession(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  return session(req, ctx);
}

const session = cookieSession();

export const handler = [
  // loggedInCheck,
  userSession,
  currentState,
];

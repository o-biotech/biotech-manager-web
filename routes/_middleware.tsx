import { getCookies } from "$std/http/cookie.ts";
import { cookieSession, redisSession } from "$fresh/session";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { connect } from "redis";
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
  const isAuthenticated = ctx.state.session.get("isMsalAuthenticated");

  // Call to get state
  const state: OpenBiotechManagerState = {
    ...ctx.state,
    Phase: SetupPhaseTypes.Cloud,
    Cloud: {
      IsConnected: isAuthenticated,
      Phase: CloudPhaseTypes.Connect,
    },
  };

  ctx.state = state;

  return ctx.next();
}

const denoKvPath = null;
// Deno.env.get("DENO_KV_PATH") || null;

const redis = await connect({
  hostname: "fathym-cloud-prd.redis.cache.windows.net",
  port: 6380,
  username: "",
  password: "di2BAVpyNFGxGyKS5mFplIsS0aVSH5z683jN3GDLJr8=",
  tls: true,
});

// const session = redisSession(redis as any);
const session = cookieSession();

function userSession(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  return session(req, ctx);
}

export const handler = [
  // loggedInCheck,
  userSession,
  currentState,
];

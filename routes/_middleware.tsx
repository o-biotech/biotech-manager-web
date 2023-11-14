import { getCookies } from "$std/http/cookie.ts";
import { cookieSession, redisSession } from "$fresh/session";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { connect } from "redis";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { CloudPhaseTypes } from "../src/CloudPhaseTypes.tsx";
import { redirectRequest } from "@fathym/common";
import { OpenBiotechEaC } from "../src/eac/OpenBiotechEaC.ts";
import { denoKv } from "../configs/deno-kv.config.ts";
import { eacSvc } from "../services/eac.ts";

function loggedInCheck(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  // const cookies = getCookies(req.headers);

  // const userCookie = cookies["user"];

  // if (!userCookie) {
  //   return redirectRequest("/");
  // }

  ctx.state.Username = "michael.gearhardt@fathym.com";

  return ctx.next();
}

async function currentEaC(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  const currentEaC = await denoKv.get<string>([
    "User",
    ctx.state.Username,
    "Current",
    "EaC",
  ]);

  let eac: OpenBiotechEaC | undefined = undefined;

  if (currentEaC?.value) {
    eac = await eacSvc.Get(currentEaC.value!);
  }

  const userEaCs = await eacSvc.ListForUser();

  // Call to get state
  const state: OpenBiotechManagerState = {
    ...ctx.state,
    EaC: eac,
    UserEaCs: userEaCs || [],
  };

  ctx.state = state;

  return await ctx.next();
}

async function currentState(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  const isAuthenticated = ctx.state.session.get("isMsalAuthenticated");

  // Call to get state
  const state: OpenBiotechManagerState = {
    ...ctx.state,
    Phase: SetupPhaseTypes.Cloud,
    Cloud: {
      IsConnected: true, //isAuthenticated,
      Phase: CloudPhaseTypes.Connect,
    },
  };

  if (ctx.state.EaC) {
    const clouds = Object.keys(ctx.state.EaC.Clouds || {});

    if (clouds.length > 0) {
      state.Cloud.CloudLookup = clouds[0];

      state.Cloud.Phase = CloudPhaseTypes.CALZ;

      const resGroups = Object.keys(
        ctx.state.EaC!.Clouds![state.Cloud.CloudLookup].ResourceGroups || {},
      );

      if (resGroups.length > 0) {
        state.Cloud.ResourceGroupLookup = resGroups[0];

        state.Cloud.Phase = CloudPhaseTypes.Infrastucture;
      }
    }
  }

  ctx.state = state;

  return await ctx.next();
}

const session = cookieSession();

function userSession(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  return session(req, ctx);
}

export const handler = [loggedInCheck, userSession, currentEaC, currentState];

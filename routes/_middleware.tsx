import { getCookies, setCookie } from "$std/http/cookie.ts";
import { cookieSession, redisSession } from "$fresh/session";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createGitHubOAuthConfig, createHelpers } from "$fresh/oauth";
import { connect } from "redis";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { CloudPhaseTypes } from "../src/CloudPhaseTypes.tsx";
import { redirectRequest } from "@fathym/common";
import { OpenBiotechEaC } from "../src/eac/OpenBiotechEaC.ts";
import { denoKv } from "../configs/deno-kv.config.ts";
import { eacSvc } from "../services/eac.ts";
import { DevicesPhaseTypes } from "../src/DevicesPhaseTypes.tsx";
import { jwtConfig } from "../configs/jwt.config.ts";

const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
  createGitHubOAuthConfig({
    scope: ["user:email"],
  }),
);

async function loggedInCheck(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  const url = new URL(req.url);

  const { pathname } = url;

  if (pathname.startsWith("/api/eac/data/")) {
    return ctx.next();
  }

  switch (pathname) {
    case "/signin": {
      return await signIn(req);
    }

    case "/signin/callback": {
      const { response, tokens, sessionId } = await handleCallback(req);

      const { accessToken } = tokens;

      const resp = await fetch(`https://api.github.com/user/emails`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${accessToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const emails: { primary: boolean; email: string }[] = await resp.json();

      const primaryEmail = emails.find((e) => e.primary);

      const oldSessionId = await getSessionId(req);

      if (oldSessionId) {
        await denoKv.delete(["User", "Session", oldSessionId!, "Username"]);
      }

      await denoKv.set(
        ["User", "Session", sessionId!, "Username"],
        primaryEmail!.email,
      );

      return response;
    }

    case "/signout": {
      return await signOut(req);
    }

    default: {
      const sessionId = await getSessionId(req);

      if (sessionId === undefined) {
        return redirectRequest(`/signin?success_url=${pathname}`);
      } else {
        const currentUsername = await denoKv.get<string>([
          "User",
          "Session",
          sessionId,
          "Username",
        ]);

        if (currentUsername.value) {
          ctx.state.Username = currentUsername.value!;
        } else {
          throw new Error(`Invalid username`);
        }

        return ctx.next();
      }
    }
  }
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
    Devices: {
      JWT: "",
      Phase: DevicesPhaseTypes.Connect,
    },
  };

  if (ctx.state.EaC) {
    const clouds = Object.keys(ctx.state.EaC.Clouds || {});

    if (clouds.length > 0) {
      state.Cloud.CloudLookup = clouds[0];

      state.Cloud.Phase = CloudPhaseTypes.CALZ;

      const resGroups =
        ctx.state.EaC!.Clouds![state.Cloud.CloudLookup].ResourceGroups || {};

      const resGroupLookups = Object.keys(resGroups);

      if (resGroupLookups.length > 0) {
        state.Cloud.ResourceGroupLookup = resGroupLookups[0];

        state.Cloud.Phase = CloudPhaseTypes.Infrastucture;

        const iotResGroup = resGroups[state.Cloud.ResourceGroupLookup!];

        if ("iot-flow" in (iotResGroup.Resources || {})) {
          // TODO: Re-enable
          // state.Cloud.Phase = CloudPhaseTypes.Complete;

          state.Phase = SetupPhaseTypes.Devices;

          const iots = Object.keys(ctx.state.EaC.IoT || {});

          if (iots.length > 0) {
            state.Devices.IoTLookup = iots[0];

            const iotFlowResource = iotResGroup
              .Resources![state.Devices.IoTLookup]!;

            state.Devices.Phase = DevicesPhaseTypes.Connect;

            const iot = ctx.state.EaC!.IoT![state.Devices.IoTLookup!];

            const devices = iot.Devices || {};

            const deviceLookups = Object.keys(devices);

            if (deviceLookups.length > 0) {
              state.Devices.Phase = DevicesPhaseTypes.APIs;

              const entLookup = ctx.state.EaC!.EnterpriseLookup!;

              const username = ctx.state.Username;

              const currentJwt = await denoKv.get<string>([
                "User",
                username,
                "EaC",
                entLookup,
                "JWT",
              ]);

              if (currentJwt.value) {
                state.Devices.Phase = DevicesPhaseTypes.Dashboards;

                state.Devices.JWT = currentJwt.value;

                const dashboards = iot.Dashboards || {};

                const dashboardLookups = Object.keys(dashboards);

                if (dashboardLookups.length > 0) {
                  state.Devices.Phase = DevicesPhaseTypes.Complete;

                  state.Phase = SetupPhaseTypes.Data;
                }
              } else {
                const jwt = await jwtConfig.Create({
                  EnterpriseLookup: state.EaC!.EnterpriseLookup!,
                  CloudLookup: state.Cloud.CloudLookup!,
                  ResourceGroupLookup: state.Cloud.ResourceGroupLookup!,
                  Username: state.Username,
                });

                state.Devices.JWT = jwt;
              }
            }
          } else {
            state.Devices.IoTLookup = "iot-flow";
          }
        }
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

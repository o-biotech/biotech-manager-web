import { getCookies, setCookie } from "$std/http/cookie.ts";
import { cookieSession, redisSession } from "$fresh/session";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import { UserGitHubConnection } from "@fathym/eac";
import { connect } from "redis";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { CloudPhaseTypes } from "../src/CloudPhaseTypes.tsx";
import { OpenBiotechEaC } from "../src/eac/OpenBiotechEaC.ts";
import { denoKv } from "../configs/deno-kv.config.ts";
import { eacSvc } from "../services/eac.ts";
import { DevicesPhaseTypes } from "../src/DevicesPhaseTypes.tsx";
import { jwtConfig } from "../configs/jwt.config.ts";
import { DataPhaseTypes } from "../src/DataPhaseTypes.tsx";
import { gitHubOAuth } from "../services/github.ts";
import {
  EaCSourceConnectionDetails,
  loadMainOctokit,
  waitForStatus,
} from "@fathym/eac";

async function loggedInCheck(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>,
) {
  const url = new URL(req.url);

  const { origin, pathname, search, searchParams } = url;

  if (origin.endsWith("ngrok-free.app")) {
    return redirectRequest(`http://localhost:8000${pathname}${search}`);
  }

  if (pathname.startsWith("/api/data/")) {
    return ctx.next();
  }

  switch (pathname) {
    case "/signin": {
      return await gitHubOAuth.signIn(req);
    }

    case "/signin/callback": {
      return respond({ hello: "Welcome" });
      try {
        const { response, tokens, sessionId } = await gitHubOAuth
          .handleCallback(
            req,
          );

        const { accessToken, refreshToken } = tokens;

        const octokit = await loadMainOctokit({
          Token: accessToken,
        } as EaCSourceConnectionDetails);

        const { data: { login } } = await octokit.rest.users
          .getAuthenticated();

        const { data } = await octokit.rest.users
          .listEmailsForAuthenticatedUser();

        const primaryEmail = data.find((e) => e.primary);

        const oldSessionId = await gitHubOAuth.getSessionId(req);

        if (oldSessionId) {
          await denoKv.delete(["User", "Session", oldSessionId!, "Username"]);
        }

        await denoKv.set(
          ["User", "Session", sessionId!, "Username"],
          primaryEmail!.email,
        );

        await denoKv.set(
          ["User", "Session", sessionId!, "GitHub", "GitHubConnection"],
          {
            RefreshToken: refreshToken,
            Token: accessToken,
            Username: login,
          } as UserGitHubConnection,
        );

        return response;
      } catch (err) {
        return respond({ err });
      }
    }

    case "/signout": {
      return await gitHubOAuth.signOut(req);
    }

    default: {
      const sessionId = await gitHubOAuth.getSessionId(req);

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
  const url = new URL(req.url);

  const { pathname } = url;

  if (pathname.startsWith("/api/data/")) {
    return ctx.next();
  }

  const currentEaC = await denoKv.get<string>([
    "User",
    ctx.state.Username,
    "Current",
    "EaC",
  ]);

  let eac: OpenBiotechEaC | undefined = undefined;

  if (currentEaC.value) {
    eac = await eacSvc.Get(currentEaC.value!);
  }

  const sessionId = await gitHubOAuth.getSessionId(req);

  const currentConn = await denoKv.get<UserGitHubConnection>([
    "User",
    "Session",
    sessionId!,
    "GitHub",
    "GitHubConnection",
  ]);

  const srcConnLookup = `GITHUB://${currentConn.value!.Username}`;

  if (currentConn.value!) {
    const url = new URL(req.url);

    if (
      url.pathname == "/" &&
      eac?.SourceConnections &&
      eac.SourceConnections[srcConnLookup] &&
      eac.SourceConnections[srcConnLookup].Details!.Token !==
        currentConn.value.Token
    ) {
      const commitResp = await eacSvc.Commit(
        {
          EnterpriseLookup: eac.EnterpriseLookup,
          SourceConnections: {
            [srcConnLookup]: {
              Details: {
                ...eac.SourceConnections[srcConnLookup].Details!,
                Token: currentConn.value.Token,
              },
            },
          },
        },
        5,
      );

      await waitForStatus(
        eacSvc,
        commitResp.EnterpriseLookup,
        commitResp.CommitID,
      );

      eac = await eacSvc.Get(currentEaC.value!);
    }
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
    Data: {
      Phase: DataPhaseTypes.Flow,
    },
  };

  if (ctx.state.EaC) {
    const entLookup = ctx.state.EaC!.EnterpriseLookup!;

    const username = ctx.state.Username;

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

                  const currentFlowing = await denoKv.get<boolean>([
                    "EaC",
                    entLookup,
                    "Current",
                    "Flowing",
                  ]);

                  if (currentFlowing.value) {
                    state.Data.Phase = DataPhaseTypes.Explore;

                    const currentExplored = await denoKv.get<boolean>([
                      "EaC",
                      entLookup,
                      "Current",
                      "Explored",
                    ]);

                    if (currentExplored.value) {
                      state.Data.Phase = DataPhaseTypes.Develop;
                    }
                  }
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

  const sessionId = await gitHubOAuth.getSessionId(req);

  const currentConn = await denoKv.get<UserGitHubConnection>([
    "User",
    "Session",
    sessionId!,
    "GitHub",
    "GitHubConnection",
  ]);

  if (currentConn.value!) {
    state.GitHub = {
      Username: currentConn.value.Username,
    };
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

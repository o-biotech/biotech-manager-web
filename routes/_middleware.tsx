import { decode } from "@djwt";
import { cookieSession, redisSession } from "$fresh/session";
import { FreshContext } from "$fresh/server.ts";
import { redirectRequest, respond } from "@fathym/common";
import {
  EaCSourceConnectionDetails,
  loadEaCSvc,
  loadJwtConfig,
  loadMainOctokit,
  UserOAuthConnection,
  userOAuthConnExpired,
  waitForStatus,
} from "@fathym/eac";
import { connect } from "redis";
import { OpenBiotechManagerState } from "../src/OpenBiotechManagerState.tsx";
import { SetupPhaseTypes } from "../src/SetupPhaseTypes.tsx";
import { CloudPhaseTypes } from "../src/CloudPhaseTypes.tsx";
import { OpenBiotechEaC } from "../src/eac/OpenBiotechEaC.ts";
import { denoKv } from "../configs/deno-kv.config.ts";
import { DevicesPhaseTypes } from "../src/DevicesPhaseTypes.tsx";
import { DataPhaseTypes } from "../src/DataPhaseTypes.tsx";
import { azureOBiotechOAuth } from "../configs/oAuth.config.ts";

async function loggedInCheck(
  req: Request,
  ctx: FreshContext<OpenBiotechManagerState>,
) {
  if (ctx.destination !== "route" && ctx.destination !== "notFound") {
    return await ctx.next();
  }

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
      const host = req.headers.get("x-forwarded-host") || url.host;

      const proto =
        req.headers.get("x-forwarded-proto") || host.startsWith("localhost:")
          ? "http"
          : url.protocol;

      return await azureOBiotechOAuth.signIn(req, {
        urlParams: {
          redirect_uri: `${proto}//${host}/signin/callback`,
        },
      });
    }

    case "/signin/callback": {
      const now = Date.now();

      const oldSessionId = await azureOBiotechOAuth.getSessionId(req);

      try {
        const { response, tokens, sessionId } = await azureOBiotechOAuth
          .handleCallback(req);

        const { accessToken, refreshToken, expiresIn } = tokens;

        const [header, payload, signature] = await decode(accessToken);

        const primaryEmail = (payload as Record<string, string>).emails[0];

        await denoKv.set(
          ["User", sessionId, "Current", "Username"],
          {
            Username: primaryEmail!,
            ExpiresAt: now + expiresIn! * 1000,
            Token: accessToken,
            RefreshToken: refreshToken,
          } as UserOAuthConnection,
          {
            expireIn: expiresIn! * 1000,
          },
        );

        if (oldSessionId) {
          await denoKv.delete(["User", oldSessionId, "Current", "Username"]);
        }

        return response;
      } catch (error) {
        console.error(error);

        return redirectRequest("/signin");
      }
    }

    case "/signout": {
      return await azureOBiotechOAuth.signOut(req);
    }

    default: {
      const sessionId = await azureOBiotechOAuth.getSessionId(req);

      const successUrl = encodeURI(pathname + search);

      const notSignedInRedirect = `/signin?success_url=${successUrl}`;

      if (sessionId) {
        const currentUsername = await denoKv.get<UserOAuthConnection>([
          "User",
          sessionId,
          "Current",
          "Username",
        ]);

        if (!userOAuthConnExpired(currentUsername.value)) {
          ctx.state.Username = currentUsername.value!.Username;
        } else {
          return redirectRequest(notSignedInRedirect);
        }
      } else {
        return redirectRequest(notSignedInRedirect);
      }

      return ctx.next();
    }
  }
}

async function currentEaC(
  req: Request,
  ctx: FreshContext<OpenBiotechManagerState>,
) {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }

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

  const parentEaCSvc = await loadEaCSvc();

  if (currentEaC.value) {
    const jwtResp = await parentEaCSvc.JWT(
      currentEaC.value,
      ctx.state.Username,
    );

    ctx.state.EaCJWT = jwtResp.Token;

    const eacSvc = await loadEaCSvc(ctx.state.EaCJWT!);

    const eac = await eacSvc.Get(currentEaC.value!);

    if (eac?.EnterpriseLookup) {
      ctx.state.EaC = eac;

      ctx.state.UserEaCs = await eacSvc.ListForUser(
        ctx.state.EaC!.ParentEnterpriseLookup,
      );
    }
  }

  return await ctx.next();
}

async function currentState(
  req: Request,
  ctx: FreshContext<OpenBiotechManagerState>,
) {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }

  // const isAuthenticated = ctx.state.session.get("isMsalAuthenticated");

  // Call to get state
  const state: OpenBiotechManagerState = {
    UserEaCs: [],
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
          state.Cloud.Phase = CloudPhaseTypes.Complete;

          state.Phase = SetupPhaseTypes.Devices;

          const iots = Object.keys(ctx.state.EaC.IoT || {});

          if (iots.length > 0) {
            state.Devices.IoTLookup = iots[0];

            state.Devices.Phase = DevicesPhaseTypes.Connect;

            const iot = ctx.state.EaC!.IoT![state.Devices.IoTLookup!];

            const devices = iot.Devices || {};

            const deviceLookups = Object.keys(devices);

            if (deviceLookups.length > 0) {
              state.Devices.Phase = DevicesPhaseTypes.Dashboards;

              const currentJwt = await denoKv.get<string>([
                "User",
                username,
                "EaC",
                entLookup,
                "JWT",
              ]);

              if (currentJwt.value) {
                state.Devices.JWT = currentJwt.value;
              } else {
                const jwt = await loadJwtConfig().Create({
                  EnterpriseLookup: state.EaC!.EnterpriseLookup!,
                  CloudLookup: state.Cloud.CloudLookup!,
                  ResourceGroupLookup: state.Cloud.ResourceGroupLookup!,
                  Username: state.Username,
                });

                state.Devices.JWT = jwt;

                await denoKv.set(
                  ["User", username, "EaC", entLookup, "JWT"],
                  jwt,
                );
              }

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

                    const currentDeveloped = await denoKv.get<boolean>([
                      "EaC",
                      entLookup,
                      "Current",
                      "Developed",
                    ]);

                    if (currentDeveloped.value) {
                      state.Data.Phase = DataPhaseTypes.Complete;
                    }
                  }
                }
              }
            }
          } else {
            state.Devices.IoTLookup = "iot-flow";
          }
        }
      }
    }
  }

  if (state.Data && state.Data.Phase > 2) {
    state.Phase = SetupPhaseTypes.Complete;
  }

  if (ctx.state.Username) {
    const currentConn = await denoKv.get<UserOAuthConnection>([
      "User",
      ctx.state.Username!,
      "Current",
      "GitHub",
      "GitHubConnection",
    ]);

    if (
      !userOAuthConnExpired(currentConn.value) &&
      state.EaC?.SourceConnections &&
      state.EaC.SourceConnections[`GITHUB://${currentConn.value?.Username}`]
    ) {
      state.GitHub = {
        Username: currentConn.value!.Username,
      };
    }
  }

  ctx.state = state;

  return await ctx.next();
}

const session = cookieSession();

function userSession(req: Request, ctx: FreshContext<OpenBiotechManagerState>) {
  return session(req, ctx);
}

export const handler = [loggedInCheck, userSession, currentEaC, currentState];

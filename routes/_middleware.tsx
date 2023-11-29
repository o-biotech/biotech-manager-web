import { getCookies } from '$std/http/cookie.ts';
import { cookieSession, redisSession } from '$fresh/session';
import { MiddlewareHandlerContext } from '$fresh/server.ts';
import { connect } from 'redis';
import { OpenBiotechManagerState } from '../src/OpenBiotechManagerState.tsx';
import { SetupPhaseTypes } from '../src/SetupPhaseTypes.tsx';
import { CloudPhaseTypes } from '../src/CloudPhaseTypes.tsx';
import { redirectRequest } from '@fathym/common';
import { OpenBiotechEaC } from '../src/eac/OpenBiotechEaC.ts';
import { denoKv } from '../configs/deno-kv.config.ts';
import { eacSvc } from '../services/eac.ts';
import { DevicesPhaseTypes } from '../src/DevicesPhaseTypes.tsx';

function loggedInCheck(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>
) {
  // const cookies = getCookies(req.headers);

  // const userCookie = cookies["user"];

  // if (!userCookie) {
  //   return redirectRequest("/");
  // }

  ctx.state.Username = 'michael.gearhardt@fathym.com';

  return ctx.next();
}

async function currentEaC(
  req: Request,
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>
) {
  const currentEaC = await denoKv.get<string>([
    'User',
    ctx.state.Username,
    'Current',
    'EaC',
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
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>
) {
  const isAuthenticated = ctx.state.session.get('isMsalAuthenticated');

  // Call to get state
  const state: OpenBiotechManagerState = {
    ...ctx.state,
    Phase: SetupPhaseTypes.Cloud,
    Cloud: {
      IsConnected: true, //isAuthenticated,
      Phase: CloudPhaseTypes.Connect,
    },
    Devices: {
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

        if ('iot-flow' in (iotResGroup.Resources || {})) {
          // TODO: Re-enable
          // state.Cloud.Phase = CloudPhaseTypes.Complete;

          state.Phase = SetupPhaseTypes.Devices;

          const iots = Object.keys(ctx.state.EaC.IoT || {});

          if (iots.length > 0) {
            state.Devices.IoTLookup = iots[0];

            const iotFlowResource = iotResGroup.Resources![state.Devices.IoTLookup]!;

            state.Devices.Phase = DevicesPhaseTypes.Connect;

            const devices =
              ctx.state.EaC!.IoT![state.Devices.IoTLookup!].Devices || {};

            const deviceLookups = Object.keys(devices);

            if (deviceLookups.length > 0) {
              state.Devices.Phase = DevicesPhaseTypes.APIs;

              if ('data-apis' in (iotFlowResource.Resources || {})) {
                state.Devices.Phase = DevicesPhaseTypes.Dashboards;
              }
            }
          } else {
            state.Devices.IoTLookup = 'iot-flow';
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
  ctx: MiddlewareHandlerContext<OpenBiotechManagerState>
) {
  return session(req, ctx);
}

export const handler = [loggedInCheck, userSession, currentEaC, currentState];

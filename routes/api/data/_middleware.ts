import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { buildJwtValidationHandler, loadJwtConfig } from "@fathym/eac";
import { OpenBiotechAPIJWTPayload } from "../../../src/api/OpenBiotechAPIJWTPayload.ts";
import { loadEaCSvc } from "../../../configs/eac.ts";
import { OpenBiotechManagerAPIState } from "../../../src/api/OpenBiotechManagerAPIState.ts";

export const handler = [
  buildJwtValidationHandler<OpenBiotechAPIJWTPayload>(loadJwtConfig()),
  async function handler(
    _req: Request,
    ctx: MiddlewareHandlerContext<OpenBiotechManagerAPIState>,
  ) {
    const parentEaCSvc = await loadEaCSvc();

    const entLookup = ctx.state.EnterpriseLookup;

    const username = ctx.state.Username;

    const jwt = await parentEaCSvc.JWT(
      entLookup,
      username,
    );

    ctx.state.EaCJWT = jwt.Token;

    return await ctx.next();
  },
];

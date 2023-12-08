import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { buildJwtValidationHandler } from "@fathym/eac";
import { jwtConfig } from "../../../configs/jwt.config.ts";
import { OpenBiotechAPIJWTPayload } from "../../../src/api/OpenBiotechAPIJWTPayload.ts";

export const handler = [
  buildJwtValidationHandler<OpenBiotechAPIJWTPayload>(jwtConfig),
  // async function handler(
  //   req: Request,
  //   ctx: MiddlewareHandlerContext,
  // ) {
  //   // const origin = req.headers.get("Origin") || "*";
  //   const resp = await ctx.next();
  //   // const headers = resp.headers;

  //   // headers.set("Access-Control-Allow-Origin", origin);
  //   // headers.set("Access-Control-Allow-Credentials", "true");
  //   // headers.set(
  //   //   "Access-Control-Allow-Headers",
  //   //   "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
  //   // );
  //   // headers.set(
  //   //   "Access-Control-Allow-Methods",
  //   //   "POST, OPTIONS, GET, PUT, DELETE",
  //   // );

  //   return resp;
  // },
];

import { buildJwtValidationHandler } from "@fathym/eac";
import { jwtConfig } from "../../../../configs/jwt.config.ts";
import { OpenBiotechAPIJWTPayload } from "../../../../src/api/OpenBiotechAPIJWTPayload.ts";

export const handler = [
  buildJwtValidationHandler<OpenBiotechAPIJWTPayload>(jwtConfig),
];

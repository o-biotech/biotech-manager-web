import { OpenBiotechAPIJWTPayload } from "./OpenBiotechAPIJWTPayload.ts";

export type OpenBiotechManagerAPIState = {
  EaCJWT?: string;
} & OpenBiotechAPIJWTPayload;

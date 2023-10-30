// deno-lint-ignore-file no-explicit-any
import { WithSession } from "$fresh/session";
import * as msal from "npm:@azure/msal-node";
import { Configuration } from "npm:@azure/msal-node";
import { MSALAuthProvider } from "../src/msal/MSALAuthProvider.ts";

export const msalCryptoProvider = new msal.CryptoProvider();

export const msalConfig: Configuration = {
  auth: {
    clientId: Deno.env.get("MSAL_CLIENT_ID")!,
    authority: Deno.env.get("MSAL_CLOUD_INSTANCE")! +
      Deno.env.get("MSAL_TENANT_ID")!,
    clientSecret: Deno.env.get("MSAL_CLIENT_SECRET")!,
  },
  system: {
    loggerOptions: {
      loggerCallback(_loglevel, message, _containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: 3,
    },
  },
};

export const MSAL_REDIRECT_URI = Deno.env.get("MSAL_REDIRECT_URI")!;
export const MSAL_POST_LOGOUT_REDIRECT_URI = Deno.env.get(
  "MSAL_POST_LOGOUT_REDIRECT_URI",
)!;
export const MSAL_GRAPH_ME_ENDPOINT = Deno.env.get("MSAL_GRAPH_API_ENDPOINT")! +
  "v1.0/me";

export const msalAuthProvider = new MSALAuthProvider(
  msalConfig,
  msalCryptoProvider,
);

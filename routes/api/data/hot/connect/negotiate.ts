// deno-lint-ignore-file no-explicit-any
import { Handlers } from "$fresh/server.ts";
import { OpenBiotechManagerAPIState } from "../../../../../src/api/OpenBiotechManagerAPIState.ts";

export const handler: Handlers<any, OpenBiotechManagerAPIState> = {
  async GET(req, _ctx) {
    const origin = req.headers.get("Origin") || "*";

    const negResp = await fetch(
      "https://fr1-iot-devices-flow.azurewebsites.net/api/negotiate",
    );

    const text = await negResp.text();

    const resp = new Response(text);

    const headers = resp.headers;

    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, x-signalr-user-agent",
    );
    headers.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS, GET, PUT, DELETE",
    );

    return resp;
  },

  POST(req, ctx) {
    return handler.GET!(req, ctx);
  },

  OPTIONS(req, ctx) {
    return handler.GET!(req, ctx);
  },
};

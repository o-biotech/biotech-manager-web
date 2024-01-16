import { defineConfig, FreshContext } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { iconSetPlugin } from "@fathym/atomic-icons";
import { curIconSetGenerateConfig } from "./configs/fathym-atomic-icons.config.ts";
import { gitHubAccessPlugin } from "@fathym/eac";
import { gitHubOAuth } from "./configs/oAuth.config.ts";
import { msalPlugin } from "@fathym/msal";
import { msalPluginConfig } from "./configs/msal.config.ts";
import { denoKv } from "./configs/deno-kv.config.ts";
import { loadEaCSvc } from "./configs/eac.ts";
import { OpenBiotechManagerState } from "./src/OpenBiotechManagerState.tsx";

export default defineConfig({
  // server: {
  //   onListen: (params) => {
  //     const scheme = params.hostname === "localhost" ? "http" : "https";

  //     const baseUrl = `${scheme}://${params.hostname}:${params.port}`;

  //     console.log(`Listening on ${baseUrl}`);

  //     Deno.env.set("LOCAL_API_BASE", baseUrl);
  //   },
  // },
  plugins: [
    tailwind(),
    await iconSetPlugin(curIconSetGenerateConfig),
    msalPlugin(msalPluginConfig),
    gitHubAccessPlugin({
      DenoKV: denoKv,
      Handlers: gitHubOAuth,
      LoadEaCSvc: async (ctx: FreshContext<OpenBiotechManagerState>) => {
        return await loadEaCSvc(ctx.state.EaCJWT!);
      },
      RootPath: "/github/access",
    }),
  ],
});

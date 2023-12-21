import { default as SmeeClient } from "npm:smee-client";

console.log(SmeeClient);

const smee = new SmeeClient({
  source: `https://smee.io/${Deno.env.get("SMEE_CHANNEL_ID")}`,
  target: "http://localhost:8000",
  logger: console,
  fetch: true,
});

const events = smee.start();

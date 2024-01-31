import {
  createAzureADB2COAuth,
  createAzureADOAuth,
  createGitHubOAuth,
} from "@fathym/eac";

const baseUrl = Deno.env.get("BASE_URL")!;

export const gitHubOAuth = createGitHubOAuth(["admin:org", "user:email"]);

export const azureOBiotechOAuth = createAzureADB2COAuth(
  `${baseUrl}/signin/callback`,
  ["openid", Deno.env.get("AZURE_ADB2C_CLIENT_ID")!],
);

export const azureOAuth = createAzureADOAuth(`${baseUrl}/signin/callback`, [
  "https://management.core.windows.net//.default",
]);

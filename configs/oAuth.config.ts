import {
  createAzureADB2COAuth,
  createAzureADOAuth,
  createGitHubOAuth,
} from "@fathym/eac";

const baseUrl = Deno.env.get("BASE_URL")!;

export const gitHubOAuth = createGitHubOAuth(["admin:org", "user:email"]);

export const azureOBiotechOAuth = createAzureADB2COAuth(
  ["openid", Deno.env.get("AZURE_ADB2C_CLIENT_ID")!],
  undefined, // `${baseUrl}/signin/callback`,
);

export const azureOAuth = createAzureADOAuth(
  ["https://management.core.windows.net//.default"],
  `${baseUrl}/signin/callback`,
);

import { createAzureOAuth, createGitHubOAuth } from "@fathym/eac";

const baseUrl = Deno.env.get("BASE_URL")!;

export const gitHubOAuth = createGitHubOAuth(["admin:org", "user:email"]);

export const azureOBiotechOAuth = createAzureOAuth(
  "AZURE_O_BIOTECH",
  `${baseUrl}/signin/callback`,
  [
    "openid",
  ],
);

export const azureOAuth = createAzureOAuth(
  "MSAL",
  `${baseUrl}/signin/callback`,
  [
    "https://management.core.windows.net//.default",
  ],
);

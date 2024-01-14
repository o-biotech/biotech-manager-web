import { createAzureOAuth, createGitHubOAuth } from "@fathym/eac";

export const gitHubOAuth = createGitHubOAuth(["admin:org", "user:email"]);

export const azureOBiotechOAuth = createAzureOAuth(
  "AZURE_O_BIOTECH",
  "http://localhost:8000/signin/callback",
  [
    "openid",
  ],
);

export const azureOAuth = createAzureOAuth(
  "MSAL",
  "http://localhost:8000/signin/callback",
  [
    "https://management.core.windows.net//.default",
  ],
);

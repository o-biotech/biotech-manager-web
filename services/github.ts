import { createGitHubOAuth } from "@fathym/eac";

export const gitHubOAuth = createGitHubOAuth(["admin:org", "user:email"]);

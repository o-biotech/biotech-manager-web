import {
  EaCAzureServiceClient,
  EaCExplorerServiceClient,
  EaCServiceClient,
} from "@fathym/eac";

const eacBaseUrl = Deno.env.get("EAC_API_BASE_URL")!;

const eacApiKey = Deno.env.get("EAC_API_KEY")!;

export const eacSvc = new EaCServiceClient(new URL(eacBaseUrl), eacApiKey);

export const eacAzureSvc = new EaCAzureServiceClient(
  new URL(eacBaseUrl),
  eacApiKey,
);

export const eacExplorerSvc = new EaCExplorerServiceClient(
  new URL(eacBaseUrl),
  eacApiKey,
);

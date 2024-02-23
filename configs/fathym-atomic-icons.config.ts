import { IconSetConfig, IconSetGenerateConfig } from "@fathym/atomic-icons";

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    add: "https://api.iconify.design/gg:add.svg",
    begin: "https://api.iconify.design/fe:beginner.svg",
    check: "https://api.iconify.design/lets-icons:check-fill.svg",
    "chevron-down": "https://api.iconify.design/mdi:chevron-down.svg",
    "chevron-right":
      "https://api.iconify.design/material-symbols:chevron-right-rounded.svg",
    "connected-devices":
      "https://api.iconify.design/material-symbols:cast-connected-outline.svg",
    copy: "https://api.iconify.design/solar:copy-outline.svg",
    delete: "https://api.iconify.design/material-symbols-light:delete.svg",
    "device-telemetry":
      "https://api.iconify.design/material-symbols:query-stats.svg",
    edit: "https://api.iconify.design/mdi:edit.svg",
    "emulated-device":
      "https://api.iconify.design/material-symbols:android-find-my-device-outline.svg",
    error: "https://api.iconify.design/material-symbols:error.svg",
    loading: "https://api.iconify.design/line-md:loading-alt-loop.svg",
    "log-out": "https://api.iconify.design/ic:sharp-logout.svg",
    menu: "https://api.iconify.design/ci:hamburger.svg",
    notification: "https://api.iconify.design/mdi:notifications.svg",
    renew: "https://api.iconify.design/material-symbols:autorenew.svg",
    settings: "https://api.iconify.design/material-symbols-light:settings.svg",
    sync: "https://api.iconify.design/ic:baseline-sync.svg",
    user: "https://api.iconify.design/material-symbols:account-circle-full.svg",
    Clouds: "https://api.iconify.design/ic:baseline-cloud.svg",
    Details: "https://api.iconify.design/clarity:details-solid.svg",
    Handlers:
      "https://api.iconify.design/fluent:protocol-handler-16-filled.svg",
    IoT: "https://api.iconify.design/fluent:iot-20-filled.svg",
    SourceConnections: "https://api.iconify.design/mdi:connection.svg",
    DevOpsActions: "https://api.iconify.design/fluent-mdl2:set-action.svg",
    Secrets: "https://api.iconify.design/la:user-secret.svg",
    Sources: "https://api.iconify.design/mdi:source-repository.svg",
    GettingStarted: "https://api.iconify.design/mdi:cast-tutorial.svg",
  },
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  IconSet: curIconSetConfig,
  SpriteSheet: "iconset/icons",
  Generate: false,
};

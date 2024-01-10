import { useFileIconSet, useIconSetComponents } from "$atomic/icons";
import { curIconSetConfig } from "../iconset.config.ts";

await useFileIconSet("./static/icons.sprite.svg", curIconSetConfig.Sprites);

await useIconSetComponents(curIconSetConfig);

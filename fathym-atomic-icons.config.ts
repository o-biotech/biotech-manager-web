import { IconSetConfig, IconSetGenerateConfig } from '$atomic/icons';

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    'chevron-right':
      'https://api.iconify.design/material-symbols:chevron-right-rounded.svg',
    'chevron-down': 'https://api.iconify.design/mdi:chevron-down.svg',
    device:
      'https://api.iconify.design/material-symbols:android-find-my-device-outline.svg',
    user: 'https://api.iconify.design/material-symbols:account-circle-full.svg',
  },
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  IconSet: curIconSetConfig,
  SpriteSheet: './iconset/icons',
};

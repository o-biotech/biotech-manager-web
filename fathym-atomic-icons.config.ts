import { IconSetConfig, IconSetGenerateConfig } from '$atomic/icons';

export const curIconSetConfig: IconSetConfig = {
  IconMap: {
    'chevron-right':
      'https://api.iconify.design/material-symbols:chevron-right-rounded.svg',
    'chevron-down': 'https://api.iconify.design/mdi:chevron-down.svg',
    user: 'https://api.iconify.design/material-symbols:account-circle-full.svg',
  },
};

export const curIconSetGenerateConfig: IconSetGenerateConfig = {
  IconSet: curIconSetConfig,
  SpriteSheet: './iconset/icons',
};

import { useFileSheet } from '$atomic/icons';

const SVGMap: Record<string, string | URL> = {
  'x-circle': 'https://api.iconify.design/bi:x-circle.svg',
  'check-circle':
    'https://api.iconify.design/material-symbols:check-circle.svg',
  exclaim: 'https://api.iconify.design/bi:exclamation-circle.svg',
};

await useFileSheet('./static/icons.sprite.svg', {
  SVGMap,
});

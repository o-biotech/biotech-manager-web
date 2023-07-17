import { Options } from "twind_fresh_plugin/twind.ts";
import { defineConfig } from "twind";
import * as colors from "twind/colors";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
// import { aspectRatio } from 'npm:@twind/aspect-ratio';

export default {
  ...defineConfig({
    presets: [presetAutoPrefix(), presetTailWind()],
    theme: {
      extend: {
        backgroundImage: {
          'hero-pattern': "linear-gradient(rgba(0, 0, 40, 0.85),rgba(0, 0, 40, 0.85)), url('https://fresh.deno.dev/gallery/hero-bg.webp')",
        },
        color: {
          primary: "#4a918e",
          secondary: "#4a918e",
          tertiary: "#4a918e",
          info: colors.blue,
          error: colors.red,
          warning: colors.yellow,
        },
      }
    }
  }),
  plugins: {
    // aspect: aspectRatio,
  },
  selfURL: import.meta.url,
};// as Options;
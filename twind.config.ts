import { Options } from "twind_fresh_plugin/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";

export default {
  ...defineConfig({
    presets: [presetAutoPrefix(), presetTailWind()],
    theme: {
      extend: {
        backgroundImage: {
          'hero-pattern': "linear-gradient(rgba(0, 0, 40, 0.85),rgba(0, 0, 40, 0.85)), url('https://fresh.deno.dev/gallery/hero-bg.webp')",
        }
      }
    }
  }),
  selfURL: import.meta.url,
};// as Options;
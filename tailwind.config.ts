import { type Config } from "tailwindcss";
import * as colors from "tailwindcss/colors.js";
import unimportant from "npm:tailwindcss-unimportant";
import { buildTailwindComponentsConfigs } from "@fathym/common";
import BiotechAtomicTailwindComponents from "@fathym/atomic/tailwind.components.ts";

const tailwindComponents = [...BiotechAtomicTailwindComponents];

await buildTailwindComponentsConfigs(tailwindComponents);

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
    "build/tailwind-components.config",
  ],
  plugins: [unimportant],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(rgba(0, 0, 40, 0.85),rgba(0, 0, 40, 0.85)), url('https://fresh.deno.dev/gallery/hero-bg.webp')",
      },
      dropShadow: {
        md: ["0 20px 13px rgb(0 0 0 / 0.15)", "0 8px 5px rgb(0 0 0 / 0.4)"],
        lg: ["0 20px 13px rgb(0 0 0 / 0.3)", "0 8px 5px rgb(0 0 0 / 0.8)"],
      },
      color: {
        primary: "#4a918e",
        secondary: "#4a918e",
        tertiary: "#4a918e",
        info: colors.blue,
        error: colors.red,
        warning: colors.yellow,
      },
    },
  },
} satisfies Config;

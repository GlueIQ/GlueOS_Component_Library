import type { Config } from "tailwindcss"
import { tailwindConfigBase } from "./tailwind.config.base"

const baseExtend = (tailwindConfigBase.theme?.extend ?? {}) as Record<string, unknown>

const config: Config = {
  darkMode: ["class"],
  ...tailwindConfigBase,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    ...tailwindConfigBase.theme,
    extend: {
      ...baseExtend,
    },
  },
} as Config

export default config

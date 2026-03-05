import type { Config } from "tailwindcss"
import { tailwindConfigBase } from "@__SCOPE__/ui/tailwind.config.base"

const config: Config = {
  ...tailwindConfigBase,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} as Config

export default config

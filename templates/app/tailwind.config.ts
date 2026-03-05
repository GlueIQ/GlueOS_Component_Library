import type { Config } from "tailwindcss"
import { tailwindConfigBase } from "@repo/ui/tailwind.config.base"

const config: Config = {
  ...tailwindConfigBase,
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} as Config

export default config

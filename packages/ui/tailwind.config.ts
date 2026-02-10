import type { Config } from "tailwindcss"
import { tailwindConfigBase } from "./tailwind.config.base"

const config: Config = {
  ...tailwindConfigBase,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
} as Config

export default config

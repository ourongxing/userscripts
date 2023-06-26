import { defineConfig } from "vite"
import monkey from "vite-plugin-monkey"
import type { MonkeyUserScript } from "vite-plugin-monkey"
import tsConfigPath from "vite-tsconfig-paths"

export const userscript = {
  namespace: `https://github.com/ourongxing`,
  author: `ourongxing`,
  homepageURL: `https://github.com/ourongxing/userscripts`,
  source: `https://github.com/ourongxing/userscripts`,
  license: `MIT`
} satisfies MonkeyUserScript

// https://vitejs.dev/config/
export const viteScriptConfig = (config: MonkeyUserScript) =>
  defineConfig({
    plugins: [
      tsConfigPath(),
      monkey({
        entry: "src/main.ts",
        userscript: {
          ...userscript,
          ...config
        }
      })
    ]
  })

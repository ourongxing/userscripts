import { defineConfig } from "vite"
import monkey from "vite-plugin-monkey"
import { MonkeyUserScript } from "vite-plugin-monkey"
import tsConfigPaths from "vite-tsconfig-paths"

export const userInfo = {
  namespace: `https://github.com/ourongxing`,
  author: `ourongxing`,
  homepageURL: `https://github.com/ourongxing/userscripts`,
  source: `https://github.com/ourongxing/userscripts`,
  license: `MIT`
} satisfies MonkeyUserScript

export const viteScriptConfig = (config: MonkeyUserScript) =>
  defineConfig(() => ({
    plugins: [
      tsConfigPaths(),
      monkey({
        entry: "src/main.ts",
        server: {
          open: false
        },
        userscript: {
          ...userInfo,
          ...config
        }
      })
    ]
  }))

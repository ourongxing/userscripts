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
export default defineConfig({
  plugins: [
    tsConfigPath(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        ...userscript,
        "run-at": "document-end",
        icon: "https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/20221122202518.png?x-oss-process=base_webp",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://*.feishu.cn/docx/*"]
      }
    })
  ]
})

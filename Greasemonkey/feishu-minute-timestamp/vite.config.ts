import { defineConfig } from "vite"
import monkey from "vite-plugin-monkey"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        author: "ourongxing",
        version: "0.1.0",
        icon: "https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/20221122202518.png?x-oss-process=base_webp",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://*.feishu.cn/minutes/*", "https://*.feishu.cn/file/*"]
      }
    })
  ]
})

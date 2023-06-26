import { viteScriptConfig } from "viteConfig"

export default viteScriptConfig({
  "run-at": "document-end",
  icon: "https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/20221122202518.png?x-oss-process=base_webp",
  namespace: "npm/vite-plugin-monkey",
  match: ["https://*.feishu.cn/docx/*"]
})

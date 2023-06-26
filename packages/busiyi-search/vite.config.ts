import { viteScriptConfig } from "../../viteConfig"

export default viteScriptConfig({
  "run-at": "document-end",
  icon: "https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/202306261852306.png?x-oss-process=base_webp",
  match: ["https://*/*", "http://*/*"]
})

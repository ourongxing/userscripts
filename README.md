# userscripts

### 飞书妙记 URL 时间戳跳转
> [v1.0.0 点击安装](https://raw.githubusercontent.com/ourongxing/userscripts/main/packages/feishu-minute-timestamp/dist/feishu-minute-timestamp.user.js)

给飞书妙记添加 URL 时间戳跳转功能，并在暂停时刷新 URL 上的时间戳。支持飞书妙记以及飞书视频文件。

时间戳格式支持 `?t=99` 和 `?t=1:39` 两种。

### 不思议搜索
通过一个特定的 query key，串联起所有的站内搜索。

比如 [www.google.com##ourongxing](www.google.com##ourongxing)，[www.google.com??ourongxing](www.google.com??ourongxing) 或者 [www.google.com?bsy=ourongxing](www.google.com?bsy=ourongxing) 就可以在 Google 中搜索 ourongxing。可以根据实际情况选择写法。大多数时候都可以使用 `##`，除非已经有 hash 参数。

这样做有什么好处，作为一个基础设施，其他第三方搜索工具不再需要重复填写搜索的 URL。对于一些无法通过 URL 直接搜索的网站，也可以通过这种方式接入，比如使用 docsearch 的文档网站 [https://vuejs.org/##vue](https://vuejs.org/##vue)，可以直接搜索 vue 的文章。

另外，脚本还可以自动读取 opensearch 协议文件，自动添加搜索引擎。

如何添加搜索引擎呢，只需要搜索不思议的全拼 `busiyi`。

## LICENSE
[MIT](LICENSE) © ourongxing

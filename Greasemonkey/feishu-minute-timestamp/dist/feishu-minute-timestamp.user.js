// ==UserScript==
// @name       feishu-minute-timestamp
// @namespace  npm/vite-plugin-monkey
// @version    0.1.0
// @author     ourongxing
// @icon       https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/20221122202518.png?x-oss-process=base_webp
// @match      https://*.feishu.cn/minutes/*
// @match      https://*.feishu.cn/file/*
// ==/UserScript==

(function() {
  "use strict";
  function formatTime(t) {
    var _a;
    const time = t.split(":").map((t2) => Number(t2)).filter((t2) => !isNaN(t2));
    if (time.length === 3) {
      const [h, m, s] = time;
      return h * 60 * 60 + m * 60 + s;
    } else if (time.length === 2) {
      const [m, s] = time;
      return m * 60 + s;
    } else
      return (_a = time[0]) != null ? _a : 0;
  }
  function main() {
    var _a;
    const url = new URL(window.location.href);
    const { searchParams } = url;
    const timeStr = (_a = searchParams.get("t")) != null ? _a : "0";
    const hasT = searchParams.has("t");
    const time = formatTime(timeStr);
    let times = 0;
    const interval = setInterval(() => {
      if (++times > 30)
        clearInterval(interval);
      const video = document.querySelector("video");
      if (video) {
        clearInterval(interval);
        if (hasT) {
          video.onloadeddata = () => {
            video.currentTime = time;
          };
        }
        video.addEventListener("pause", function() {
          window.history.replaceState(null, "", `?t=${video.currentTime}`);
        });
      }
    }, 200);
  }
  main();
})();

// ==UserScript==
// @name       feishu-minute-timestamp
// @namespace  npm/vite-plugin-monkey
// @version    1.0.0
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
  function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
  async function delayBreak(times, interval, f) {
    for (let i = 0; i < times; i++) {
      if (await f())
        return true;
      await delay(interval);
    }
    return false;
  }
  async function main() {
    var _a;
    const url = new URL(window.location.href);
    const { searchParams } = url;
    const timeStr = (_a = searchParams.get("t")) != null ? _a : "0";
    const time = formatTime(timeStr);
    const success = await delayBreak(
      30,
      100,
      () => !!document.querySelector("video")
    );
    if (success) {
      const video = document.querySelector("video");
      if (searchParams.has("t")) {
        video.onloadeddata = () => {
          video.currentTime = time;
        };
      }
      video.addEventListener("pause", function() {
        window.history.replaceState(null, "", `?t=${video.currentTime}`);
      });
    }
  }
  main();
})();

// ==UserScript==
// @name         feishu-minute-timestamp
// @namespace    https://github.com/ourongxing
// @version      1.0.0
// @author       ourongxing
// @license      MIT
// @icon         https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/20221122202518.png?x-oss-process=base_webp
// @homepageURL  https://github.com/ourongxing/userscripts
// @source       https://github.com/ourongxing/userscripts
// @match        https://*.feishu.cn/docx/*
// @run-at       document-end
// ==/UserScript==

(async function () {
  'use strict';

  function formatTime(t) {
    const time2 = t.split(":").map((t2) => Number(t2)).filter((t2) => !isNaN(t2));
    if (time2.length === 3) {
      const [h, m, s] = time2;
      return h * 60 * 60 + m * 60 + s;
    } else if (time2.length === 2) {
      const [m, s] = time2;
      return m * 60 + s;
    } else
      return time2[0] ?? 0;
  }
  function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
  async function waitUntil(times, interval, f) {
    for (let i = 0; i < times; i++) {
      if (await f())
        return true;
      await delay(interval);
    }
    return false;
  }
  const url = new URL(window.location.href);
  const { searchParams } = url;
  const timeStr = searchParams.get("t") ?? "0";
  const time = formatTime(timeStr);
  const success = (await waitUntil(
    30,
    100,
    () => !!document.querySelector("video")
  ));
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

})();

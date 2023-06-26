// ==UserScript==
// @name         busiyi-search
// @namespace    https://github.com/ourongxing
// @version      0.0.1
// @author       ourongxing
// @license      MIT
// @icon         https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/202306261852306.png?x-oss-process=base_webp
// @homepageURL  https://github.com/ourongxing/userscripts
// @source       https://github.com/ourongxing/userscripts
// @match        https://*/*
// @match        http://*/*
// @grant        GM.getValue
// @grant        GM.setValue
// @run-at       document-end
// ==/UserScript==

(async function () {
  'use strict';

  var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
  const searchURLs = {
    "google.com": "https://www.google.com/search?q=%s",
    "bilibili.com": "https://search.bilibili.com/all?keyword=%s",
    "iqiyi.com": "https://so.iqiyi.com/so/q_%s",
    "youku.com": "https://so.youku.com/search_video/q_%s",
    "jd.com": "https://search.jd.com/Search?keyword=%s",
    "taobao.com": "https://s.taobao.com/search?q=%s",
    "tmall.com": "https://list.tmall.com/search_product.htm?q=%s",
    "zhihu.com": "https://www.zhihu.com/search?type=content&q=%s",
    "weibo.com": "https://s.weibo.com/weibo/%s",
    "douban.com": "https://www.douban.com/search?q=%s",
    "baidu.com": "https://www.baidu.com/s?wd=%s"
  };
  async function directsearch(keyword, host) {
    const searchURL = searchURLs[host] || (await _GM.getValue("searchURLs", {}))[host];
    console.log(searchURL);
    if (searchURL) {
      window.location.href = searchURL.replace("%s", keyword);
      return true;
    }
    return false;
  }
  function docsearch(keyword, host) {
    const button = document.querySelector(".DocSearch-Button");
    if (button) {
      button.click();
      setTimeout(() => {
        const t = document.getElementsByClassName("DocSearch-Input")[0];
        t.value = keyword;
        t.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
      }, 500);
      return true;
    }
    return false;
  }
  function jiumodiary(keyword, host) {
    setTimeout(() => {
      const t = document.getElementById("SearchWord");
      if (t) {
        t.value = keyword;
        t.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
      }
    }, 500);
    return 0 === keyword.length || keyword === previous_search || (validate(current_search = keyword), previous_search = keyword, setTimeout(function() {
      previous_search = "";
    }, 2e3)), false;
  }
  async function opensearch(keyword, host) {
    var _a;
    const search2 = document.querySelector(
      '[type="application/opensearchdescription+xml"]'
    );
    if (search2) {
      const xml = await fetch(search2.href).then((response) => response.text()).then((str) => new window.DOMParser().parseFromString(str, "text/xml"));
      const url2 = (_a = xml.querySelector("Url[type='text/html']")) == null ? void 0 : _a.getAttribute("template");
      if (url2) {
        if (url2 == null ? void 0 : url2.includes("{searchTerms}")) {
          const searchURL = url2.replace("{searchTerms}", "%s").replace(/\{.+\}/g, "");
          _GM.setValue("searchURLs", {
            ...await _GM.getValue("searchURLs", {}),
            [host]: searchURL
          });
          window.location.href = searchURL.replace("%s", keyword);
          return true;
        } else {
          const params = xml.querySelectorAll("Url[type='text/html'] Param");
          if (params.length > 0) {
            const temp = [];
            for (const param of params) {
              const name = param == null ? void 0 : param.getAttribute("name");
              const value = param == null ? void 0 : param.getAttribute("value");
              if (name && value) {
                temp.push(`${name}=${value}`);
              }
            }
            const searchURL = `${url2}?${temp.join("&")}`.replace("{searchTerms}", "%s").replace(/\{.+\}/g, "");
            _GM.setValue("searchURLs", {
              ...await _GM.getValue("searchURLs", {}),
              [host]: searchURL
            });
            window.location.href = searchURL.replace("%s", keyword);
            return true;
          }
        }
      }
    }
    return false;
  }
  async function search(url2) {
    var _a;
    const { searchParams, hash } = url2;
    let value = void 0;
    if (hash.startsWith("##"))
      value = hash.replace("##", "");
    else {
      value = searchParams.get("bsy") || ((_a = [...searchParams.keys()].find((key) => /^[?@？]/.test(key))) == null ? void 0 : _a.replace(/^[@?？]\s*/, ""));
    }
    if (value) {
      const host = url2.host.replace("www.", "");
      const keyword = decodeURIComponent(value);
      switch (host) {
        case "jiumodiary.com": {
          jiumodiary(keyword);
          break;
        }
        default: {
          if (docsearch(keyword) || await directsearch(keyword, host) || await opensearch(keyword, host))
            ;
          else {
            window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(`site:${host} `) + keyword;
          }
        }
      }
    }
  }
  async function setSearchURL(url2) {
    const { href, host } = url2;
    const searchURL = href.replace("busiyi", "%s").replace("busiyi", "%s");
    const searchURLs2 = await _GM.getValue("searchURLs", {});
    if (searchURL !== href) {
      const key = document.referrer ? new URL(document.referrer).host : host;
      _GM.setValue("searchURLs", {
        ...searchURLs2,
        [key]: searchURL
      });
      return true;
    }
    return false;
  }
  const url = new URL(window.location.href);
  if (!(await setSearchURL(url)))
    (await search(url));

})();

import { GM } from "$"
import directsearch from "./scripts/directsearch"
import docsearch from "./scripts/docsearch"
import jiumodiary from "./scripts/jiumodiary"
import opensearch from "./scripts/opensearch"

async function search(url: URL) {
  const { searchParams, hash } = url
  let value = undefined as string | undefined
  if (hash.startsWith("##")) value = hash.replace("##", "")
  else {
    value =
      searchParams.get("bsy") ||
      [...searchParams.keys()]
        .find(key => /^[?@？]/.test(key))
        ?.replace(/^[@?？]\s*/, "")
  }
  if (value) {
    const host = url.host.replace("www.", "")
    const keyword = decodeURIComponent(value)
    switch (host) {
      case "jiumodiary.com": {
        jiumodiary(keyword, host)
        break
      }
      default: {
        if (
          docsearch(keyword, host) ||
          (await directsearch(keyword, host)) ||
          (await opensearch(keyword, host))
        ) {
        } else {
          window.location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(`site:${host} `) +
            keyword
        }
      }
    }
  }
}

async function setSearchURL(url: URL) {
  const { href, host } = url
  const searchURL = href.replace("busiyi", "%s").replace("busiyi", "%s")
  const searchURLs = await GM.getValue("searchURLs", {})
  if (searchURL !== href) {
    const key = document.referrer ? new URL(document.referrer).host : host
    GM.setValue("searchURLs", {
      ...searchURLs,
      [key]: searchURL
    })
    return true
  }
  return false
}

const url = new URL(window.location.href)
if (!(await setSearchURL(url))) await search(url)

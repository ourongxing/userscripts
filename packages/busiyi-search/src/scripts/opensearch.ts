// @ts-nocheck
import { GM } from "$"
export default async function (keyword: string, host: string) {
  const search = document.querySelector(
    '[type="application/opensearchdescription+xml"]'
  )
  if (search) {
    const xml = await fetch(search.href)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    const url = xml
      .querySelector("Url[type='text/html']")
      ?.getAttribute("template")
    if (url) {
      if (url?.includes("{searchTerms}")) {
        const searchURL = url
          .replace("{searchTerms}", "%s")
          .replace(/\{.+\}/g, "")
        GM.setValue("searchURLs", {
          ...(await GM.getValue("searchURLs", {})),
          [host]: searchURL
        })
        window.location.href = searchURL.replace("%s", keyword)
        return true
      } else {
        const params = xml.querySelectorAll("Url[type='text/html'] Param")
        if (params.length > 0) {
          const temp: string[] = []
          for (const param of params) {
            const name = param?.getAttribute("name")
            const value = param?.getAttribute("value")
            if (name && value) {
              temp.push(`${name}=${value}`)
            }
          }
          const searchURL = `${url}?${temp.join("&")}`
            .replace("{searchTerms}", "%s")
            .replace(/\{.+\}/g, "")
          GM.setValue("searchURLs", {
            ...(await GM.getValue("searchURLs", {})),
            [host]: searchURL
          })
          window.location.href = searchURL.replace("%s", keyword)
          return true
        }
      }
    }
  }
  return false
}

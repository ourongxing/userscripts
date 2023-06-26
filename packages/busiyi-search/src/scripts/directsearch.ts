// @ts-nocheck
import { GM } from "$"
import searchURLs from "../searchURLs"
export default async function (keyword: string, host: string) {
  const searchURL =
    searchURLs[host] || (await GM.getValue("searchURLs", {}))[host]
  console.log(searchURL)
  if (searchURL) {
    window.location.href = searchURL.replace("%s", keyword)
    return true
  }
  return false
}

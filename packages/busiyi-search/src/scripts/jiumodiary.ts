// @ts-nocheck
// https://www.jiumodiary.com/
export default function (keyword: string, host: string) {
  setTimeout(() => {
    const t = document.getElementById("SearchWord")
    if (t) {
      t.value = keyword
      t.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }))
    }
  }, 500)

  return (
    0 === keyword.length ||
      keyword === previous_search ||
      (validate((current_search = keyword)),
      (previous_search = keyword),
      setTimeout(function () {
        previous_search = ""
      }, 2e3)),
    !1
  )
}

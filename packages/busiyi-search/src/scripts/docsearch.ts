// @ts-nocheck
export default function (keyword: string, host: string) {
  const button = document.querySelector(".DocSearch-Button")
  if (button) {
    button.click()
    setTimeout(() => {
      const t = document.getElementsByClassName("DocSearch-Input")[0]
      t.value = keyword
      t.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }))
    }, 500)
    return true
  }
  return false
}

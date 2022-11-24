import { GM_addStyle } from "$"
function delay(t: number) {
  return new Promise(resolve => setTimeout(resolve, t))
}

async function delayBreak(
  times: number,
  interval: number,
  f: () => boolean | Promise<boolean>
) {
  for (let i = 0; i < times; i++) {
    if (await f()) return true
    await delay(interval)
  }
  return false
}

async function main() {
  GM_addStyle(`.page-main-item {
    max-width: 100% !important;
    margin-left: 150px !important;
    transition: all 1s ease-out;
    }
    .catalogue-container .catalogue .show-full {
      max-width: 200px!important; }`)
}

main()

function formatTime(t: string) {
  const time = t
    .split(":")
    .map(t => Number(t))
    .filter(t => !isNaN(t))
  if (time.length === 3) {
    const [h, m, s] = time
    return h * 60 * 60 + m * 60 + s
  } else if (time.length === 2) {
    const [m, s] = time
    return m * 60 + s
  } else return time[0] ?? 0
}

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
  const url = new URL(window.location.href)
  const { searchParams } = url
  const timeStr = searchParams.get("t") ?? "0"
  const time = formatTime(timeStr)
  const success = await delayBreak(
    30,
    100,
    () => !!document.querySelector("video")
  )
  if (success) {
    const video = document.querySelector("video")!
    if (searchParams.has("t")) {
      video.onloadeddata = () => {
        video.currentTime = time
      }
    }
    video.addEventListener("pause", function () {
      window.history.replaceState(null, "", `?t=${video.currentTime}`)
    })
  }
}

main()

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

function main() {
  const url = new URL(window.location.href)
  const { searchParams } = url
  const timeStr = searchParams.get("t") ?? "0"
  const hasT = searchParams.has("t")
  const time = formatTime(timeStr)
  let times = 0
  const interval = setInterval(() => {
    if (++times > 30) clearInterval(interval)
    const video = document.querySelector("video")
    if (video) {
      clearInterval(interval)
      if (hasT) {
        video.onloadeddata = () => {
          video.currentTime = time
        }
      }
      video.addEventListener("pause", function () {
        window.history.replaceState(null, "", `?t=${video.currentTime}`)
      })
    }
  }, 200)
}

main()

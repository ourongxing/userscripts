import { formatTime, waitUntil } from "@shared/index"

async function main() {
  const url = new URL(window.location.href)
  const { searchParams } = url
  const timeStr = searchParams.get("t") ?? "0"
  const time = formatTime(timeStr)
  const success = await waitUntil(
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

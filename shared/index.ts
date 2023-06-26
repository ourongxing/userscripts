export function formatTime(t: string) {
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

export function delay(t: number) {
  return new Promise(resolve => setTimeout(resolve, t))
}

export async function waitUntil(
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

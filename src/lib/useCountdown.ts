import { useEffect, useState } from 'react'

// Counts down from `start` seconds; loops so the demo never sits at 00:00:00
export function useCountdown(start: number) {
  const [left, setLeft] = useState(start)
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s <= 0 ? start : s - 1)), 1000)
    return () => clearInterval(t)
  }, [start])
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(Math.floor(left / 3600))} : ${pad(Math.floor((left % 3600) / 60))} : ${pad(left % 60)}`
}

import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9339
const URL = process.env.PROBE_URL || 'http://localhost:4002/'
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, '--remote-allow-origins=*', '--headless=new', '--no-sandbox',
  `--user-data-dir=C:\\Users\\Tigran\\AppData\\Local\\Temp\\probe-${Date.now()}`, 'about:blank',
])
let list = []
for (let i = 0; i < 24; i++) {
  try { const r = await fetch(`http://127.0.0.1:${PORT}/json/list`); const txt = await r.text(); if (txt) { list = JSON.parse(txt); if (list.length) break } } catch {}
  await sleep(500)
}
const target = list.find((t) => t.type === 'page')
if (!target) { console.log('NO TARGET'); chrome.kill(); process.exit(1) }
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
const send = (method, params = {}) => new Promise((res) => { const myId = ++id; pending.set(myId, res); ws.send(JSON.stringify({ id: myId, method, params })) })

// Analyze the canvas: find columns/rows whose pixels differ from the hero background blue,
// to estimate the laptop bounding box. We read the rendered PNG via screenshot data URL instead.
await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })
await sleep(7000)
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await sleep(3500)
// Hide the DOM poster so we see only canvas? posterMounted should already be false.
const check = await send('Runtime.evaluate', {
  expression: `(() => {
     const canvas = document.querySelector('canvas')
     if (!canvas) return 'nocanvas'
     const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
     return gl ? 'ok' : 'nogl'
  })()`, returnByValue: true })
console.log('gl', check.result.result.value)

// screenshot only the canvas region and analyze via sharp-less JS in-page: draw into 2d canvas
const analyze = await send('Runtime.evaluate', {
  expression: `(async () => {
     const canvas = document.querySelector('canvas')
     const bmp = await createImageBitmap(canvas)
     const off = document.createElement('canvas')
     off.width = bmp.width; off.height = bmp.height
     const ctx = off.getContext('2d')
     ctx.drawImage(bmp, 0, 0)
     const { data, width, height } = ctx.getImageData(0, 0, off.width, off.height)
     // The hero bg is a blue gradient; laptop is dark navy/black + bright screen.
     // Detect "strongly dark" or "strongly bright" pixels that deviate from blue bg.
     let minX = width, maxX = -1, minY = height, maxY = -1, count = 0
     for (let y = 0; y < height; y += 2) {
       for (let x = 0; x < width; x += 2) {
         const i = (y * width + x) * 4
         const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3]
         if (a < 40) continue
         // background blue has b >> r and g moderate. Laptop body is near-grey/dark.
         const isBgBlue = b > 90 && b - r > 40 && g < 150
         const isDark = r < 40 && g < 45 && b < 70
         const isGrey = Math.abs(r-g) < 22 && Math.abs(g-b) < 34 && r > 40 && r < 210
         if (!isBgBlue && (isDark || isGrey)) {
           if (x < minX) minX = x; if (x > maxX) maxX = x
           if (y < minY) minY = y; if (y > maxY) maxY = y
           count++
         }
       }
     }
     return JSON.stringify({ w: width, h: height, minX, maxX, minY, maxY, count })
  })()`, awaitPromise: true, returnByValue: true })
console.log('CANVAS LAPTOP BOX', analyze.result.result.value)
chrome.kill(); process.exit(0)

import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9340
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

async function analyzeScreenshot(label) {
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  const dataUrl = 'data:image/png;base64,' + shot.result.data
  const r = await send('Runtime.evaluate', {
    expression: `(async () => {
       const img = new Image()
       await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = ${JSON.stringify(dataUrl)} })
       const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
       const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0)
       const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height)
       let minX = width, maxX = -1, minY = height, maxY = -1, n = 0
       for (let y = 0; y < height; y += 2) for (let x = 0; x < width; x += 2) {
         const i = (y*width + x) * 4; const r = data[i], g = data[i+1], b = data[i+2]
         // hero bg is blue: b significantly > r. Laptop bezel/metal is grey (r~g~b) or dark.
         const isBlueBg = (b - r) > 34
         if (!isBlueBg) { if (x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; n++ }
       }
       return JSON.stringify({ label: ${JSON.stringify(label)}, width, height, minX, maxX, minY, maxY, n })
     })()`, awaitPromise: true, returnByValue: true })
  return r.result.result.value
}

await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })
await sleep(7000)
console.log('POSTER  ', await analyzeScreenshot('poster'))
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await sleep(3500)
console.log('CANVAS0 ', await analyzeScreenshot('canvas0'))
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 420)' })
await sleep(1500)
console.log('SCROLL4 ', await analyzeScreenshot('scroll420'))
chrome.kill(); process.exit(0)

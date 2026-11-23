import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9366
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
async function ev(expr) { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); if (r.result.exceptionDetails) return 'ERR ' + JSON.stringify(r.result.exceptionDetails.exception); return r.result.result.value }

await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })
await sleep(9000)

// Trigger activation WITHOUT scrolling (keydown) so canvas mounts at p=0
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })

// Poll until real measurement appears at p=0
let last = 'none'
for (let i = 0; i < 40; i++) {
  await sleep(700)
  const d = await ev('window.__heroDebug ? JSON.stringify(window.__heroDebug) : "none"')
  last = d
  if (d && d !== 'none' && d !== 'ERR') {
    const o = JSON.parse(d)
    if (Array.isArray(o.ndcX) && o.ndcX[0] < 1e8) { console.log('p=0   ', d); break }
  }
}
console.log('last  ', last)
// also measure poster geometry right edge at p=0
console.log('poster', await ev(`JSON.stringify((()=>{const im=document.querySelector('img[src*="hero-stage-desktop.webp"]');if(!im)return 'noimg';const r=im.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top,b:r.bottom,vw:innerWidth}})())`))
chrome.kill(); process.exit(0)

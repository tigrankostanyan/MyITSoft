import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { writeFileSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9337
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

const probe = `(() => {
  const canvas = document.querySelector('canvas')
  const poster = document.querySelector('picture')
  const posterVisible = poster ? getComputedStyle(poster.parentElement).opacity : null
  const cr = canvas ? canvas.getBoundingClientRect() : null
  return JSON.stringify({ hasCanvas: !!canvas, canvas: cr ? { l: Math.round(cr.left), r: Math.round(cr.right), w: Math.round(cr.width), h: Math.round(cr.height) } : null, posterVisible, scrollY: Math.round(window.scrollY) })
})()`
async function evalExpr(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true })
  if (r.result && r.result.exceptionDetails) return 'ERR'
  return r.result.result.value
}

await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })
await sleep(7000)
console.log('PRE  ', await evalExpr(probe))

// force interactivity with a keydown WITHOUT scrolling
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await sleep(3500)
console.log('POST ', await evalExpr(probe))
const shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('c:/Users/Tigran/Desktop/Projects/MyITSoft/_probe_canvas0.png', Buffer.from(shot.result.data, 'base64'))

chrome.kill(); process.exit(0)

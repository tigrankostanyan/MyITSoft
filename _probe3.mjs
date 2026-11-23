import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { writeFileSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9335
const URL = process.env.PROBE_URL || 'http://localhost:4002/'
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  '--remote-allow-origins=*',
  '--headless=new',
  '--no-sandbox',
  `--user-data-dir=C:\\Users\\Tigran\\AppData\\Local\\Temp\\probe-${Date.now()}`,
  'about:blank',
])

let list = []
for (let i = 0; i < 24; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
    const txt = await r.text()
    if (txt) {
      list = JSON.parse(txt)
      if (list.length) break
    }
  } catch {}
  await sleep(500)
}
const target = list.find((t) => t.type === 'page')
if (!target) {
  console.log('NO TARGET')
  chrome.kill()
  process.exit(1)
}

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m)
    pending.delete(m.id)
  }
}
const send = (method, params = {}) =>
  new Promise((res) => {
    const myId = ++id
    pending.set(myId, res)
    ws.send(JSON.stringify({ id: myId, method, params }))
  })

const probe = `(() => {
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const canvas = document.querySelector('canvas')
  const cr = canvas ? canvas.getBoundingClientRect() : null
  const out = []
  document.querySelectorAll('div').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.right > vw + 1 && r.width < vw * 3) {
      out.push({ cls: (el.className||'').toString().slice(0,60), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) })
    }
  })
  return JSON.stringify({
    vw, vh,
    scrollY: Math.round(window.scrollY),
    docScrollW: document.documentElement.scrollWidth,
    bodyScrollW: document.body.scrollWidth,
    canvas: cr ? { l: Math.round(cr.left), r: Math.round(cr.right), w: Math.round(cr.width), h: Math.round(cr.height) } : null,
    overflowCount: out.length,
    overflowSample: out.slice(0, 8)
  })
})()`

async function evalExpr(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true })
  return r.result.result.value
}

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })

await sleep(1800)
console.log('EARLY    ', await evalExpr(probe))
const shot1 = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('c:/Users/Tigran/Desktop/Projects/MyITSoft/_probe_early.png', Buffer.from(shot1.result.data, 'base64'))

// wait for preloader to finish (~ up to 5.2s) plus settle
await sleep(7000)
console.log('SETTLED  ', await evalExpr(probe))
const shot2 = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('c:/Users/Tigran/Desktop/Projects/MyITSoft/_probe_settled.png', Buffer.from(shot2.result.data, 'base64'))

// simulate a tiny scroll then back to top
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 60)' })
await sleep(400)
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
await sleep(800)
console.log('AFTERSCRL', await evalExpr(probe))
const shot3 = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('c:/Users/Tigran/Desktop/Projects/MyITSoft/_probe_afterscroll.png', Buffer.from(shot3.result.data, 'base64'))

chrome.kill()
process.exit(0)

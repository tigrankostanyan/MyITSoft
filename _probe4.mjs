import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { writeFileSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9336
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
    if (txt) { list = JSON.parse(txt); if (list.length) break }
  } catch {}
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
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const stage = document.querySelector('[class*="container-type"], .\\\\[container-type\\\\:size\\\\]')
  const img = document.querySelector('picture img')
  const picture = document.querySelector('picture')
  const wrap = picture ? picture.parentElement : null
  const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { l: Math.round(r.left), t: Math.round(r.top), r: Math.round(r.right), b: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height) } }
  let stageCs = null
  if (stage) { const cs = getComputedStyle(stage); stageCs = { w: stage.clientWidth, h: stage.clientHeight, ct: cs.containerType, cqwTest: cs.width } }
  return JSON.stringify({ vw, vh, stage: rect(stage), stageCs, wrap: rect(wrap), picture: rect(picture), img: rect(img) })
})()`

async function evalExpr(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true })
  if (r.result && r.result.exceptionDetails) return 'ERR: ' + JSON.stringify(r.result.exceptionDetails.exception)
  return r.result.result.value
}

await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })
await sleep(7500)
console.log('SETTLED ', await evalExpr(probe))
chrome.kill(); process.exit(0)

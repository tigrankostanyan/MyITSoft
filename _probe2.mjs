import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9334
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

const probeExpr = `(() => {
  const vw = document.documentElement.clientWidth
  const ru = document.documentElement.getBoundingClientRect()
  const out = []
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.right > vw + 0.5 || r.left < -0.5) {
      const cs = getComputedStyle(el)
      out.push({ tag: el.tagName.toLowerCase(), cls: (el.className||'').toString().slice(0,70), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), pos: cs.position, t: cs.transform.slice(0,40) })
    }
  })
  const nav = document.querySelector('nav, header')
  const navT = nav ? getComputedStyle(nav).transform + ' | op=' + getComputedStyle(nav).opacity : 'no nav'
  return JSON.stringify({ vw, scrollWidth: document.documentElement.scrollWidth, scrollX: window.scrollX, nav: navT, overflowCount: out.length, sample: out.slice(0, 15) })
})()`

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1512, height: 900, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'http://localhost:3100/' })

await sleep(1500)
const during = await send('Runtime.evaluate', { expression: probeExpr, returnByValue: true })
console.log('DURING  ', during.result.result.value)
const shot1 = await send('Page.captureScreenshot', { format: 'png' })
;(await import('node:fs')).writeFileSync('c:/Users/Tigran/Desktop/Projects/MyITSoft/_during.png', Buffer.from(shot1.result.data, 'base64'))

await sleep(9000)
const after = await send('Runtime.evaluate', { expression: probeExpr, returnByValue: true })
console.log('AFTER   ', after.result.result.value)
const shot2 = await send('Page.captureScreenshot', { format: 'png' })
;(await import('node:fs')).writeFileSync('c:/Users/Tigran/Desktop/Projects/MyITSoft/_after.png', Buffer.from(shot2.result.data, 'base64'))

chrome.kill()
process.exit(0)

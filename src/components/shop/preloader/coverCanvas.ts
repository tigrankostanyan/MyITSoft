export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y, x + radius, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export function createStampBrush(radius: number): HTMLCanvasElement {
  const diameter = Math.ceil(radius * 2.2)
  const brush = document.createElement('canvas')
  brush.width = diameter
  brush.height = diameter
  const bCtx = brush.getContext('2d')
  if (!bCtx) return brush

  const cx = diameter / 2
  const cy = diameter / 2

  const grad = bCtx.createRadialGradient(cx, cy, radius * 0.45, cx, cy, radius * 1.05)
  grad.addColorStop(0, 'rgba(0, 0, 0, 1)')
  grad.addColorStop(0.68, 'rgba(0, 0, 0, 0.96)')
  grad.addColorStop(0.92, 'rgba(0, 0, 0, 0.4)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

  bCtx.fillStyle = grad
  bCtx.beginPath()
  bCtx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2)
  bCtx.fill()

  for (let b = 0; b < 3; b++) {
    const angle = (b / 3) * Math.PI * 2 + 0.35
    const dist = radius * 0.74
    const br = radius * 0.35
    bCtx.beginPath()
    bCtx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, br, 0, Math.PI * 2)
    bCtx.fill()
  }

  return brush
}

export function paintCoverCanvas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  logoImg: HTMLImageElement | null,
) {
  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, w, h)

  ctx.fillStyle = '#0d1220'
  ctx.fillRect(0, 0, w, h)

  const mainGlow = ctx.createRadialGradient(
    w * 0.5,
    h * 0.44,
    0,
    w * 0.5,
    h * 0.46,
    Math.max(w, h) * 0.72,
  )
  mainGlow.addColorStop(0, 'rgba(37, 99, 235, 0.52)')
  mainGlow.addColorStop(0.36, 'rgba(29, 78, 216, 0.34)')
  mainGlow.addColorStop(0.68, 'rgba(15, 23, 42, 0.72)')
  mainGlow.addColorStop(1, '#0d1220')
  ctx.fillStyle = mainGlow
  ctx.fillRect(0, 0, w, h)

  const cyanGlow = ctx.createRadialGradient(
    w * 0.5,
    h * 0.52,
    0,
    w * 0.5,
    h * 0.52,
    Math.min(w, h) * 0.48,
  )
  cyanGlow.addColorStop(0, 'rgba(0, 229, 255, 0.16)')
  cyanGlow.addColorStop(0.55, 'rgba(56, 189, 248, 0.06)')
  cyanGlow.addColorStop(1, 'rgba(0, 229, 255, 0)')
  ctx.fillStyle = cyanGlow
  ctx.fillRect(0, 0, w, h)

  const spacing = w < 640 ? 24 : 30
  ctx.fillStyle = 'rgba(125, 211, 252, 0.085)'
  for (let gx = spacing / 2; gx < w; gx += spacing) {
    for (let gy = spacing / 2; gy < h; gy += spacing) {
      ctx.fillRect(gx, gy, 1.35, 1.35)
    }
  }

  const padX = Math.max(20, Math.min(56, w * 0.045))
  const padY = Math.max(20, Math.min(40, h * 0.045))
  const metaFontSize = w < 640 ? 10 : 12

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padX, padY + 26)
  ctx.lineTo(w - padX, padY + 26)
  ctx.stroke()

  ctx.font = `600 ${metaFontSize}px "JetBrains Mono", "Noto Sans Armenian", monospace`
  ctx.fillStyle = 'rgba(255, 255, 255, 0.62)'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('MYITSOFT · YEREVAN', padX, padY + 8)

  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(125, 211, 252, 0.8)'
  ctx.fillText('IT & ԱՎՏՈՄԱՏԱՑՈՒՄ', w - padX, padY + 8)

  const centerX = w / 2
  const centerY = h * 0.51

  const brandText = 'MyITSoft'
  const baseFontSize = 200
  ctx.font = `900 ${baseFontSize}px "Archivo Black", "Space Grotesk", "Noto Sans Armenian", sans-serif`
  const measured = ctx.measureText(brandText).width || 1000
  const maxWidth = w * (w < 640 ? 0.88 : 0.82)
  const maxHeight = h * 0.34
  const fontSize = Math.min(maxHeight, (maxWidth / measured) * baseFontSize)

  const logoBoxSize = Math.max(44, Math.min(64, h * 0.082))
  const subtitleFontSize = Math.max(10, Math.min(15, w * 0.0125))
  const subtitleY = centerY - fontSize * 0.62 - (w < 640 ? 10 : 18)
  const logoY = subtitleY - logoBoxSize - (w < 640 ? 14 : 20)

  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    ctx.save()
    ctx.shadowColor = 'rgba(37, 99, 235, 0.55)'
    ctx.shadowBlur = 28
    ctx.shadowOffsetY = 8
    drawRoundedRect(
      ctx,
      centerX - logoBoxSize / 2,
      logoY,
      logoBoxSize,
      logoBoxSize,
      logoBoxSize * 0.26,
    )
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)'
    ctx.fill()
    ctx.restore()

    const innerPad = logoBoxSize * 0.16
    ctx.drawImage(
      logoImg,
      centerX - logoBoxSize / 2 + innerPad,
      logoY + innerPad,
      logoBoxSize - innerPad * 2,
      logoBoxSize - innerPad * 2,
    )
  }

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${subtitleFontSize}px "Noto Sans Armenian", "JetBrains Mono", sans-serif`
  ctx.fillStyle = '#7dd3fc'
  const subtitle =
    w < 540
      ? '3D ՎԵԲ ԿԱՅՔԵՐ · CRM/ERP · AI ԲՈՏԵՐ'
      : '3D ՎԵԲ ԿԱՅՔԵՐ  ·  CRM/ERP  ·  AI ԲՈՏԵՐ  ·  ԲԻԶՆԵՍԻ ԱՎՏՈՄԱՏԱՑՈՒՄ'
  ctx.fillText(subtitle, centerX, subtitleY)

  ctx.save()
  ctx.font = `900 ${fontSize}px "Archivo Black", "Space Grotesk", "Noto Sans Armenian", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const textGrad = ctx.createLinearGradient(
    centerX,
    centerY - fontSize * 0.45,
    centerX,
    centerY + fontSize * 0.5,
  )
  textGrad.addColorStop(0, '#ffffff')
  textGrad.addColorStop(0.58, '#e0f2fe')
  textGrad.addColorStop(1, '#38bdf8')

  ctx.shadowColor = 'rgba(0, 229, 255, 0.28)'
  ctx.shadowBlur = Math.max(18, fontSize * 0.16)
  ctx.fillStyle = textGrad
  ctx.fillText(brandText, centerX, centerY)

  ctx.shadowBlur = 0
  ctx.lineWidth = Math.max(1, fontSize * 0.008)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
  ctx.strokeText(brandText, centerX, centerY)
  ctx.restore()

  const accentW = Math.min(240, w * 0.26)
  const accentY = centerY + fontSize * 0.56
  const barGrad = ctx.createLinearGradient(
    centerX - accentW / 2,
    accentY,
    centerX + accentW / 2,
    accentY,
  )
  barGrad.addColorStop(0, 'rgba(37, 99, 235, 0)')
  barGrad.addColorStop(0.5, '#00e5ff')
  barGrad.addColorStop(1, 'rgba(37, 99, 235, 0)')
  ctx.fillStyle = barGrad
  ctx.fillRect(centerX - accentW / 2, accentY, accentW, 2)

  ctx.restore()
}

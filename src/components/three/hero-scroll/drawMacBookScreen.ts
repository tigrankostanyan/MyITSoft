/** Paints the MyITSoft OS screen onto a 1600x1000 canvas context. */
export function drawMacBookScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#0d1220'
    ctx.fillRect(0, 0, 1600, 1000)

    const g1 = ctx.createRadialGradient(800, 520, 30, 800, 520, 540)
    g1.addColorStop(0, 'rgba(37, 99, 235, 0.28)')
    g1.addColorStop(0.55, 'rgba(14, 165, 233, 0.09)')
    g1.addColorStop(1, 'transparent')
    ctx.fillStyle = g1
    ctx.fillRect(0, 0, 1600, 1000)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.055)'
    for (let x = 24; x < 1600; x += 28) {
      for (let y = 52; y < 960; y += 28) {
        ctx.fillRect(x, y, 1.5, 1.5)
      }
    }

    ctx.fillStyle = 'rgba(6, 9, 18, 0.8)'
    ctx.fillRect(0, 0, 1600, 38)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
    ctx.font = '700 15px "Inter", sans-serif'
    ctx.fillText('MyITSoft', 28, 24)
    ctx.fillStyle = 'rgba(148, 163, 184, 0.72)'
    ctx.font = '500 12px "JetBrains Mono", monospace'
    ctx.fillText('WEB ENGINEERING · BUSINESS AUTOMATION', 124, 24)
    ctx.fillStyle = '#38bdf8'
    ctx.textAlign = 'right'
    ctx.fillText('● CORE ACTIVE', 1570, 24)

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)'
    ctx.lineWidth = 2
    const b = 36
    ctx.beginPath()
    ctx.moveTo(64, 96 + b)
    ctx.lineTo(64, 96)
    ctx.lineTo(64 + b, 96)
    ctx.moveTo(1536 - b, 96)
    ctx.lineTo(1536, 96)
    ctx.lineTo(1536, 96 + b)
    ctx.moveTo(64, 898 - b)
    ctx.lineTo(64, 898)
    ctx.lineTo(64 + b, 898)
    ctx.moveTo(1536 - b, 898)
    ctx.lineTo(1536, 898)
    ctx.lineTo(1536, 898 - b)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)'
    ctx.font = '600 13px "JetBrains Mono", monospace'
    ctx.fillText('01 // MYITSOFT PRECISION ENGINE', 90, 882)
    ctx.textAlign = 'right'
    ctx.fillStyle = 'rgba(56, 189, 248, 0.8)'
    ctx.fillText('SCROLL TO ENTER →', 1510, 882)

    const panelY = 934
    const panelH = 66
    const panelGrad = ctx.createLinearGradient(0, panelY, 0, 1000)
    panelGrad.addColorStop(0, 'rgba(15, 23, 42, 0.92)')
    panelGrad.addColorStop(1, 'rgba(7, 11, 22, 0.96)')
    ctx.fillStyle = panelGrad
    ctx.fillRect(0, panelY, 1600, panelH)

    ctx.fillStyle = 'rgba(148, 163, 184, 0.28)'
    ctx.fillRect(0, panelY, 1600, 1.5)

    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, r)
      ctx.closePath()
    }

    ctx.fillStyle = 'rgba(56, 189, 248, 0.14)'
    drawRoundRect(24, panelY + 15, 166, 36, 10)
    ctx.fill()
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)'
    ctx.lineWidth = 1.2
    ctx.stroke()
    ctx.fillStyle = '#38bdf8'
    ctx.beginPath()
    ctx.arc(44, panelY + 33, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(241, 245, 249, 0.92)'
    ctx.font = '700 13px "JetBrains Mono", monospace'
    ctx.fillText('MYITSOFT OS', 60, panelY + 38)

    const iconCount = 6
    const iconSize = 40
    const iconGap = 16
    const totalDockW = iconCount * iconSize + (iconCount - 1) * iconGap
    const dockStartX = (1600 - totalDockW) / 2
    const iconY = panelY + 13

    {
      const x = dockStartX
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
      drawRoundRect(x - 4, iconY - 4, iconSize + 8, iconSize + 8, 10)
      ctx.fill()
      const sq = 13
      const g = 3
      const ox = x + 5
      const oy = iconY + 5
      ctx.fillStyle = '#38bdf8'
      drawRoundRect(ox, oy, sq, sq, 2.5)
      ctx.fill()
      ctx.fillStyle = '#60a5fa'
      drawRoundRect(ox + sq + g, oy, sq, sq, 2.5)
      ctx.fill()
      ctx.fillStyle = '#0ea5e9'
      drawRoundRect(ox, oy + sq + g, sq, sq, 2.5)
      ctx.fill()
      ctx.fillStyle = '#7dd3fc'
      drawRoundRect(ox + sq + g, oy + sq + g, sq, sq, 2.5)
      ctx.fill()
    }

    {
      const x = dockStartX + (iconSize + iconGap) * 1
      ctx.fillStyle = '#f59e0b'
      drawRoundRect(x + 4, iconY + 8, 16, 8, 3)
      ctx.fill()
      ctx.fillStyle = '#fbbf24'
      drawRoundRect(x + 4, iconY + 12, 32, 22, 5)
      ctx.fill()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.fillRect(x + 8, iconY + 16, 24, 2.5)
    }

    {
      const x = dockStartX + (iconSize + iconGap) * 2
      ctx.fillStyle = '#1e293b'
      drawRoundRect(x + 3, iconY + 4, 34, 32, 8)
      ctx.fill()
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.fillStyle = '#38bdf8'
      ctx.font = '800 15px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('>_', x + 20, iconY + 25)
    }

    {
      const x = dockStartX + (iconSize + iconGap) * 3
      const cx = x + 20
      const cy = iconY + 20
      ctx.lineWidth = 5.5
      ctx.strokeStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(cx, cy, 13, -Math.PI * 0.85, -Math.PI * 0.15)
      ctx.stroke()
      ctx.strokeStyle = '#eab308'
      ctx.beginPath()
      ctx.arc(cx, cy, 13, -Math.PI * 0.15, Math.PI * 0.52)
      ctx.stroke()
      ctx.strokeStyle = '#22c55e'
      ctx.beginPath()
      ctx.arc(cx, cy, 13, Math.PI * 0.52, Math.PI * 1.15)
      ctx.stroke()
      ctx.fillStyle = '#38bdf8'
      ctx.beginPath()
      ctx.arc(cx, cy, 6.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)'
      drawRoundRect(cx - 4, panelY + 58, 8, 2.5, 1.5)
      ctx.fill()
    }

    {
      const x = dockStartX + (iconSize + iconGap) * 4
      ctx.fillStyle = 'rgba(56, 189, 248, 0.16)'
      drawRoundRect(x - 5, iconY - 5, iconSize + 10, iconSize + 10, 10)
      ctx.fill()
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)'
      ctx.lineWidth = 1.2
      ctx.stroke()

      const cx = x + 20
      const cy = iconY + 20
      const prismGrad = ctx.createLinearGradient(cx - 12, cy - 12, cx + 12, cy + 12)
      prismGrad.addColorStop(0, '#38bdf8')
      prismGrad.addColorStop(0.5, '#818cf8')
      prismGrad.addColorStop(1, '#22d3ee')
      ctx.strokeStyle = prismGrad
      ctx.lineWidth = 4.2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(cx - 11, cy + 12)
      ctx.lineTo(cx, cy - 12)
      ctx.lineTo(cx + 11, cy + 12)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx - 6, cy + 4)
      ctx.lineTo(cx + 6, cy + 4)
      ctx.stroke()

      ctx.fillStyle = '#38bdf8'
      drawRoundRect(cx - 10, panelY + 58, 20, 3, 1.5)
      ctx.fill()
    }

    {
      const x = dockStartX + (iconSize + iconGap) * 5
      const cx = x + 20
      const cy = iconY + 20
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)'
      ctx.strokeStyle = '#34d399'
      ctx.lineWidth = 2.4
      ctx.beginPath()
      ctx.moveTo(cx, cy - 14)
      ctx.lineTo(cx + 12, cy - 9)
      ctx.lineTo(cx + 11, cy + 2)
      ctx.quadraticCurveTo(cx + 9, cy + 11, cx, cy + 15)
      ctx.quadraticCurveTo(cx - 9, cy + 11, cx - 11, cy + 2)
      ctx.lineTo(cx - 12, cy - 9)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    ctx.fillStyle = 'rgba(226, 232, 240, 0.85)'
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.8)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'

    ctx.beginPath()
    ctx.moveTo(1324, panelY + 36)
    ctx.lineTo(1330, panelY + 30)
    ctx.lineTo(1336, panelY + 36)
    ctx.stroke()

    ctx.textAlign = 'center'
    ctx.font = '700 13px "Inter", sans-serif'
    ctx.fillText('ՀԱՅ', 1372, panelY + 38)

    const wx = 1412
    const wy = panelY + 40
    ctx.beginPath()
    ctx.arc(wx, wy, 12, -Math.PI * 0.78, -Math.PI * 0.22)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(wx, wy, 7.5, -Math.PI * 0.78, -Math.PI * 0.22)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(wx, wy, 2.2, 0, Math.PI * 2)
    ctx.fill()

    const vx = 1444
    const vy = panelY + 33
    ctx.beginPath()
    ctx.moveTo(vx - 6, vy - 3)
    ctx.lineTo(vx - 2, vy - 3)
    ctx.lineTo(vx + 3, vy - 7)
    ctx.lineTo(vx + 3, vy + 7)
    ctx.lineTo(vx - 2, vy + 3)
    ctx.lineTo(vx - 6, vy + 3)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(vx + 5, vy, 5.5, -Math.PI * 0.35, Math.PI * 0.35)
    ctx.stroke()

    ctx.textAlign = 'right'
    ctx.fillStyle = 'rgba(248, 250, 252, 0.94)'
    ctx.font = '700 14px "Inter", sans-serif'
    ctx.fillText('16:08', 1572, panelY + 29)
    ctx.fillStyle = 'rgba(148, 163, 184, 0.85)'
    ctx.font = '500 12px "JetBrains Mono", monospace'
    ctx.fillText('20.11.2026', 1572, panelY + 48)
}

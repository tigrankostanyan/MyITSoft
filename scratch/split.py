import re,sys
d=sys.argv[1]
src=open(d+'/RocketCanvas.tsx',encoding='utf-8').read().split('\n')
def S(a,b,ded=0):
    out=[]
    for l in src[a-1:b]:
        out.append(l[ded:] if l[:ded].strip()=='' else l)
    return '\n'.join(out)
def strip(t):
    t=re.sub(r'/\*\*.*?\*/\n','',t,flags=re.S)
    t=re.sub(r'^[ \t]*//.*\n','',t,flags=re.M)
    return t
def w(name,t):
    t=re.sub(r'\n{3,}','\n\n',t).rstrip()+'\n'
    open(d+'/'+name,'w',encoding='utf-8',newline='\n').write(t)
# types
types=strip(S(10,69)).replace('\ninterface ','\nexport interface ')
types='export '+types.lstrip() if not types.lstrip().startswith('export') else types.lstrip()
w('rocketVfxTypes.ts',types)
# math
m=strip(S(71,92))
m=re.sub(r'^function ','export function ',m,flags=re.M)
w('rocketVfxMath.ts',m)
# process
p=strip(S(94,308))
p=p.replace('function processSmokePlate','/** Builds cool and warm transparent smoke sprites from a black-background plate. */\nexport function processSmokePlate').replace('function processFlameJet','/** Extracts a feathered, black-floor-subtracted flame jet plate for additive blending. */\nexport function processFlameJet')
p="import type { SmokePlatePair } from './rocketVfxTypes'\nimport { clamp01, lerp, smoothstep } from './rocketVfxMath'\n\n"+p
w('rocketVfxProcess.ts',p)
# assets
a=strip(S(310,434))
a=a.replace('function loadVfxAssets','/** Loads and processes VFX plates once; the result is cached. */\nexport function loadVfxAssets')
a="import type { VfxAssets } from './rocketVfxTypes'\nimport { loadImage, smoothstep } from './rocketVfxMath'\nimport { processFlameJet, processSmokePlate } from './rocketVfxProcess'\n\n"+a
w('rocketVfxAssets.ts',a)
# spawn
sp=strip(S(535,727,4))
sp=sp.replace('const spawnGroundSmoke = (\n','export function spawnGroundSmoke(\n  smokes: SmokePuff[],\n').replace('const spawnFlameJet = (\n','export function spawnFlameJet(\n  flames: FlameParticle[],\n').replace('const spawnSparks = (\n','export function spawnSparks(\n  sparks: Spark[],\n').replace(') => {\n',') {\n')
sp="import type { FlameParticle, SmokePuff, Spark } from './rocketVfxTypes'\nimport { lerp } from './rocketVfxMath'\n\n"+sp
w('rocketVfxSpawn.ts',sp)
# draw
dr=strip(S(729,898,4))
dr=dr.replace('const drawSmokeLayer = (\n','export function drawSmokeLayer(\n  smokes: readonly SmokePuff[],\n').replace('const drawPhotographicFire = (\n','export function drawPhotographicFire(\n  flames: readonly FlameParticle[],\n').replace(') => {\n',') {\n')
dr="import type { FlameParticle, SmokePuff, VfxAssets } from './rocketVfxTypes'\nimport { clamp01, lerp, smoothstep } from './rocketVfxMath'\n\n"+dr
w('rocketVfxDraw.ts',dr)
# fx/sim
def fn(sig,body): return 'export function '+sig+' {\n'+strip(body)+'\n}\n\n'
fx="import type { FlameParticle, SmokePuff, Spark } from './rocketVfxTypes'\nimport { lerp } from './rocketVfxMath'\n\n"
fx+=fn('drawFloorGlow(\n  backCtx: CanvasRenderingContext2D,\n  restNozzleX: number,\n  floorY: number,\n  scale: number,\n  fireIntensity: number,\n  groundImpact: number,\n)',S(951,988,4))
fx+=fn('drawFireBounce(\n  frontCtx: CanvasRenderingContext2D,\n  restNozzleX: number,\n  floorY: number,\n  scale: number,\n  groundImpact: number,\n)',S(1144,1164,4))
fx+=fn('updateAndDrawSparks(frontCtx: CanvasRenderingContext2D, sparks: Spark[], dt: number)',S(1167,1199,4))
fx+=fn('updateSmokes(\n  smokes: SmokePuff[],\n  dt: number,\n  t: number,\n  dispersalMode: number,\n  floorY: number,\n  scale: number,\n)',S(1020,1060,4))
fx+=fn('updateFlames(\n  flames: FlameParticle[],\n  dt: number,\n  floorY: number,\n  restNozzleX: number,\n  scale: number,\n)',S(1063,1086,4))
w('rocketVfxSim.ts',fx)
# component
c=src[:]
def rep(a,b,txt):
    c[a-1:b]=[txt]+[None]*(b-a)
rep(535,898,'')
rep(950,988,'      drawFloorGlow(backCtx, restNozzleX, floorY, scale, fireIntensity, groundImpact)')
rep(1020,1060,'      const lifeScale = lerp(1.0, 0.48, dispersalMode)\n      updateSmokes(smokes, dt, t, dispersalMode, floorY, scale)')
c[1019]  # noop
rep(1063,1086,'      updateFlames(flames, dt, floorY, restNozzleX, scale)')
rep(1144,1164,'      if (groundImpact > 0.04) drawFireBounce(frontCtx, restNozzleX, floorY, scale, groundImpact)')
rep(1167,1199,'      updateAndDrawSparks(frontCtx, sparks, dt)')
body='\n'.join(x for x in c[10-1+60:] if x is not None) if False else None
comp='\n'.join(x for x in c[434:] if x is not None)
comp=strip(comp)
comp=comp.replace('      const lifeScale = lerp(1.0, 0.48, dispersalMode)\n','',1) if False else comp
comp=comp.replace('spawnGroundSmoke(\n            restNozzleX','spawnGroundSmoke(\n            smokes,\n            restNozzleX').replace('spawnSparks(restNozzleX','spawnSparks(sparks, restNozzleX').replace('spawnFlameJet(nozzleX','spawnFlameJet(flames, nozzleX').replace('drawSmokeLayer(\n          backCtx','drawSmokeLayer(\n          smokes,\n          backCtx').replace('drawSmokeLayer(\n          frontCtx','drawSmokeLayer(\n          smokes,\n          frontCtx').replace('drawPhotographicFire(\n            backCtx','drawPhotographicFire(\n            flames,\n            backCtx')
comp=comp.replace('      const lifeScale = lerp(1.0, 0.48, dispersalMode)\n','')
comp=comp.replace('.catch(() => {\n      })','.catch(() => {})')
head="""import { memo, useEffect, useRef } from 'react'
import type { FlameParticle, SmokePuff, Spark, VfxAssets } from './rocketVfxTypes'
import { clamp01, lerp, smoothstep } from './rocketVfxMath'
import { loadVfxAssets } from './rocketVfxAssets'
import { spawnFlameJet, spawnGroundSmoke, spawnSparks } from './rocketVfxSpawn'
import { drawPhotographicFire, drawSmokeLayer } from './rocketVfxDraw'
import {
  drawFireBounce,
  drawFloorGlow,
  updateAndDrawSparks,
  updateFlames,
  updateSmokes,
} from './rocketVfxSim'

interface RocketCanvasProps {
  progressRef: React.MutableRefObject<number>
  rocketWrapRef: React.RefObject<HTMLDivElement | null>
}

/** Dual-canvas rocket launch VFX: back canvas (behind rocket) and front canvas (over fin tips). */
"""
comp=re.sub(r'^export const RocketCanvas','export const RocketCanvas',comp,flags=re.M)
w('RocketCanvas.tsx',head+comp.lstrip('\n'))

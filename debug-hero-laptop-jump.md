# Hero laptop jumps after reload

progress_status: investigating

## Symptom
After refreshing the home page, the laptop image shifts/jumps or appears misaligned while scrolling down and back up. Screenshots show a poster-like render and a different 3D scene state.

## Falsifiable hypotheses
| Hypothesis | Observation that confirms/rejects |
|---|---|
| H1: Static poster geometry/scale does not match the WebGL scene, so crossfade creates a visible jump. | Compare poster bounds and scene bounds at the same viewport/scroll position during transition. |
| H2: WebGL mounts at a nonzero/restored scroll progress but initializes its model at progress zero. | Record scrollProgressRef and model transform on mount and first frames. |
| H3: Home scroll choreography measures hero bounds before layout/viewport dimensions settle, then corrects on scroll. | Record measured hero bounds and progress before/after first layout and scroll. |
| H4: Poster hides when canvas reports ready before its first frame is rendered at the current scroll state. | Compare onReady timing with first rendered frame and initial transform. |

## Evidence sources
- User screenshots from localhost:4000.
- `src/components/home/hero/Hero3DStage.tsx` mounts the interactive scene on input/scroll and crossfades poster after `onReady`.
- `src/lib/useHomeScrollChoreography.ts` measures tracks and updates `scrollProgressRef`.

## Current status
No runtime instrumentation or browser reproduction has been collected yet. No root cause confirmed.

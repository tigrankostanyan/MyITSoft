import { useEffect, type RefObject } from "react";
import {
  computeRunwayProgress,
  getCachedScrollY,
  getStableViewportHeight,
  getStableViewportWidth,
  measureElementBounds,
  subscribeLayoutChange,
} from "~/lib/scroll-math";
import { SERVICE_STEPS } from "./carouselData";
import { clamp01, smoothstep, smootherstep } from "./carouselMath";

export interface CarouselScrollRefs {
  runwayRef: RefObject<HTMLDivElement | null>;
  stickyRef: RefObject<HTMLDivElement | null>;
  handsOverlayRef: RefObject<HTMLDivElement | null>;
  humanHandRef: RefObject<HTMLDivElement | null>;
  robotHandRef: RefObject<HTMLDivElement | null>;
  sparkRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  stageWrapRef: RefObject<HTMLDivElement | null>;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
}

/** Damped scroll choreography that writes styles directly to DOM refs across all viewports. */
export function useCarouselScroll(
  refs: CarouselScrollRefs,
  setActiveStepIdx: (idx: number) => void,
) {
  const {
    runwayRef,
    stickyRef,
    handsOverlayRef,
    humanHandRef,
    robotHandRef,
    sparkRef,
    headlineRef,
    subtitleRef,
    stageWrapRef,
    slideRefs,
  } = refs;

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let initialized = false;

    let targetScrollP = 0;
    let targetHandsP = 0;
    let targetStepFloat = 0;

    let smoothScrollP = 0;
    let smoothHandsP = 0;
    let smoothStepFloat = 0;
    let lastReportedStep = 0;

    let exactHeadOffsetPx = 220;
    let inRange = false;
    let bounds = { top: 0, height: 1 };

    const maxIdx = SERVICE_STEPS.length - 1;

    const measureHeadOffset = () => {
      const sticky = stickyRef.current;
      const head = headlineRef.current;
      if (!sticky || !head) return;

      const vw = getStableViewportWidth() || 1024;
      if (vw < 1024) {
        exactHeadOffsetPx = 0;
        return;
      }

      const prevTransform = head.style.transform;
      if (prevTransform && prevTransform !== "none") {
        head.style.transform = "none";
      }
      const stickyRect = sticky.getBoundingClientRect();
      const headRect = head.getBoundingClientRect();
      if (prevTransform && prevTransform !== "none") {
        head.style.transform = prevTransform;
      }

      const handsCenterY = stickyRect.top + stickyRect.height * 0.5;
      // Align the visual title (top ~35% of headline block) right behind the hands
      const titleCenterY = headRect.top + headRect.height * 0.35;
      exactHeadOffsetPx = Math.max(24, handsCenterY - titleCenterY);
    };

    const readTargets = () => {
      const scrollY = getCachedScrollY();
      const vh = getStableViewportHeight();
      const rectTop = bounds.top - scrollY;
      const isMobile = getStableViewportWidth() < 1024;

      targetScrollP = computeRunwayProgress(bounds, scrollY, vh);
      targetHandsP = isMobile
        ? 1
        : clamp01((vh * 0.36 - rectTop) / (vh * 0.72));

      const slideStart = isMobile ? 0 : 0.1;
      const slideSpan = 1 - slideStart;
      const raw = clamp01((targetScrollP - slideStart) / slideSpan) * maxIdx;
      const base = Math.floor(raw);
      if (base >= maxIdx) {
        targetStepFloat = maxIdx;
      } else {
        const frac = raw - base;
        targetStepFloat = isMobile
          ? base + frac
          : base + smootherstep(0.16, 0.84, frac);
      }
    };

    const applyDOM = (sp: number, hp: number, sf: number) => {
      const isMobile = getStableViewportWidth() < 1024;
      if (!isMobile) {
        const handsRetract = hp * 0.35 + smootherstep(0, 1, hp) * 0.65;
        const handsOpacity = 1 - smoothstep(0.72, 1, hp);
        const sparkOpacity = 1 - smoothstep(0.02, 0.36, hp);

        if (handsOverlayRef.current) {
          handsOverlayRef.current.style.opacity = handsOpacity.toFixed(3);
          handsOverlayRef.current.style.visibility =
            handsOpacity < 0.004 ? "hidden" : "visible";
        }
        if (sparkRef.current) {
          sparkRef.current.style.opacity = (sparkOpacity * 0.78).toFixed(3);
          sparkRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${(0.85 + sparkOpacity * 0.38).toFixed(3)})`;
        }
        if (humanHandRef.current) {
          humanHandRef.current.style.transform = `translate3d(${(-handsRetract * 112).toFixed(2)}%, ${(handsRetract * 3.5).toFixed(2)}%, 0) scale(${(1.02 - handsRetract * 0.08).toFixed(3)}) rotate(${(-handsRetract * 3.2).toFixed(2)}deg)`;
        }
        if (robotHandRef.current) {
          robotHandRef.current.style.transform = `translate3d(${(handsRetract * 112).toFixed(2)}%, ${(handsRetract * 3.5).toFixed(2)}%, 0) scale(${(1.02 - handsRetract * 0.08).toFixed(3)}) rotate(${(handsRetract * 3.2).toFixed(2)}deg)`;
        }
      }

      if (isMobile) {
        if (headlineRef.current) {
          headlineRef.current.style.opacity = "1";
          headlineRef.current.style.visibility = "visible";
          headlineRef.current.style.transform = "translate3d(0, 0, 0)";
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = "1";
          subtitleRef.current.style.visibility = "visible";
          subtitleRef.current.style.transform = "translate3d(0, 0, 0)";
        }
        if (stageWrapRef.current) {
          stageWrapRef.current.style.opacity = "1";
          stageWrapRef.current.style.transform = "translate3d(0, 0, 0)";
          stageWrapRef.current.style.pointerEvents = "auto";
        }
      } else {
        const textReveal = 0.75 + smootherstep(0.0, 0.4, hp) * 0.25;
        const headlineMorph = Math.max(
          smootherstep(0.18, 0.82, hp),
          smootherstep(0.0, 0.1, sp),
        );
        const subtitleOpacity =
          textReveal * (1 - smoothstep(0.02, 0.08, sp));
        const stageIn = smootherstep(0.03, 0.12, sp);

        if (headlineRef.current) {
          const revealScale = 1.08 - headlineMorph * 0.08;
          const offsetPx = (1 - headlineMorph) * exactHeadOffsetPx;
          headlineRef.current.style.opacity = textReveal.toFixed(3);
          headlineRef.current.style.visibility = "visible";
          headlineRef.current.style.transform = `translate3d(0, ${offsetPx.toFixed(2)}px, 0) scale(${revealScale.toFixed(4)})`;
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = subtitleOpacity.toFixed(3);
          subtitleRef.current.style.transform = `translate3d(0, ${((1 - subtitleOpacity) * -10).toFixed(2)}px, 0)`;
          subtitleRef.current.style.visibility =
            subtitleOpacity < 0.01 ? "hidden" : "visible";
        }
        if (stageWrapRef.current) {
          stageWrapRef.current.style.opacity = stageIn.toFixed(3);
          stageWrapRef.current.style.transform = `translate3d(0, ${((1 - stageIn) * 56).toFixed(2)}px, 0) scale(${(0.955 + stageIn * 0.045).toFixed(4)})`;
          stageWrapRef.current.style.pointerEvents =
            stageIn < 0.35 ? "none" : "auto";
        }
      }

      for (let idx = 0; idx <= maxIdx; idx++) {
        const node = slideRefs.current[idx];
        if (!node) continue;
        const offset = idx - sf;
        const absOff = Math.abs(offset);
        const clamped = Math.min(1.22, absOff);
        const dir = offset >= 0 ? 1 : -1;

        const translateY = dir * clamped * 96;
        const translateZ = -clamped * 200;
        const rotateX = -dir * clamped * 16;
        const scale = 1 - clamped * 0.12;
        const opacity =
          absOff >= 0.85 ? 0 : 1 - smootherstep(0.05, 0.72, absOff);

        node.style.transform = `translate3d(0, ${translateY.toFixed(2)}%, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        node.style.opacity = opacity.toFixed(3);
        node.style.pointerEvents = absOff < 0.35 ? "auto" : "none";
        node.style.visibility = absOff > 0.9 ? "hidden" : "visible";
      }
    };

    const tick = (now: number) => {
      if (initialized && !inRange) {
        rafId = 0;
        return;
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      readTargets();
      const isMobile = getStableViewportWidth() < 1024;

      if (!initialized) {
        bounds = measureElementBounds(runwayRef.current);
        measureHeadOffset();
        readTargets();
        smoothScrollP = targetScrollP;
        smoothHandsP = targetHandsP;
        smoothStepFloat = targetStepFloat;
        initialized = true;
      } else {
        const fScroll = 1 - Math.exp(-16.0 * dt);
        const fHands = 1 - Math.exp(-16.0 * dt);
        const fSlide = 1 - Math.exp(-12.0 * dt);

        smoothScrollP += (targetScrollP - smoothScrollP) * fScroll;
        smoothHandsP += (targetHandsP - smoothHandsP) * fHands;
        smoothStepFloat += (targetStepFloat - smoothStepFloat) * fSlide;
      }

      applyDOM(smoothScrollP, smoothHandsP, smoothStepFloat);

      const nextStep = Math.min(
        maxIdx,
        Math.max(0, Math.round(smoothStepFloat)),
      );
      if (nextStep !== lastReportedStep) {
        lastReportedStep = nextStep;
        setActiveStepIdx(nextStep);
      }

      const settled =
        Math.abs(targetScrollP - smoothScrollP) < 0.00025 &&
        Math.abs(targetHandsP - smoothHandsP) < 0.00025 &&
        Math.abs(targetStepFloat - smoothStepFloat) < 0.0006;

      if (!settled && inRange) {
        rafId = requestAnimationFrame(tick);
      } else {
        smoothScrollP = targetScrollP;
        smoothHandsP = targetHandsP;
        smoothStepFloat = targetStepFloat;
        applyDOM(smoothScrollP, smoothHandsP, smoothStepFloat);
        rafId = 0;
      }
    };

    const wake = () => {
      if (initialized && !inRange) return;
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && runwayRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          const nextInRange = entries[0]?.isIntersecting ?? true;
          const prevInRange = inRange;
          inRange = nextInRange;
          if (inRange) {
            bounds = measureElementBounds(runwayRef.current);
            measureHeadOffset();
            wake();
          } else if (prevInRange && initialized) {
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
            bounds = measureElementBounds(runwayRef.current);
            const clampedP = getCachedScrollY() < bounds.top ? 0 : 1;
            const clampedStep = clampedP === 0 ? 0 : maxIdx;
            smoothScrollP = clampedP;
            targetScrollP = clampedP;
            smoothHandsP = clampedP === 0 ? 0 : 1;
            targetHandsP = smoothHandsP;
            smoothStepFloat = clampedStep;
            targetStepFloat = clampedStep;
            applyDOM(smoothScrollP, smoothHandsP, smoothStepFloat);
            if (clampedStep !== lastReportedStep) {
              lastReportedStep = clampedStep;
              setActiveStepIdx(clampedStep);
            }
          }
        },
        { rootMargin: "420px 0px" },
      );
      io.observe(runwayRef.current);
    } else {
      inRange = true;
    }

    const unsubLayout = subscribeLayoutChange(() => {
      bounds = measureElementBounds(runwayRef.current);
      measureHeadOffset();
      if (!initialized || inRange) wake();
    });

    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io?.disconnect();
      unsubLayout();
      window.removeEventListener("scroll", wake);
    };
  }, []);
}

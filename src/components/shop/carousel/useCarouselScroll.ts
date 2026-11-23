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
import { clamp01, smootherstep } from "./carouselMath";
import { applyCarouselDOM } from "./carouselDomWrites";

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
  const { runwayRef, stickyRef, headlineRef } = refs;

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
      applyCarouselDOM(refs, sp, hp, sf, exactHeadOffsetPx, maxIdx);
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

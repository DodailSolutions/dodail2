"use client";

import { RefObject, useEffect } from "react";

/**
 * Reports the index of the `[data-index]` element inside `rootRef` that crosses the
 * middle band of the viewport. Lets fully expanded content drive the 3D scene.
 * `mediaQuery` limits it to layouts where the items are stacked vertically.
 */
export function useActiveOnScroll(
  rootRef: RefObject<HTMLElement | null>,
  onActive: (index: number) => void,
  mediaQuery?: string
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (mediaQuery && !window.matchMedia(mediaQuery).matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    root.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, onActive, mediaQuery]);
}

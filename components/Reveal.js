import { createElement } from "react";

/*
 * Entrance animations start once <Shell /> sets data-ready="true" on the root (after the loader on the
 * first visit, immediately on every other load). Shell never sets it back to false, and every page is a
 * fresh set of elements, so each page simply plays its entrance when it mounts. With reduced motion the
 * content is simply visible.
 */

/** Fade and lift. */
export function Rise({ as = "div", delay = 0, className = "", style, children }) {
  return createElement(
    as,
    {
      "data-reveal": true,
      className: `opacity-0 motion-reduce:opacity-100 motion-safe:group-data-[ready=true]/app:animate-rise ${className}`,
      style: { animationDelay: `calc(var(--d, 0ms) + ${delay}ms)`, ...style },
    },
    children,
  );
}

/**
 * One line of a headline, rising out of a mask.
 * The start offset uses `transform` (not Tailwind's `translate-y-*`, which sets the separate
 * `translate` property) so it is replaced by the keyframes instead of stacking on top of them.
 */
export function Line({ delay = 0, className = "", children }) {
  return (
    <span className="-mx-[0.12em] -mb-[0.3em] block overflow-hidden px-[0.12em] pb-[0.3em]">
      <span
        data-reveal
        className={`block [transform:translateY(110%)] motion-reduce:[transform:none] motion-safe:group-data-[ready=true]/app:animate-line ${className}`}
        style={{ animationDelay: `calc(var(--d, 0ms) + ${delay}ms)` }}
      >
        {children}
      </span>
    </span>
  );
}

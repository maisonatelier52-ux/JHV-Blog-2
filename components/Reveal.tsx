import { createElement, type CSSProperties, type ReactNode } from "react";

/*
 * Entrance animations only start once the page curtain lifts: <Shell /> sets
 * data-ready="true" on the root, and the `group-data-[ready=true]/app:` variants
 * below react to it. With reduced motion the content is simply visible.
 */

type RiseProps = {
  as?: "div" | "p" | "span" | "nav";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Fade and lift. */
export function Rise({ as = "div", delay = 0, className = "", style, children }: RiseProps) {
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
export function Line({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
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

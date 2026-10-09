"use client";

import Link from "next/link";
import { useContext } from "react";
import { TransitionContext } from "@/lib/transition";

/** A normal next/link that plays the page transition before navigating. */
export default function TransitionLink({ href, onClick, ...props }) {
  const go = useContext(TransitionContext);

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Let the browser handle new-tab / new-window clicks.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    go(href);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}

"use client";

import Link from "next/link";
import { useContext, type ComponentProps, type MouseEvent } from "react";
import { TransitionContext } from "@/lib/transition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** A normal next/link that plays the curtain transition before navigating. */
export default function TransitionLink({ href, onClick, ...props }: Props) {
  const go = useContext(TransitionContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Let the browser handle new-tab / new-window clicks.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    go(href);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}

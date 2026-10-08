"use client";

import { createContext } from "react";

/** Navigate with the curtain transition. Provided by <Shell />. */
export const TransitionContext = createContext<(href: string) => void>(() => {});

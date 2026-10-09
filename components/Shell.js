"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logo from "@/public/images/logo-jhv.png";
import { stops } from "@/lib/story";
import { TransitionContext } from "@/lib/transition";
import Arrow from "./Arrow";
import Portrait from "./Portrait";
import TransitionLink from "./TransitionLink";

const INTRO_MS = 1300; // loader hold, home page on first load only
const REVEAL_MS = 900; // intro curtain lifting
const EXIT_MS = 200; // old page slides and fades out
const SETTLE_MS = 500; // new page finishes entering

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The curtain is only used once: the first load of the home page.
const curtainClass = {
  intro: "translate-y-0",
  revealing: "animate-curtain-out",
  idle: "pointer-events-none invisible translate-y-full",
};

export default function Shell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // The loading curtain only exists when the site is first opened on the home page.
  // Any other page (including a manual refresh) starts straight away with no curtain.
  const [phase, setPhase] = useState(pathname === "/" ? "intro" : "idle");
  // `ready` goes false -> true exactly ONCE (when the site first opens). It never goes back to false,
  // so page changes can never leave content or the portrait hidden or half-animated.
  const [ready, setReady] = useState(pathname !== "/");
  const [leaving, setLeaving] = useState(0); // direction of the page that is sliding out (1, -1 or 0)
  const [menuOpen, setMenuOpen] = useState(false);
  // The loader (logo + line) plays once per full page load of the home page. Shell stays mounted while
  // navigating, so going to another page and back never replays it.
  const [loaderVisible, setLoaderVisible] = useState(pathname === "/");

  const busy = useRef(false);
  const timers = useRef([]);
  const lastPath = useRef(pathname);
  const touch = useRef(null);
  const menuButton = useRef(null);

  const found = stops.findIndex((stop) => stop.href === pathname);
  const index = Math.max(0, found);
  const last = stops.length - 1;

  const later = useCallback((fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // First load of the home page: hold the loader briefly, then lift the curtain.
  useEffect(() => {
    if (!loaderVisible) return; // opened on another page: no loading effect
    if (prefersReducedMotion()) {
      setPhase("idle");
      setReady(true);
      setLoaderVisible(false);
      return;
    }
    const lift = window.setTimeout(() => {
      setReady(true);
      setPhase("revealing");
    }, INTRO_MS);
    const done = window.setTimeout(() => {
      setPhase("idle");
      setLoaderVisible(false);
    }, INTRO_MS + REVEAL_MS);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Page change: the old page slides out in the direction of travel, then the new one animates in. */
  const go = useCallback(
    (href) => {
      setMenuOpen(false);
      if (href === pathname || busy.current) return;

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      const target = stops.findIndex((stop) => stop.href === href);
      busy.current = true;
      clearTimers();
      setLeaving(target > index ? 1 : -1);

      later(() => router.push(href), EXIT_MS);
      // Safety net: if the route never loads, bring the current page back instead of leaving it hidden.
      later(() => {
        setLeaving(0);
        busy.current = false;
      }, EXIT_MS + 5000);
    },
    [clearTimers, index, later, pathname, router],
  );

  // The new route has mounted (also covers the browser back / forward buttons): show it and focus its heading.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    clearTimers(); // drop the safety net of the navigation that just finished
    setLeaving(0);
    later(() => {
      busy.current = false;
    }, SETTLE_MS);
    document.querySelector("main h1")?.focus({ preventScroll: true });
  }, [clearTimers, later, pathname]);

  // Keyboard: arrows move through the story, Escape closes the menu.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
        return;
      }
      if (menuOpen || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const el = event.target;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (event.key === "ArrowRight" && index < last) go(stops[index + 1].href);
      if (event.key === "ArrowLeft" && index > 0) go(stops[index - 1].href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, last, menuOpen]);

  // Touch: horizontal swipe moves through the story.
  const onTouchStart = (event) => {
    const point = event.touches[0];
    touch.current = { x: point.clientX, y: point.clientY };
  };
  const onTouchEnd = (event) => {
    const start = touch.current;
    touch.current = null;
    if (!start || menuOpen) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (Math.abs(dx) < 70 || Math.abs(dy) > 60) return;
    if (dx < 0 && index < last) go(stops[index + 1].href);
    if (dx > 0 && index > 0) go(stops[index - 1].href);
  };

  const counter = useMemo(() => String(index + 1).padStart(2, "0"), [index]);

  return (
    <TransitionContext.Provider value={go}>
      <div
        data-ready={ready}
        style={{ "--d": loaderVisible ? "350ms" : "0ms" }}
        className="group/app relative h-dvh w-full overflow-hidden bg-black"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ───────────── Portrait: one fixed layer behind every page ───────────── */}
        <Portrait shown={ready} />

        {/* ───────────── Header ───────────── */}
        <header className="absolute inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between px-[6%] pt-[env(safe-area-inset-top)] md:h-24 md:px-[5%]">
          <TransitionLink href="/" aria-label="Julio Herrera Velutini, home" className="flex items-center gap-3.5 md:gap-4">
            <Image
              src={logo}
              alt=""
              priority
              sizes="48px"
              className="h-11 w-auto md:h-12"
            />
            <span className="leading-none">
              <span className="block text-[11px] tracking-[0.15em] text-bone uppercase md:text-[12px] md:tracking-[0.2em]">
                Julio Herrera Velutini
              </span>
            </span>
          </TransitionLink>

          <div className="flex items-center gap-12">
            <button
              ref={menuButton}
              type="button"
              aria-label={menuOpen ? "Close chapters menu" : "Open chapters menu"}
              aria-expanded={menuOpen}
              aria-controls="chapter-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex min-h-11 min-w-11 items-center justify-end gap-4 py-2 text-[12px] tracking-[0.17em] text-bone uppercase"
            >
              <span className="hidden md:inline">{menuOpen ? "Close" : "Chapters"}</span>
              <span aria-hidden="true" className="relative h-3.5 w-[22px]">
                <i
                  className={`absolute left-0 h-px w-[22px] bg-bone transition-all duration-500 motion-reduce:transition-none ${
                    menuOpen ? "top-[7px] rotate-45" : "top-[3px]"
                  }`}
                />
                <i
                  className={`absolute left-0 h-px bg-bone transition-all duration-500 motion-reduce:transition-none ${
                    menuOpen ? "top-[7px] w-[22px] -rotate-45" : "top-[10px] w-[15px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </header>

        {/* ───────────── Page (only the text slides; the portrait behind it never moves) ───────────── */}
        <main
          id="main"
          inert={menuOpen}
          className={`absolute inset-0 z-20 ${
            leaving === 0
              ? ""
              : `opacity-0 transition-[opacity,translate] duration-200 ease-in ${
                  leaving === 1 ? "-translate-x-10" : "translate-x-10"
                }`
          }`}
        >
          {children}
        </main>

        {/* ───────────── Footer ───────────── */}
        <footer
          inert={menuOpen}
          className="absolute inset-x-0 bottom-0 z-30 flex h-[72px] items-center justify-between px-[6%] sm:justify-end pb-[env(safe-area-inset-bottom)] md:h-[84px] md:px-[5%]"
        >
          <nav
            aria-label="Story chapters"
            className="absolute left-1/2 flex -translate-x-1/2 max-sm:static max-sm:translate-x-0"
          >
            {stops.map((stop, position) => (
              <TransitionLink
                key={stop.href}
                href={stop.href}
                aria-label={stop.label}
                aria-current={position === index ? "page" : undefined}
                className="group/dot flex h-11 w-7 items-center justify-center sm:w-8"
              >
                <span
                  className={`h-[5px] rounded-full border transition-all duration-500 motion-reduce:transition-none ${
                    position === index
                      ? "w-5 border-bone bg-bone"
                      : "w-[5px] border-mist group-hover/dot:border-bone"
                  }`}
                />
              </TransitionLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-[12px] tracking-[0.1em] text-bone">
            {index > 0 && (
              <TransitionLink
                href={stops[index - 1].href}
                aria-label="Previous chapter"
                className="hidden h-11 items-center sm:flex"
              >
                <Arrow back className="w-9" />
              </TransitionLink>
            )}
            <span aria-hidden="true">
              {counter} <i className="ml-1 not-italic text-mist">/ {String(stops.length).padStart(2, "0")}</i>
            </span>
            {index < last && (
              <TransitionLink href={stops[index + 1].href} aria-label="Next chapter" className="flex h-11 items-center">
                <Arrow className="w-9" />
              </TransitionLink>
            )}
          </div>
        </footer>

        {/* ───────────── Chapter menu ───────────── */}
        <nav
          id="chapter-menu"
          aria-label="Chapters"
          inert={!menuOpen}
          data-open={menuOpen}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-black px-[8%] pb-10 pt-24 transition-[clip-path] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(0_0_100%_0)] data-[open=true]:[clip-path:inset(0)] motion-reduce:transition-none md:px-[15%]"
        >
          {stops.map((stop, position) => (
            <TransitionLink
              key={stop.href}
              href={stop.href}
              aria-current={position === index ? "page" : undefined}
              style={{ transitionDelay: menuOpen ? `${300 + position * 70}ms` : "0ms" }}
              className={`group/item flex items-center gap-5 border-b border-line py-[min(2.2dvh,20px)] font-display text-[clamp(24px,min(3.4vw,5.6dvh),46px)] leading-tight text-bone transition-all duration-700 aria-[current=page]:italic aria-[current=page]:text-greige motion-reduce:transition-none md:gap-8 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="w-7 font-sans text-[12px] tracking-[0.1em] text-mist">{String(position + 1).padStart(2, "0")}</span>
              <span className="transition-transform duration-500 group-hover/item:translate-x-2 motion-reduce:transition-none">
                {stop.label}
              </span>
              <Arrow className="ml-auto w-10 text-mist transition-colors group-hover/item:text-bone" />
            </TransitionLink>
          ))}
        </nav>

        {/* ───────────── Loading curtain (first load of the home page): pure black ───────────── */}
        <div
          data-curtain
          aria-hidden={phase === "idle"}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black ${curtainClass[phase]}`}
        >
          {loaderVisible && (
            <>
              <Image src={logo} alt="" priority sizes="120px" className="h-[132px] w-auto md:h-[156px]" />
              <div className="mt-6 h-px w-32 overflow-hidden bg-line">
                <i className="block h-full origin-left animate-loader bg-greige" />
              </div>
            </>
          )}
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

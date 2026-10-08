import type { ReactNode } from "react";
import Arrow from "./Arrow";
import Portrait from "./Portrait";
import { Line, Rise } from "./Reveal";
import TransitionLink from "./TransitionLink";

type SceneProps = {
  variant: "home" | "chapter";
  eyebrow: ReactNode;
  lines: [string, string];
  cta: { href: string; label: string };
  children: ReactNode;
};

/** Copy on the left, portrait on the right. Used by the home page and every chapter. */
export default function Scene({ variant, eyebrow, lines, cta, children }: SceneProps) {
  return (
    <>
      <Portrait variant={variant} />

      <section className="absolute inset-0 z-20 flex flex-col px-[7%] pb-[88px] pt-24 [text-shadow:0_1px_14px_#000] max-md:overflow-y-auto max-md:overscroll-contain max-md:[scrollbar-width:none] max-md:[-webkit-mask-image:linear-gradient(to_bottom,#000_calc(100%_-_96px),transparent_calc(100%_-_72px))] max-md:[mask-image:linear-gradient(to_bottom,#000_calc(100%_-_96px),transparent_calc(100%_-_72px))] md:inset-y-0 md:left-[7%] md:right-auto md:w-[52%] md:max-w-[700px] md:px-0 md:pb-24 md:pt-24 md:[text-shadow:none] compact:md:pt-[84px] compact:md:pb-24">
        <div className="max-md:mt-auto md:my-auto">
          <Rise
            as="p"
            delay={80}
            className="mb-6 flex items-center gap-4 text-[13px] tracking-[0.1em] text-greige compact:mb-4 md:mb-[min(3.4dvh,2.25rem)]"
          >
            {eyebrow}
          </Rise>

          <h1
            tabIndex={-1}
            className="font-display text-[clamp(30px,9.8vw,54px)] font-normal leading-[0.97] tracking-[-0.03em] text-bone outline-none md:text-[clamp(48px,min(6.3vw,10.5dvh),112px)] md:leading-[0.92]"
          >
            <Line delay={120}>{lines[0]}</Line>
            <Line delay={200} className="italic text-greige">
              {lines[1]}
            </Line>
          </h1>

          <Rise
            delay={300}
            className="mt-6 max-w-[34rem] text-[15px] font-light leading-[1.85] text-silver compact:mt-4 compact:text-[14px] compact:leading-[1.7] md:mt-[min(3.2dvh,2.5rem)] md:text-[clamp(14px,min(1.08vw,1.9dvh),17px)]"
          >
            {children}
          </Rise>

          <Rise delay={380} className="mt-6 compact:mt-4 md:mt-[min(3.6dvh,2.75rem)]">
            <TransitionLink
              href={cta.href}
              className="group/cta inline-flex min-h-11 items-center gap-8 border-b border-bone/35 py-3 text-[12px] tracking-[0.17em] text-bone uppercase transition-colors duration-500 hover:border-bone"
            >
              <span>{cta.label}</span>
              <Arrow className="w-14 transition-transform duration-500 group-hover/cta:translate-x-1.5 motion-reduce:transition-none md:w-[70px]" />
            </TransitionLink>
          </Rise>
        </div>
      </section>
    </>
  );
}

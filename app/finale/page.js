import Arrow from "@/components/Arrow";
import { Line, Rise } from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";

export const metadata = { title: "The closing portrait" };

/*
 * Desktop: the name is set large and stacked on the left, the portrait (kept fixed by <Shell />) stands on the right,
 * so the type never touches the face. The tagline and link sit directly under the name.
 * Mobile: the portrait fills the screen; the name, tagline and link sit low, over the dark jacket.
 */
export default function FinalePage() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end px-[7%] pb-[88px] [text-shadow:0_1px_14px_#000] md:justify-center md:pb-0 md:pl-[6%] md:pr-[46%] md:pt-0 md:[text-shadow:none]">
      <h1
        tabIndex={-1}
        className="font-display text-[clamp(46px,15vw,84px)] font-normal leading-[0.92] tracking-[-0.035em] text-bone outline-none md:text-[clamp(56px,min(7.6vw,13.5dvh),140px)]"
      >
        <Line delay={120} className="text-[0.32em] italic leading-[1.4] tracking-[-0.01em] text-greige">
          Julio
        </Line>
        <Line delay={190}>Herrera</Line>
        <Line delay={260}>Velutini.</Line>
      </h1>

      <div className="pointer-events-auto mt-5 flex flex-col gap-5 md:mt-[min(5dvh,3.5rem)] md:gap-8">
        <Rise
          as="p"
          delay={420}
          className="max-w-[17rem] font-display text-[22px] italic leading-[1.3] text-silver md:max-w-[26rem] md:text-[clamp(22px,1.9vw,30px)]"
        >
          A heritage remembered. A horizon ahead.
        </Rise>

        <Rise delay={500}>
          <TransitionLink
            href="/"
            className="group/cta inline-flex min-h-11 items-center gap-6 border-b border-bone/35 py-3 text-[12px] tracking-[0.17em] text-bone uppercase transition-colors duration-500 hover:border-bone"
          >
            <Arrow back className="w-10 transition-transform duration-500 group-hover/cta:-translate-x-1.5 motion-reduce:transition-none" />
            <span>Return to the beginning</span>
          </TransitionLink>
        </Rise>
      </div>
    </div>
  );
}

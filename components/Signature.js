/*
 * The JHV mark, bottom-left, on every page.
 *
 * <Shell /> renders it once, next to the footer, so it is on all pages and it does not restart when
 * you change pages. The letters are typed text in a handwriting face (the Google font Whisper, see
 * app/layout.js), not an image - the same mark the loading curtain uses (LoaderSignature.js). The effect:
 * a short line, the letters writing themselves in from left to right, and a long line fading out to the right.
 *
 * Desktop and tablet only (md and up). On phones the footer row is already full.
 */

// Same height as the footer row, lifted 30px so the J's tail stays on screen (this is the area under the page button).
const row =
  "pointer-events-none absolute bottom-[30px] left-[7%] z-[25] hidden h-[72px] w-[34%] items-center select-none md:flex md:h-[84px]";

const lineBase =
  "block h-px origin-left [transform:scaleX(0)] motion-reduce:[transform:none] motion-safe:group-data-[ready=true]/app:animate-draw";

export default function Signature() {
  return (
    <div aria-hidden="true" className={row}>
      {/* short line before the letters */}
      <i
        data-reveal
        className={`${lineBase} w-[3.2%] min-w-8 shrink-0 bg-[#3a3a3a]`}
        style={{ animationDelay: "calc(var(--d, 0ms) + 900ms)", animationDuration: "0.8s" }}
      />

      {/* the letters: written in from the left. The box is exactly as wide as the ink of "JHV" (2.41em).
          Hidden until the write-in begins, so the J's overhang can't show on refresh. */}
      <span
        data-reveal
        className="invisible mx-[1.2%] block w-[2.41em] shrink-0 -translate-y-[0.117em] indent-[-0.03em] font-script text-[clamp(54px,min(5.7vw,10.7dvh),98px)] leading-none whitespace-nowrap text-greige [clip-path:inset(-30%_100%_-30%_-25%)] motion-reduce:visible motion-reduce:[clip-path:none] motion-safe:group-data-[ready=true]/app:visible motion-safe:group-data-[ready=true]/app:animate-sign"
        style={{
          animationDelay: "calc(var(--d, 0ms) + 1100ms)",
          // flips visibility on at exactly the same moment the animation delay ends
          transitionProperty: "visibility",
          transitionDuration: "1ms",
          transitionDelay: "calc(var(--d, 0ms) + 1100ms)",
        }}
      >
        JHV
      </span>

      {/* long line after the letters, fading out */}
      <i
        data-reveal
        className={`${lineBase} min-w-0 flex-1 bg-[linear-gradient(90deg,#3a3a3a,rgba(58,58,58,0.36))]`}
        style={{ animationDelay: "calc(var(--d, 0ms) + 1900ms)" }}
      />
    </div>
  );
}

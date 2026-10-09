import Image from "next/image";
import portrait from "@/public/images/julio-portrait.png";

/*
 * The cut-out portrait is ONE persistent layer, mounted once by <Shell /> behind every page.
 * It is never part of a page, so it does not unmount, slide, fade or re-animate when you change
 * pages: it stays exactly where it is. It only fades in once, when the site first opens.
 *
 * It always sits on the bottom edge of the screen. Its last ~15% is masked into the page black,
 * so the jacket dissolves into the background instead of ending on a hard line.
 */
const fade =
  "[-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_15%)] [mask-image:linear-gradient(to_top,transparent_0%,#000_15%)]";

export default function Portrait({ shown }) {
  return (
    <div
      className="pointer-events-none absolute top-[76px] bottom-0 left-0 z-10 w-full max-w-none select-none md:top-auto md:left-auto md:right-[2%] md:w-[min(58vw,calc(90dvh*1.1858))]"
    >
      {/* very faint studio light so the black jacket reads without looking pasted on */}
      <div className="absolute -inset-x-[8%] -top-[8%] bottom-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(185,178,165,0.085),transparent_62%)]" />
      <div
        data-reveal
        data-shown={shown}
        className="origin-bottom opacity-0 max-md:h-full motion-reduce:opacity-100 motion-safe:data-[shown=true]:animate-portrait"
        style={{ animationDelay: "var(--d, 0ms)" }}
      >
        <div className={`relative w-full max-md:h-full md:aspect-[1366/1152] ${fade}`}>
          <Image
            src={portrait}
            alt="Black-and-white studio portrait of a smiling man in a double-breasted tuxedo and bow tie"
            fill
            priority
            quality={90}
            sizes="(min-width: 768px) 58vw, 240vw"
            className="object-cover object-top md:object-contain md:object-bottom"
          />
        </div>
      </div>
      {/* Mobile only: the copy sits over the lower half of the photo, so darken it from the bottom up. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.9)_34%,rgba(0,0,0,0.45)_58%,transparent_80%)] md:hidden" />
    </div>
  );
}

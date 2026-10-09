/*
 * The JHV mark for the loading curtain. It replaces the old loading line.
 *
 * Same animation as the mark on the pages (see Signature.js): a line draws out on each side and the
 * letters are written in from left to right. The letters are typed text (the Google font Whisper,
 * see app/layout.js), not an image.
 *
 * Layout is symmetric: the letters sit in the exact centre and the two side lines have the same
 * length (flex-1 each). Only the loader uses this; the mark on the pages (Signature.js) is separate.
 *
 * It starts as soon as it mounts (the loader is on screen from the first frame), so it does not wait
 * for data-ready.
 */
const line = "block h-px min-w-0 flex-1 origin-left [transform:scaleX(0)] animate-draw";

export default function LoaderSignature() {
  return (
    <div aria-hidden="true" className="flex w-[min(86vw,520px)] items-center select-none">
      {/* left line */}
      <i className={`${line} bg-[#3a3a3a]`} style={{ animationDelay: "0ms", animationDuration: "700ms" }} />

      {/* the letters: centred, written in from the left.
          The box is exactly as wide as the ink of "JHV" in this font (2.41em) and indent-[-0.03em] pulls the
          J's left edge onto the box edge, so the word is truly centred between the two lines. The small upward
          shift puts the lines at the same height on the letters as in the design screenshot. */}
      <span
        className="mx-[3%] block w-[2.41em] shrink-0 -translate-y-[0.117em] indent-[-0.03em] font-script text-[min(13.6vw,82px)] leading-none whitespace-nowrap text-greige [clip-path:inset(-30%_100%_-30%_-25%)] animate-sign"
        style={{ animationDelay: "300ms", animationDuration: "1400ms" }}
      >
        JHV
      </span>

      {/* right line, same length as the left one */}
      <i
        className={`${line} bg-[linear-gradient(90deg,#3a3a3a,rgba(58,58,58,0.36))]`}
        style={{ animationDelay: "1000ms", animationDuration: "900ms" }}
      />
    </div>
  );
}

# Julio Herrera Velutini — editorial portrait (Next.js 16 + Tailwind CSS v4, plain JavaScript)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

- `app/` routes: `/`, `/[slug]` (4 chapters), `/finale`, 404
- `components/Shell.js` header, footer, chapter menu, the page transition and the first-load loader (pure black; it only plays when the home page is loaded, never on other pages)
- `components/Portrait.js` the cut-out image. It is mounted ONCE by `Shell.js` behind every page, so it never moves, fades or re-animates when you change pages. Bottom-anchored, last 15% masked into black
- `components/Signature.js` the JHV mark at the bottom-left of every page (typed text in the handwriting font Whisper (Google Fonts) from `app/fonts`, written in from the left; desktop and tablet only)
- `components/LoaderSignature.js` the same JHV mark for the first-load curtain (replaces the old loading line)
- `components/Scene.js` the text column of each page (scrolls instead of clipping on short screens)
- `lib/story.js` all copy lives here
- `public/images/logo-jhv.png` header + loader logo; `app/icon.png` and `app/apple-icon.png` are the favicons
- Styling is inline Tailwind utilities. `app/globals.css` only holds the colour tokens and keyframes.
- Fonts (Bodoni Moda + Jost) are self-hosted in `app/fonts` via `next/font/local`, so no network is needed.

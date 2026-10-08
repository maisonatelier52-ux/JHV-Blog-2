# Julio Herrera Velutini — editorial portrait (Next.js 16 + Tailwind CSS v4)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

- `app/` routes: `/`, `/[slug]` (4 chapters), `/finale`, 404
- `components/Shell.tsx` header, footer, chapter menu and the page-transition curtain (the loader only plays when the home page is loaded; never on other pages)
- `public/images/logo-jhv.png` header + loader logo (transparent PNG); `app/icon.png` and `app/apple-icon.png` are the favicons made from it
- `components/Portrait.tsx` the cut-out image: bottom-anchored, last 15% masked into black
- `lib/story.ts` all copy lives here
- Styling is inline Tailwind utilities. `app/globals.css` only holds the colour tokens and keyframes.
- Fonts (Bodoni Moda + Jost) are self-hosted in `app/fonts` via `next/font/local`, so no network is needed.

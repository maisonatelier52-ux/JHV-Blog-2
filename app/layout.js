import localFont from "next/font/local";
import Shell from "@/components/Shell";
import "./globals.css";

// Self-hosted variable fonts (latin subset): no Google Fonts request at build or run time.
const display = localFont({
  src: [
    { path: "./fonts/bodoni-moda-normal.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/bodoni-moda-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/jost.woff2",
  weight: "100 900",
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Julio Herrera Velutini",
    template: "%s — Julio Herrera Velutini",
  },
  description:
    "A short editorial journey through the individual, the heritage and the wider perspective of Julio Herrera Velutini.",
  // Kept from the original project. Remove this line when you are ready to be indexed.
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} bg-black`}>
      <body className="bg-black font-sans text-silver antialiased">
        {/* Without JavaScript there is nothing to lift the curtain or start the animations. */}
        <noscript>
          <style>{`[data-curtain]{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

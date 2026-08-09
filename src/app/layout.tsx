import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

// Load Inter font with greek subset for body copy
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
  display: "swap",
});

// Load Manrope font with greek subset for headings
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "greek"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Φυσικοθεραπεία | Sports-Physio.gr — Μιχάλης Σιούλης",
  description:
    "Επιστημονικά τεκμηριωμένη φυσικοθεραπεία από τον Μιχάλη Σιούλη. Συμβεβλημένος με ΕΟΠΥΥ. Βασισμένο σε 73 αξιολογήσεις 5 αστέρων στο Google. Κλείστε ραντεβού σε λιγότερο από 1 λεπτό.",
  alternates: {
    canonical: "https://sports-physio.gr",
  },
  // Icons live in /public rather than as app/ file conventions, so the whole
  // generated set (browser, iOS home screen, Android/PWA) stays in one place.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Φυσικοθεραπεία | Sports-Physio.gr — Μιχάλης Σιούλης",
    description:
      "Επιστημονικά τεκμηριωμένη φυσικοθεραπεία από τον Μιχάλη Σιούλη. Συμβεβλημένος με ΕΟΠΥΥ. Βασισμένο σε 73 αξιολογήσεις 5 αστέρων στο Google.",
    url: "https://sports-physio.gr",
    siteName: "Sports-Physio.gr",
    locale: "el_GR",
    type: "website",
    images: [
      {
        url: "https://sports-physio.gr/images/og-placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Φυσικοθεραπεία Sports-Physio.gr",
      },
    ],
  },
};

// Matches theme_color in site.webmanifest so the Android address bar and the
// installed PWA agree. themeColor is not valid in `metadata` since Next 14.
export const viewport: Viewport = {
  themeColor: "#1D4ED8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="el"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink-600 font-sans">
        <Header />
        <main className="flex-grow pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

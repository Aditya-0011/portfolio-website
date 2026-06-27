import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { env } from "@/lib/env";

import "./globals.css";

const font = localFont({
  src: "../public/fonts/SF-Pro.ttf",
});

export const metadata: Metadata = {
  keywords: [
    "Portfolio",
    "Home",
    "Projects",
    "About Me",
    "Aditya",
    "Aditya Punmiya",
    "Developer",
    "Web Development",
    "Web Developer",
    "Programming",
    "Engineering",
    "Software",
    "Software Engineer",
    "Software Developer",
    "Full Stack",
    "Full Stack Developer",
    "Backend",
    "Backend Developer",
    "Udaipur",
    "Coding",
    "Manipal University",
    "Manipal",
    "NAV",
    "NAV Fund Services",
    "NAV Backoffice",
    "NAV India",
    "Blowbits Solutions LLP",
    "Octa GST",
  ],
  authors: [
    {
      name: "Aditya Punmiya",
      url: "https://adityapunmiya.com",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-neutral-950 overflow-y-scroll ${font.className}`}
    >
      <head>
        <GoogleTagManager gtmId={env.G_TAG} />
        <GoogleAnalytics gaId={env.G_TAG} />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.CLARITY_KEY}");
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-100 -translate-y-full rounded-br-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-neutral-950 transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <Suspense>
          <SpeedInsights />
        </Suspense>
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  keywords: [
    "Portfolio",
    "Home",
    "Projects",
    "About Me",
    "Aditya",
    "Aditya Punmiya",
    "Developer",
    "Web Developement",
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
    "NAV Fund Administration Group",
    "NAV Backoffice",
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
      className="scrollbar-thin scrollbar-track-neutral-950 scrollbar-thumb-neutral-900 overflow-y-scroll"
    >
      <head>
        <GoogleTagManager gtmId={process.env.G_TAG as string} />
        <GoogleAnalytics gaId={process.env.G_TAG as string} />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.CLARITY_KEY as string}");
          `}
        </Script>
      </head>
      <body className={`${inter.className}overflow-x-hidden`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

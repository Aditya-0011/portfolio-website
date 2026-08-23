import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Aditya Punmiya",
  description: "Privacy policy for Aditya Punmiya's portfolio.",
  metadataBase: new URL("https://adityapunmiya.com/privacy"),
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Aditya Punmiya",
    description: "Privacy policy for Aditya Punmiya's portfolio.",
    siteName: "Aditya Punmiya",
    type: "website",
    url: "https://adityapunmiya.com/privacy",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
};

export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="prose prose-invert prose-lg max-w-none text-white/80">
          <p>
            At Aditya Punmiya&apos;s Portfolio (adityapunmiya.com), your privacy
            is important. This policy outlines how information is collected,
            used, and protected when you visit this website.
          </p>

          <h2>Data Collection and Usage</h2>
          <ul>
            <li>
              <strong>Analytics:</strong> We use Vercel Analytics, Google
              Analytics, and Microsoft Clarity to understand how visitors
              interact with the website. These services may collect anonymous
              usage data, including pages visited, browser type, and rough
              geographic location.
            </li>
            <li>
              <strong>Contact Form:</strong> If you use the contact form, the
              information you provide (name, email, message) is used solely to
              respond to your inquiry. We do not sell or share this information
              with third parties.
            </li>
            <li>
              <strong>Cookies:</strong> Our analytics providers and
              spam-protection services (like Cloudflare Turnstile) may use
              cookies or similar technologies to function properly.
            </li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We rely on third-party services which have their own privacy
            policies:
          </p>
          <ul>
            <li>Vercel (Hosting & Analytics)</li>
            <li>Google Analytics</li>
            <li>Microsoft Clarity</li>
            <li>Cloudflare Turnstile (Bot protection)</li>
          </ul>

          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            me via the{" "}
            <Link href="/contact" className="text-emerald-400 hover:underline">
              Contact Page
            </Link>{" "}
            or by{" "}
            <a
              href="mailto:adityapunmiya@gmail.com"
              className="text-emerald-400 hover:underline"
            >
              Email
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

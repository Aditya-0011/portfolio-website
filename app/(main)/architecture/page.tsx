import { cacheLife } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Architecture | Aditya Punmiya",
  description: "Platform Architecture & Engineering",
  metadataBase: new URL("https://adityapunmiya.com/architecture"),
  openGraph: {
    title: "Architecture | Aditya Punmiya",
    description: "Platform Architecture & Engineering",
    siteName: "Aditya Punmiya",
    type: "website",
    url: "https://adityapunmiya.com/architecture",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture | Aditya Punmiya",
    description: "Platform Architecture & Engineering",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
};

export default async function Architecture() {
  "use cache";
  cacheLife("days");

  const res = await fetch(env.ARCHITECTURE_URL);

  if (!res.ok) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-12">
        <h1 className="text-3xl font-bold text-white">
          Failed to load architecture doc.
        </h1>
      </div>
    );
  }

  const markdown = await res.text();

  return (
    <div className="relative overflow-hidden py-8 sm:py-16">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="prose prose-invert prose-rose prose-code:before:content-none prose-code:after:content-none prose-blockquote:font-normal prose-blockquote:not-italic prose-img:rounded-xl prose-img:shadow-2xl max-w-none text-base leading-relaxed text-pretty text-white/70 [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none">
          <ReactMarkdown
            components={{
              ul: ({ className, ...props }) => (
                <ul
                  className={`list-disc pl-4 marker:text-rose-500 ${className ?? ""}`}
                  {...props}
                />
              ),
              ol: ({ className, ...props }) => (
                <ol
                  className={`list-decimal pl-4 ${className ?? ""}`}
                  {...props}
                />
              ),
              a: ({ href, children }) => (
                <Link
                  href={href!}
                  target="_blank"
                  className="relative font-semibold text-blue-400 no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-0 before:bg-rose-400 before:transition-[width] before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-rose-400 hover:before:w-full has-[code]:before:hidden has-[code]:after:hidden [&_code]:before:absolute [&_code]:before:bottom-[1.5px] [&_code]:before:left-1.5 [&_code]:before:z-10 [&_code]:before:h-px [&_code]:before:w-0 [&_code]:before:bg-rose-400 [&_code]:before:transition-[width] [&_code]:before:duration-300 [&_code]:before:content-['']! [&_code]:after:absolute [&_code]:after:inset-x-1.5 [&_code]:after:bottom-[1.5px] [&_code]:after:h-px [&_code]:after:bg-blue-400 [&_code]:after:content-['']! hover:[&_code]:text-rose-400 hover:[&_code]:before:w-[calc(100%-0.75rem)]"
                >
                  {children}
                </Link>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className?.includes("language-");
                return isInline ? (
                  <code
                    className="relative overflow-hidden rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] font-medium transition-colors duration-300"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img: ({ className, alt, src }) => (
                <Image
                  alt={alt ?? "Architecture Diagram"}
                  src={src as string}
                  width={1200}
                  height={800}
                  className={`h-auto w-full object-contain ${className ?? ""}`}
                  priority
                  unoptimized={
                    typeof src === "string" ? src.endsWith(".gif") : false
                  }
                />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

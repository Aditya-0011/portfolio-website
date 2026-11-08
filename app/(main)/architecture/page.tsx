import ReactMarkdown from "react-markdown";

import { GetArchitectureDoc } from "@/data/architecture";
import { architectureMarkdownComponents } from "@/lib/markdown-components";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Architecture",
  description: "Platform Architecture & Engineering",
  path: "/architecture",
});

export default async function Architecture() {
  const markdown = await GetArchitectureDoc();

  return (
    <div className="relative overflow-hidden py-8 sm:py-16">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="prose prose-invert prose-rose prose-code:before:content-none prose-code:after:content-none prose-blockquote:font-normal prose-blockquote:not-italic prose-img:rounded-xl prose-img:shadow-2xl max-w-none text-base leading-relaxed text-pretty text-white/70 [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none">
          <ReactMarkdown components={architectureMarkdownComponents}>
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

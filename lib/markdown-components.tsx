import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";
import type { Components } from "react-markdown";

type AnchorProps = ComponentProps<"a"> & { node?: unknown };

const isExternal = (href: string) => /^(https?:)?\/\//i.test(href);

function MarkdownLink({
  href,
  children,
  className,
  node,
  ...props
}: AnchorProps) {
  void node;
  if (!href) {
    return <span className={className}>{children}</span>;
  }

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

const inlineCode: Components["code"] = ({
  className,
  children,
  node,
  ...props
}) => {
  void node;
  const isInline = !className?.includes("language-");
  return isInline ? (
    <code
      className="relative rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] font-medium"
      {...props}
    >
      {children}
    </code>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const defaultMarkdownComponents: Components = {
  ul: ({ className, node, ...props }) => {
    void node;
    return (
      <ul
        className={`list-disc pl-4 marker:text-emerald-500 ${className ?? ""}`}
        {...props}
      />
    );
  },
  ol: ({ className, node, ...props }) => {
    void node;
    return <ol className={`list-decimal pl-4 ${className ?? ""}`} {...props} />;
  },
  a: ({ className, ...props }) => (
    <MarkdownLink
      className={`relative rounded-sm font-semibold text-white no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-emerald-400 before:transition-transform before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-emerald-400 hover:before:scale-x-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none has-[code]:before:hidden has-[code]:after:hidden ${
        className ?? ""
      }`}
      {...props}
    />
  ),
  code: inlineCode,
};

export const experienceMarkdownComponents: Components = {
  ul: ({ className, node, ...props }) => {
    void node;
    return <ul className={`list-disc pl-4 ${className ?? ""}`} {...props} />;
  },
  ol: defaultMarkdownComponents.ol,
  a: ({ className, ...props }) => (
    <MarkdownLink
      className={`font-semibold text-emerald-400 underline decoration-transparent transition-[color,text-decoration-color] duration-300 hover:text-emerald-300 hover:decoration-emerald-400 ${
        className ?? ""
      }`}
      {...props}
    />
  ),
  code: inlineCode,
};

export const aboutMeMarkdownComponents: Components = {
  a: ({ className, ...props }) => (
    <MarkdownLink
      className={`relative font-semibold text-white no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-0 before:bg-emerald-400 before:transition-[width] before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-emerald-400 hover:before:w-full ${
        className ?? ""
      }`}
      {...props}
    />
  ),
};

export const architectureMarkdownComponents: Components = {
  ul: ({ className, node, ...props }) => {
    void node;
    return (
      <ul
        className={`list-disc pl-4 marker:text-rose-500 ${className ?? ""}`}
        {...props}
      />
    );
  },
  ol: defaultMarkdownComponents.ol,
  a: (props) => (
    <MarkdownLink
      {...props}
      className="relative font-semibold text-blue-400 no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-0 before:bg-rose-400 before:transition-[width] before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-rose-400 hover:before:w-full has-[code]:before:hidden has-[code]:after:hidden [&_code]:before:absolute [&_code]:before:bottom-[1.5px] [&_code]:before:left-1.5 [&_code]:before:z-10 [&_code]:before:h-px [&_code]:before:w-0 [&_code]:before:bg-rose-400 [&_code]:before:transition-[width] [&_code]:before:duration-300 [&_code]:before:content-['']! [&_code]:after:absolute [&_code]:after:inset-x-1.5 [&_code]:after:bottom-[1.5px] [&_code]:after:h-px [&_code]:after:bg-blue-400 [&_code]:after:content-['']! hover:[&_code]:text-rose-400 hover:[&_code]:before:w-[calc(100%-0.75rem)]"
    />
  ),
  code: ({ className, children, node, ...props }) => {
    void node;
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
  img: ({ className, alt, src }) => {
    if (typeof src !== "string" || !src) return null;
    return (
      <Image
        alt={alt ?? "Architecture Diagram"}
        src={src}
        width={1200}
        height={800}
        className={`h-auto w-full object-contain ${className ?? ""}`}
        unoptimized={src.endsWith(".gif") || src.endsWith(".svg")}
        loading="eager"
        fetchPriority="high"
      />
    );
  },
};

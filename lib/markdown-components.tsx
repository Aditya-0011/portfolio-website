import React from "react";
import Link from "next/link";
import type { Components } from "react-markdown";

export const defaultMarkdownComponents: Components = {
  ul: ({ className, ...props }) => (
    <ul
      className={`list-disc pl-4 marker:text-emerald-500 ${className ?? ""}`}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol className={`list-decimal pl-4 ${className ?? ""}`} {...props} />
  ),
  a: ({ href, children, className, ...props }) => (
    <Link
      href={href ?? "#"}
      target="_blank"
      className={`relative rounded-sm font-semibold text-white no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-emerald-400 before:transition-transform before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-emerald-400 hover:before:scale-x-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none has-[code]:before:hidden has-[code]:after:hidden ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </Link>
  ),
  code: ({ className, children, ...props }) => {
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
  },
};

export const experienceMarkdownComponents: Components = {
  ul: ({ className, ...props }) => (
    <ul className={`list-disc pl-4 ${className ?? ""}`} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={`list-decimal pl-4 ${className ?? ""}`} {...props} />
  ),
  a: ({ href, children, className, ...props }) => (
    <Link
      href={href ?? "#"}
      target="_blank"
      className={`font-semibold text-emerald-400 underline decoration-transparent transition-[color,text-decoration-color] duration-300 hover:text-emerald-300 hover:decoration-emerald-400 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </Link>
  ),
  code: defaultMarkdownComponents.code,
};

export const aboutMeMarkdownComponents: Components = {
  a: ({ href, children, className, ...props }) => (
    <Link
      href={href ?? "#"}
      className={`relative font-semibold text-white no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-0 before:bg-emerald-400 before:transition-[width] before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-emerald-400 hover:before:w-full ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </Link>
  ),
};

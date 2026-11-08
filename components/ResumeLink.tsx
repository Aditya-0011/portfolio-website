"use client";

import type { ComponentProps } from "react";

type ClarityWindow = Window & {
  clarity?: (command: "event", name: string) => void;
};

export default function ResumeLink(props: Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      {...props}
      href="/resume.pdf"
      onClick={(event) => {
        (window as ClarityWindow).clarity?.("event", "resume_view");
        props.onClick?.(event);
      }}
    />
  );
}

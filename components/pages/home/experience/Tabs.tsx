"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = {
  id: number;
  label: ReactNode;
  dates: ReactNode;
  panel: ReactNode;
};

type Props = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: Props) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="mt-8 md:grid md:grid-cols-12 md:gap-8">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Companies"
        className="col-span-4 hidden space-y-2 md:block"
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, i) => {
          const selected = active === i;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-[border-color,background-color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-[0.97] ${
                selected
                  ? "scale-[1.01] border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  : "border-white/5 bg-neutral-900/40 backdrop-blur-xl hover:border-emerald-500/30 hover:bg-white/5"
              }`}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="relative border-l-2 border-blue-500/30 md:col-span-8 md:border-l-0">
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            id={`${baseId}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${i}`}
            className={`group mb-10 ml-5 sm:ml-6 md:m-0 ${active === i ? "md:tab-content-enter" : "md:hidden"}`}
          >
            <div className="absolute -left-2.5 h-5 w-5 rounded-full border-4 border-neutral-950 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-[background-color,box-shadow] duration-200 ease-out group-hover:bg-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)] md:hidden"></div>
            <div className="mb-2 ml-1 text-sm leading-none font-normal text-blue-300/80 md:hidden">
              {tab.dates}
            </div>
            {tab.panel}
          </div>
        ))}
      </div>
    </div>
  );
}

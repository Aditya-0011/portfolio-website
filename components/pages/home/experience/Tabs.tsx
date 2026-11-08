"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = {
  id: number;
  label: ReactNode;
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

  const current = tabs[active];

  return (
    <div className="mt-8 hidden gap-8 md:grid md:grid-cols-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Companies"
        className="col-span-4 space-y-2"
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
              aria-controls={`${baseId}-panel`}
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
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="col-span-8"
      >
        {current ? (
          <div key={current.id} className="tab-content-enter">
            {current.panel}
          </div>
        ) : null}
      </div>
    </div>
  );
}

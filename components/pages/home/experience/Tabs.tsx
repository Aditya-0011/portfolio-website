"use client";

import {
  useId,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type Tab = {
  id: number;
  label: ReactNode;
  dates: ReactNode;
  panel: ReactNode;
};

type Props = {
  tabs: Tab[];
};

const DESKTOP_QUERY = "(min-width: 48rem)";

const subscribeDesktop = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

const getServerDesktop = () => false;

export default function Tabs({ tabs }: Props) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktop,
    getServerDesktop,
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number;
    if (event.key === "ArrowDown") next = (active + 1) % tabs.length;
    else if (event.key === "ArrowUp")
      next = (active - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
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
            role={isDesktop ? "tabpanel" : undefined}
            aria-labelledby={isDesktop ? `${baseId}-tab-${i}` : undefined}
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

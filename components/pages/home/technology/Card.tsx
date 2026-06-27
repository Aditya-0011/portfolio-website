import { getTechnologyCategoryLabel } from "@/lib/utils";
import { type Technology, type TechnologyCategory } from "@/lib/objects";

import TechnologyIcon from "@/components/TechnologyIcon";

type Props = {
  Category: TechnologyCategory;
  Technologies: Technology[];
};

export default function Card({ Category, Technologies }: Props) {
  return (
    <li
      id={Category.toString()}
      className="group relative mb-6 break-inside-avoid rounded-2xl border border-white/5 bg-neutral-900/40 p-6 shadow-lg backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative z-10 flex max-w-7xl items-center justify-between border-b border-red-500/30 pb-3">
        <div className="text-xl font-bold tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white">
          {getTechnologyCategoryLabel(Category)}
        </div>
      </div>

      <ul
        role="list"
        className="relative z-10 mx-auto mt-6 grid grid-cols-3 place-items-center gap-6 text-center lg:mx-0 lg:max-w-none"
      >
        {Technologies.map((technology: Technology) => (
          <li
            key={technology.id}
            className="group/tech relative flex w-full cursor-pointer items-center justify-center rounded-xl p-2 transition-colors duration-300 sm:hover:bg-white/5"
          >
            <div
              className="flex w-full items-center justify-center"
              tabIndex={0}
            >
              <TechnologyIcon
                technology={technology}
                className="h-8 w-8 rounded-xs object-contain transition-transform duration-300 group-hover/tech:scale-110"
              />
            </div>
            <span className="pointer-events-none absolute -top-6 left-1/2 z-20 mb-1 w-max -translate-x-1/2 transform rounded-md bg-neutral-800/90 px-2 py-1 text-xs font-semibold text-emerald-300 opacity-0 shadow-xl ring ring-emerald-400/50 backdrop-blur-md transition-opacity duration-200 group-focus-within/tech:opacity-100 group-hover/tech:opacity-100 group-active/tech:opacity-100 sm:-top-8">
              {technology.name}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

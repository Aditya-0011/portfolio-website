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
      className="group relative mb-6 break-inside-avoid rounded-2xl bg-neutral-900/40 p-6 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex max-w-7xl items-center justify-between border-b border-red-500/30 pb-3">
        <div className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors duration-300">
          {getTechnologyCategoryLabel(Category)}
        </div>
      </div>

      <ul
        role="list"
        className="relative z-10 mx-auto mt-6 grid grid-cols-3 place-items-center gap-6 text-center lg:mx-0 lg:max-w-none"
      >
        {Technologies.map((technology: Technology) => (
          <li
            key={technology._id}
            className="relative flex w-full items-center justify-center p-2 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
          >
            <div
              className="peer flex w-full items-center justify-center"
              tabIndex={0}
            >
              <TechnologyIcon
                technology={technology}
                className="h-8 w-8 rounded-xs object-contain transition-transform duration-300 peer-hover:scale-110"
              />
            </div>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity duration-300 peer-hover:opacity-100 peer-focus:opacity-100 rounded-md bg-neutral-800/90 backdrop-blur-md px-2 py-1 text-xs font-semibold text-emerald-300 shadow-xl border border-white/10 z-20">
              {technology.name}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

"use client";

import Image from "next/image";

import { getTechnologyCategoryLabel } from "@/lib/utils";
import { type Technology, type TechnologyCategory } from "@/lib/objects";

type Props = {
  Category: TechnologyCategory;
  Technologies: Technology[];
};

export default function Card({ Category, Technologies }: Props) {
  return (
    <li
      id={Category.toString()}
      className="mb-4 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75"
    >
      <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500 pb-1">
        <div className="text-lg leading-8 font-semibold tracking-tight text-white">
          {getTechnologyCategoryLabel(Category)}
        </div>
      </div>

      <ul
        role="list"
        className="mx-auto mt-8 grid grid-cols-3 place-items-center gap-9 text-center lg:mx-0 lg:max-w-none"
      >
        {Technologies.map((technology: Technology) => (
          <li
            key={technology._id}
            className="relative flex min-h-8 w-full items-center justify-center"
          >
            <div
              className="group flex w-full cursor-pointer items-center justify-center"
              tabIndex={0}
            >
              <Image
                src={technology.imageUrl}
                height={32}
                width={32}
                className="h-8 w-8 rounded-xs object-contain group-hover:hidden group-focus:hidden"
                alt={technology?.name}
                unoptimized={technology.imageUrl.endsWith(".gif")}
                onError={(event) => {
                  const fallback = technology.fallbackImageUrl;
                  if (event.currentTarget.src !== fallback) {
                    event.currentTarget.src = fallback;
                  }
                }}
                priority
              />
              <span className="hidden w-fit rounded-md bg-transparent p-1 text-center text-sm font-medium wrap-break-word whitespace-pre-line text-emerald-300 opacity-100 backdrop-blur-sm group-hover:block group-focus:block">
                {technology.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

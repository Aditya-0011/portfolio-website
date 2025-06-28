"use client";

import { useState } from "react";

import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/lib/objects";
import { formatMonth } from "@/lib/utils";

export function ExperienceTabs({ experiences }: { experiences: Experience[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="relative mt-8 border-l-2 border-blue-500/30 md:hidden">
        {experiences.map((xp, i) => (
          <div key={xp._id} className="mb-10 ml-6">
            <div className="absolute -left-[9px] h-4 w-4 rounded-full border-2 border-neutral-950 bg-blue-500"></div>
            <div className="mb-2 ml-1 text-sm leading-none font-normal text-blue-300/80">
              {formatMonth(xp.start)}&nbsp;&ndash;&nbsp;
              {xp.end ? formatMonth(xp.end) : "Present"}
            </div>
            <ExperienceCard xp={xp} compact={true} />
          </div>
        ))}
      </div>
      <div className="mt-8 hidden gap-8 md:grid md:grid-cols-12">
        <div className="col-span-4 space-y-2">
          {experiences.map((xp, i) => (
            <button
              key={xp._id}
              className={`w-full rounded-lg border p-4 text-left transition-all ${
                active === i
                  ? "border-blue-500/30 bg-blue-500/10 shadow-md"
                  : "border-neutral-800 hover:bg-blue-500/5"
              }`}
              onClick={() => setActive(i)}
              type="button"
            >
              <div className="flex items-center space-x-3">
                <div>
                  <h3
                    className={`font-medium ${
                      active === i ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {xp.position}
                  </h3>
                  <p className="text-sm text-white/60">
                    {xp.company.split(",")[0]}
                    <br />
                    <span className="text-xs">
                      {xp.company.split(",")[1]?.trim()}
                    </span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="col-span-8">
          <ExperienceCard xp={experiences[active]} />
        </div>
      </div>
    </>
  );
}

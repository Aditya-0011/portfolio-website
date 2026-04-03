"use client";

import { useState } from "react";

import { formatMonthYear } from "@/lib/utils";
import { type Experience } from "@/lib/objects";

import Card from "@/components/pages/home/experience/Card";

type Props = {
  experiences: Experience[];
};

export default function Timeline({ experiences }: Props) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="relative mt-8 border-l-2 border-blue-500/30 md:hidden">
        {experiences.map((experience) => (
          <div key={experience._id} className="group mb-10 ml-6">
            <div className="absolute -left-2.5 h-5 w-5 rounded-full border-4 border-neutral-950 bg-blue-500 group-hover:bg-emerald-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-500"></div>
            <div className="mb-2 ml-1 text-sm leading-none font-normal text-blue-300/80">
              {formatMonthYear(experience.start)}&nbsp;-&nbsp;
              {experience.end ? formatMonthYear(experience.end) : "Present"}
            </div>
            <Card experience={experience} compact={true} />
          </div>
        ))}
      </div>
      <div className="mt-8 hidden gap-8 md:grid md:grid-cols-12">
        <div className="col-span-4 space-y-2">
          {experiences.map((experience, i) => (
            <button
              key={experience._id}
              className={`w-full relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                active === i
                  ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.02]"
                  : "border-white/5 bg-neutral-900/40 hover:bg-white/5 hover:border-emerald-500/30 backdrop-blur-xl"
              }`}
              onClick={() => setActive(i)}
              type="button"
            >
              <div className="flex items-center space-x-3">
                <div>
                  <h3
                    className={`font-semibold text-lg transition-colors duration-300 ${
                      active === i ? "text-emerald-400" : "text-white/90"
                    }`}
                  >
                    {experience.company.split(",")[0]}
                  </h3>
                  <p className="text-sm text-white/60">
                    {experience.positions[0]?.role}
                    <br />
                    <span className="text-xs">
                      {experience.company.split(",")[1]?.trim()}
                    </span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="col-span-8">
          <Card experience={experiences[active]} />
        </div>
      </div>
    </>
  );
}

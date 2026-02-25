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
          <div key={experience._id} className="mb-10 ml-6">
            <div className="absolute -left-2.25 h-4 w-4 rounded-full border-2 border-neutral-950 bg-blue-500"></div>
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
                    {experience.company.split(",")[0]}
                  </h3>
                  <p className="text-sm text-white/60">
                    {/* Display the most recent position role below the company */}
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

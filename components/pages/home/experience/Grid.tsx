import { GetExperiences } from "@/data/experiences";
import { formatMonthYear } from "@/lib/utils";

import Card from "@/components/pages/home/experience/Card";
import Tabs from "@/components/pages/home/experience/Tabs";

export default async function Grid() {
  const { experiences } = await GetExperiences();

  return (
    <div className="py-8 sm:py-16" id="experience">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here’s my professional journey so far.
          </p>
        </div>

        <div className="relative mt-8 border-l-2 border-blue-500/30 md:hidden">
          {experiences.map((experience) => (
            <div key={experience.id} className="group mb-10 ml-6">
              <div className="absolute -left-2.5 h-5 w-5 rounded-full border-4 border-neutral-950 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-[background-color,box-shadow] duration-200 ease-out group-hover:bg-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
              <div className="mb-2 ml-1 text-sm leading-none font-normal text-blue-300/80">
                {formatMonthYear(experience.start)}&nbsp;-&nbsp;
                {experience.end ? formatMonthYear(experience.end) : "Present"}
              </div>
              <Card experience={experience} compact={true} />
            </div>
          ))}
        </div>

        <Tabs
          tabs={experiences.map((experience) => ({
            id: experience.id,
            label: (
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-lg font-semibold text-white/90 transition-colors duration-150 group-aria-selected:text-emerald-400">
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
            ),
            panel: <Card experience={experience} />,
          }))}
        />
      </div>
    </div>
  );
}

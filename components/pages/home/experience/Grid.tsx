import { GetExperiences } from "@/data/experiences";

import Timeline from "@/components/pages/home/experience/Timeline";

export default async function Grid() {
  const experiences = await GetExperiences();

  return (
    <div className="py-8 sm:py-16" id="experience">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here&apos;s my professional journey so far.
          </p>
        </div>
        <Timeline experiences={experiences} />
      </div>
    </div>
  );
}

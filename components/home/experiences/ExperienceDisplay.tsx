import { Suspense } from "react";

import { ExperienceTabs } from "./ExperienceTabs";
import { Experience } from "@/lib/objects";
import getExperiences from "./data";

export default async function ExperienceDisplay() {
  const experiences: Experience[] = await getExperiences();

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
        <Suspense fallback={<div>Loading...</div>}>
          <ExperienceTabs experiences={experiences} />
        </Suspense>
      </div>
    </div>
  );
}

import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/types/project";
import getExperiences from "./data";

export default async function ExperienceDisplay() {
  const experiences: Experience[] = await getExperiences();

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here&apos;s my professional journey so far.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-5 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {experiences.map((xp, i) => (
            <ExperienceCard key={`${xp._id}-${i}`} xp={xp} />
          ))}
        </ul>
      </div>
    </div>
  );
}

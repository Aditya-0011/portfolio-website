import TechnologyCard from "./TechnologyCard";
import { Technology, Category } from "@/types/project";
import getTechnologies from "./data";

export default async function TechnologyDisplay() {
  const technologies: Technology[] = await getTechnologies();

  const categories: Category[] = [
    "lang",
    "frontend",
    "backend",
    "db",
    "tool",
    "acad",
  ];

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technology
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here&apos;s what I typically work with.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] md:columns-2 lg:columns-3"
        >
          {categories.map((category, i) => (
            <TechnologyCard
              key={i}
              category={category}
              technologies={technologies.filter(
                (tech) => tech.category === category,
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

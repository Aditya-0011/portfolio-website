import { GetTechnologies } from "@/data/technologies";
import { TechnologyCategory } from "@/lib/objects";

import Card from "@/components/pages/home/technology/Card";

export default async function Grid() {
  const { technologies } = await GetTechnologies();

  const categories = Object.values(TechnologyCategory)
    .filter(
      (category) =>
        category !== TechnologyCategory.Invalid &&
        category !== TechnologyCategory.None,
    )
    .sort((left, right) => {
      const leftOrder = left === TechnologyCategory.Language ? 0 : left;
      const rightOrder = right === TechnologyCategory.Language ? 0 : right;

      return leftOrder - rightOrder;
    });

  const groups = categories
    .map((category) => ({
      category,
      items: technologies.filter((tech) => tech.category === category),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8" id="technologies">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technology
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here’s what I typically work with.
          </p>
        </div>
        {groups.length === 0 ? (
          <p className="mt-6 text-sm text-white/55">
            No technologies listed yet.
          </p>
        ) : null}
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3"
        >
          {groups.map(({ category, items }) => (
            <Card key={category} Category={category} Technologies={items} />
          ))}
        </ul>
      </div>
    </div>
  );
}

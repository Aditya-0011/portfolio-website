import Image from "next/image";
import { Technology, Category } from "@/lib/objects";

interface Props {
  category: Category;
  technologies: Technology[];
}

export default async function TechnologyCard({
  category,
  technologies,
}: Props) {
  return (
    <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
      <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
        <div className="text-lg leading-8 font-semibold tracking-tight text-white">
          {category === "lang"
            ? "Languages"
            : category === "frontend"
              ? "Frontend"
              : category === "backend"
                ? "Backend"
                : category === "db"
                  ? "Databases"
                  : category === "tool"
                    ? "Tools"
                    : "Academic"}
        </div>
      </div>
      <ul
        role="list"
        className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
      >
        {technologies.map((technology: Technology) => (
          <li key={technology._id} className="relative">
            <div className="group inline-block">
              <Image
                src={technology.imageUrl}
                height={32}
                width={32}
                className="mx-auto rounded-xs group-hover:hidden"
                alt={technology.name}
                priority
              />
              <span className="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur-sm group-hover:inline">
                {technology.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

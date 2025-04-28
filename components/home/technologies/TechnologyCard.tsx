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
          <li key={technology._id} className="group relative mx-auto h-8 w-8">
            <input
              type="radio"
              name="tech-tooltip"
              className="peer absolute z-10 h-full w-full cursor-pointer opacity-0"
            />
            <Image
              src={technology.imageUrl}
              height={32}
              width={32}
              className="mx-auto rounded-sm"
              alt={technology.name}
              priority
            />
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 w-max -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-sm text-white opacity-0 shadow-lg backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 peer-checked:opacity-100 peer-hover:opacity-100 peer-focus-visible:opacity-100">
              {technology.name}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

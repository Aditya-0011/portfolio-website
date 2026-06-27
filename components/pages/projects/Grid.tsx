import { type Project } from "@/lib/objects";
import Card from "@/components/pages/projects/Card";

type Props = {
  Heading: string;
  Description?: string;
  projects: Project[];
  children?: React.ReactNode;
};

export default function Grid({
  Heading,
  Description,
  projects,
  children,
}: Props) {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {Heading}
          </h2>
          {Description ? (
            <p className="mt-2 text-lg leading-8 text-white">{Description}</p>
          ) : null}
        </div>
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3"
        >
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}

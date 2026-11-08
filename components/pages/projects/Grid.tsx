import { type Project } from "@/lib/objects";
import Card from "@/components/pages/projects/Card";

const EAGER_CARDS = 3;

type Props = {
  Heading: string;
  headingLevel?: "h1" | "h2";
  Description?: string;
  projects: Project[];
  aboveTheFold?: boolean;
  children?: React.ReactNode;
};

export default function Grid({
  Heading,
  headingLevel: HeadingTag = "h2",
  Description,
  projects,
  aboveTheFold = false,
  children,
}: Props) {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <HeadingTag className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {Heading}
          </HeadingTag>
          {Description ? (
            <p className="mt-2 text-lg leading-8 text-white">{Description}</p>
          ) : null}
        </div>
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3"
        >
          {projects.map((project, position) => (
            <Card
              key={project.id}
              project={project}
              eager={aboveTheFold && position < EAGER_CARDS}
              highPriority={aboveTheFold && position === 0}
              headingLevel={HeadingTag === "h1" ? "h2" : "h3"}
            />
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}

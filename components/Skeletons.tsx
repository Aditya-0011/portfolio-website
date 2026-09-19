export function AboutMeSkeleton() {
  return (
    <div className="relative overflow-hidden py-8 sm:py-16">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 sm:px-8 md:flex-row lg:gap-16">
        <div className="z-10 flex w-full animate-pulse flex-col gap-8 md:w-[60%]">
          <div className="space-y-3">
            <div className="h-12 w-3/4 rounded-xl bg-white/5 sm:h-16" />
            <div className="h-10 w-1/2 rounded-xl bg-white/5 sm:h-12" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-5 w-full rounded-lg bg-white/5" />
            <div className="h-5 w-11/12 rounded-lg bg-white/5" />
            <div className="h-5 w-4/5 rounded-lg bg-white/5" />
          </div>
        </div>

        <div className="relative z-10 hidden h-96 w-[40%] items-center justify-center md:flex lg:h-full">
          <div className="h-64 w-64 animate-pulse rounded-full border border-white/5 bg-white/5 p-1 md:h-80 md:w-80" />
        </div>
      </div>
    </div>
  );
}

export function TechnologyGridSkeleton() {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl animate-pulse px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <div className="h-9 w-48 rounded-lg bg-white/5" />
          <div className="mt-3 h-6 w-64 rounded-lg bg-white/5" />
        </div>
        <div className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-52 break-inside-avoid rounded-2xl border border-white/5 bg-neutral-900/40 p-6"
            >
              <div className="h-6 w-32 rounded-md bg-white/5" />
              <div className="mt-6 grid grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div
                    key={j}
                    className="mx-auto h-10 w-10 rounded-lg bg-white/5"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceGridSkeleton() {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl animate-pulse px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <div className="h-9 w-52 rounded-lg bg-white/5" />
          <div className="mt-3 h-6 w-72 rounded-lg bg-white/5" />
        </div>
        <div className="mt-8 hidden gap-8 md:grid md:grid-cols-12">
          <div className="col-span-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-white/5 bg-neutral-900/40 p-4"
              >
                <div className="h-5 w-28 rounded-md bg-white/5" />
                <div className="mt-2 h-4 w-40 rounded-md bg-white/5" />
              </div>
            ))}
          </div>
          <div className="col-span-8">
            <div className="h-80 rounded-2xl border border-white/5 bg-neutral-900/40 p-6">
              <div className="flex justify-between">
                <div className="h-6 w-44 rounded-md bg-white/5" />
                <div className="h-5 w-24 rounded-md bg-white/5" />
              </div>
              <div className="mt-4 h-px bg-white/5" />
              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded-md bg-white/5" />
                <div className="h-4 w-5/6 rounded-md bg-white/5" />
                <div className="h-4 w-4/6 rounded-md bg-white/5" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-6 md:hidden">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl border border-white/5 bg-neutral-900/40 p-6"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjectsSkeleton() {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl animate-pulse px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <div className="h-9 w-60 rounded-lg bg-white/5" />
        </div>
        <div className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-88 break-inside-avoid rounded-2xl border border-white/5 bg-neutral-900/40 p-5"
            >
              <div className="aspect-3/2 w-full rounded-xl bg-white/5" />
              <div className="mt-6 h-6 w-36 rounded-md bg-white/5" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-full rounded-md bg-white/5" />
                <div className="h-4 w-4/5 rounded-md bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { type TechnologySummary } from "@/lib/objects";

type Props = {
  technology: TechnologySummary;
  className: string;
  height?: number;
  width?: number;
};

export default function TechnologyIcon({
  technology,
  className,
  height = 32,
  width = 32,
}: Props) {
  return (
    <img
      src={technology.image_url}
      data-fallback={technology.fallback_image_url}
      height={height}
      width={width}
      className={className}
      alt=""
      loading="lazy"
      decoding="async"
      suppressHydrationWarning
    />
  );
}

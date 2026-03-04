"use client";

import { useState } from "react";
import Image from "next/image";

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
  height,
  width,
}: Props) {
  const [imgError, setImgError] = useState(false);

  const currentSrc = imgError
    ? technology.fallbackImageUrl
    : technology.imageUrl;

  return (
    <Image
      src={currentSrc}
      height={height ?? 32}
      width={width ?? 32}
      className={className}
      alt={technology.name}
      onError={() => setImgError(true)}
      priority
    />
  );
}

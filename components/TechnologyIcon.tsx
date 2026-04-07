"use client";

import { useState, useEffect } from "react";
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded || imgError) return;

    const timer = setTimeout(() => {
      setImgError(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [loaded, imgError]);

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
      onLoad={() => setLoaded(true)}
      priority
    />
  );
}

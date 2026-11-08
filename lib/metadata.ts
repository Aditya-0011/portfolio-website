import type { Metadata } from "next";

export const SITE_URL = "https://adityapunmiya.com";
export const SITE_NAME = "Aditya Punmiya";
export const OG_IMAGE =
  "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url,
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE }],
    },
  };
}

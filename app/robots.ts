import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/contact", "/projects"],
      disallow: ["/api"],
    },
    sitemap: "https://adityapunmiya.com/sitemap.xml",
  };
}

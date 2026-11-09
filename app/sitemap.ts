import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://adityapunmiya.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://adityapunmiya.com/chat",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://adityapunmiya.com/contact",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://adityapunmiya.com/projects",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://adityapunmiya.com/resume.pdf",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://adityapunmiya.com/architecture",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://adityapunmiya.com/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

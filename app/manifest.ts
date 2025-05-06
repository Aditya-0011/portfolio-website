import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aditya Punmiya's Portfolio",
    short_name: "Aditya Portfolio",
    description: "Portfolio website of Aditya Punmiya",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    screenshots: [
      {
        src: "https://res.cloudinary.com/dijxynt89/image/upload/w_1280,h_800,c_fill,g_auto,q_auto,f_png/v1746507598/7302b64d-67dc-4f9e-a2c6-170075d2845c.png",
        sizes: "1280x800",
        type: "image/png",
        label: "Home page on desktop",
        form_factor: "wide",
      },
      {
        src: "https://res.cloudinary.com/dijxynt89/image/upload/w_375,h_812,c_fill,g_auto,q_auto,f_png/v1746507878/eaffb5bd-03ad-4282-987f-f55e1536b593.png",
        sizes: "375x812",
        type: "image/png",
        label: "Home page on mobile",
        form_factor: "narrow",
      },
    ],
    icons: [
      {
        src: "https://res.cloudinary.com/dijxynt89/image/upload/w_192,h_192,c_fill,g_auto,q_auto,f_png/v1725052376/Aditya_os4fzb.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://res.cloudinary.com/dijxynt89/image/upload/w_512,h_512,c_fill,g_auto,q_auto,f_png/v1725052376/Aditya_os4fzb.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

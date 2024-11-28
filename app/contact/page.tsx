import { Metadata } from "next";

import { Toaster } from "sonner";

import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Aditya Punmiya",
  description: "Contact me",
  metadataBase: new URL("https://adityapunmiya.com/contact"),
  openGraph: {
    title: "Contact | Aditya Punmiya",
    description: "Contact me",
    siteName: "Aditya Punmiya",
    type: "website",
    url: "https://adityapunmiya.com/contact",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Aditya Punmiyaa",
    description: "Contact me",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
};

export default function Contact() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-8">
      <ContactForm />
      <Toaster richColors expand position="top-right" />
    </div>
  );
}

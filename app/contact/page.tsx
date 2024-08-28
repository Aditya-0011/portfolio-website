import { Metadata } from "next";

import { Toaster } from "sonner";

import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact me.",
};

export default function Contact() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-8">
      <ContactForm />
      <Toaster richColors expand position="top-right" />
    </div>
  );
}

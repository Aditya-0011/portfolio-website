import { Toaster } from "sonner";
import Form from "@/components/pages/contact/Form";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Aditya Punmiya.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Form />
      </div>
      <Toaster richColors expand position="top-right" />
    </div>
  );
}

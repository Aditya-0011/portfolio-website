import { JSX, SVGProps } from "react";

import Link from "next/link";

import { FileUser, Instagram, Linkedin, Github, Mail } from "lucide-react";

const navigation = [
  {
    name: "Resume",
    href: "/resume",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <FileUser {...props} />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aditya_punmiya/",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Instagram {...props} />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-punmiya/",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Linkedin {...props} />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Aditya-0011",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Github {...props} />
    ),
  },
  {
    name: "Mail",
    href: "mailto:adityapunmiya@gmail.com",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <Mail {...props} />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-red-500/30 bg-neutral-950/70 backdrop-blur-xl overflow-hidden z-20">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-6 md:order-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/60 transition-all duration-300 hover:text-emerald-400 hover:-translate-y-1 hover:scale-110"
              target="_blank"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="h-6 w-6" />
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base leading-5 text-white/50">
            &copy; {new Date().getFullYear()} <span className="text-white/80 font-medium">Aditya Punmiya</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

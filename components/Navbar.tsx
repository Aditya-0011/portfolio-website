"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const page = pathname.slice(1);
  const name =
    page === "" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <nav className="sticky top-0 z-50 border-b border-red-500/30 bg-neutral-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-center sm:justify-between">
          <div className="relative hidden items-center sm:flex">
            <div
              className={`relative flex max-w-64 items-center truncate rounded-lg px-4 py-2 text-xl font-medium backdrop-blur-sm ${pathname === "/" ? "bg-blue-500/10 text-blue-400 ring ring-blue-500/50" : pathname === "/projects" ? "bg-emerald-500/10 text-emerald-400 ring ring-emerald-500/50" : pathname === "/contact" ? "bg-sky-500/10 text-sky-400 ring ring-sky-500/50" : "bg-neutral-900/80 text-blue-100"}`}
            >
              <span>{name}</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center gap-3 sm:gap-8 px-2.5 sm:justify-end">
            <div
              className={`group relative ${pathname === "/" && "sm:hidden"}`}
            >
              <Link
                href="/"
                className={`relative flex items-center justify-center rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 sm:text-xl ${
                  pathname === "/"
                    ? "bg-blue-500/10 text-blue-400 ring ring-blue-500/50"
                    : "text-white/70 hover:bg-neutral-800/50 hover:text-white"
                }`}
              >
                Home
              </Link>
            </div>
            <div
              className={`group relative ${pathname === "/projects" && "sm:hidden"}`}
            >
              <Link
                href="/projects"
                className={`relative flex items-center justify-center rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 sm:text-xl ${
                  pathname === "/projects"
                    ? "bg-emerald-500/10 text-emerald-400 ring ring-emerald-500/50"
                    : "text-white/70 hover:bg-neutral-800/50 hover:text-white"
                }`}
              >
                Projects
              </Link>
            </div>
            <div
              className={`group relative ${pathname === "/contact" && "sm:hidden"}`}
            >
              <Link
                href="/contact"
                className={`relative flex items-center justify-center rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 sm:text-xl ${
                  pathname === "/contact"
                    ? "bg-sky-500/10 text-sky-400 ring ring-sky-500/50"
                    : "text-white/70 hover:bg-neutral-800/50 hover:text-white"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

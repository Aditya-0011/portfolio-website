"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-950 border-b-2 border-red-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex sm:justify-between justify-center h-20">
          <div className="hidden relative sm:block max-h-12 mt-4">
            <div className="absolute -inset-1 bg-blue-500 rounded-lg blur-md opacity-45 py-2" />
            <div className="relative rounded-lg px-3 text-xl font-bold text-blue-100 bg-neutral-950 border-2 border-blue-500 py-2">
              {pathname === "/"
                ? "Home"
                : pathname === "/projects"
                  ? "Projects"
                  : "Contact"}
            </div>
          </div>
          <div className="flex items-center px-2.5 justify-center space-x-8 sm:justify-start">
            <div
              className={`relative ${pathname !== "/" ? "hover:-translate-y-1" : "sm:hidden"}`}
            >
              <div
                className={
                  pathname === "/"
                    ? "absolute -inset-2 bg-blue-500/40 blur-md"
                    : "hidden"
                }
              />
              <Link
                href="/"
                className={`relative rounded-lg px-3 py-2 text-xl font-medium bg-neutral-950  ${pathname === "/" ? "border-2 border-blue-500 text-blue-100" : "text-white hover:text-sky-500"}`}
              >
                Home
              </Link>
            </div>
            <div
              className={`relative ${pathname !== "/projects" ? "hover:-translate-y-1" : "sm:hidden"}`}
            >
              <div
                className={
                  pathname === "/project"
                    ? "absolute -inset-1.5 bg-blue-500 blur-md opacity-40"
                    : "hidden"
                }
              />
              <Link
                href="/projects"
                className={`relative rounded-lg px-3 py-2 text-xl font-medium bg-neutral-950  ${pathname === "/project" ? "border-2 border-blue-500 text-blue-100" : "text-white hover:text-sky-500"}`}
              >
                Projects
              </Link>
            </div>
            <div
              className={`relative ${pathname !== "/contact" ? "hover:-translate-y-1" : "sm:hidden"}`}
            >
              <div
                className={
                  pathname === "/contact"
                    ? "absolute -inset-1.5 bg-blue-500 blur-md opacity-40"
                    : "hidden"
                }
              />
              <Link
                href="/contact"
                className={`relative rounded-lg px-3 py-2 text-xl font-medium bg-neutral-950  ${pathname === "/contact" ? "border-2 border-blue-500 text-blue-100" : "text-white hover:text-sky-500"}`}
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
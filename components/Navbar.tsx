"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const page = pathname.slice(1);
  const name =
    page === "" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <nav className="border-b-2 border-red-600 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 justify-center sm:justify-between">
          <div className="relative mt-4 hidden max-h-12 sm:block">
            <div className="absolute -inset-1 rounded-lg bg-blue-500 py-2 opacity-45 blur-md" />
            <div className="relative max-w-64 truncate rounded-lg border-2 border-blue-500 bg-neutral-950 px-3 py-2 text-xl font-bold text-blue-100">
              {name}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-8 px-2.5 sm:justify-start">
            <div
              className={`relative ${
                pathname !== "/" ? "hover:-translate-y-1" : "sm:hidden"
              }`}
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
                className={`relative rounded-lg bg-neutral-950 px-3 py-2 text-xl font-medium ${
                  pathname === "/"
                    ? "border-2 border-blue-500 text-blue-100"
                    : "text-white hover:text-sky-500"
                }`}
              >
                Home
              </Link>
            </div>
            <div
              className={`relative ${
                pathname !== "/projects" ? "hover:-translate-y-1" : "sm:hidden"
              }`}
            >
              <div
                className={
                  pathname === "/projects"
                    ? "absolute -inset-1.5 bg-blue-500 opacity-40 blur-md"
                    : "hidden"
                }
              />
              <Link
                href="/projects"
                className={`relative rounded-lg bg-neutral-950 px-3 py-2 text-xl font-medium ${
                  pathname === "/projects"
                    ? "border-2 border-blue-500 text-blue-100"
                    : "text-white hover:text-sky-500"
                }`}
              >
                Projects
              </Link>
            </div>
            <div
              className={`relative ${
                pathname !== "/contact" ? "hover:-translate-y-1" : "sm:hidden"
              }`}
            >
              <div
                className={
                  pathname === "/contact"
                    ? "absolute -inset-1.5 bg-blue-500 opacity-40 blur-md"
                    : "hidden"
                }
              />
              <Link
                href="/contact"
                className={`relative rounded-lg bg-neutral-950 px-3 py-2 text-xl font-medium ${
                  pathname === "/contact"
                    ? "border-2 border-blue-500 text-blue-100"
                    : "text-white hover:text-sky-500"
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

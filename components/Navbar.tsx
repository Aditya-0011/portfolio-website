"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", activeColor: "blue" },
  { href: "/architecture", label: "Architecture", activeColor: "rose" },
  { href: "/projects", label: "Projects", activeColor: "emerald" },
  { href: "/contact", label: "Contact", activeColor: "sky" },
] as const;

const colorMap = {
  blue: {
    active:
      "bg-blue-500/10 text-blue-400 sm:ring sm:ring-blue-500/50 inset-ring inset-ring-blue-500/50",
  },
  emerald: {
    active:
      "bg-emerald-500/10 text-emerald-400 sm:ring sm:ring-emerald-500/50 inset-ring inset-ring-emerald-500/50",
  },
  sky: {
    active:
      "bg-sky-500/10 text-sky-400 sm:ring sm:ring-sky-500/50 inset-ring inset-ring-sky-500/50",
  },
  rose: {
    active:
      "bg-rose-500/10 text-rose-400 sm:ring sm:ring-rose-500/50 inset-ring inset-ring-rose-500/50",
  },
} as const;

export default function Navbar() {
  const pathname = usePathname();
  const page = pathname.slice(1);
  const name =
    page === "" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);

  const activeItem = navItems.find((item) => item.href === pathname);
  const activeStyle = activeItem
    ? colorMap[activeItem.activeColor].active
    : "bg-neutral-900/80 text-blue-100";

  return (
    <nav className="sticky top-0 z-50 border-b border-red-500/30 bg-neutral-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-center sm:justify-between">
          <div className="relative hidden items-center sm:flex">
            <div
              className={`relative flex max-w-64 items-center truncate rounded-lg px-4 py-2 text-xl font-medium backdrop-blur-sm ${activeStyle}`}
            >
              <span>{name}</span>
            </div>
          </div>
          <div className="flex w-full flex-1 items-center justify-between overflow-x-auto sm:w-auto sm:justify-end sm:gap-8 sm:overflow-visible">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const colors = colorMap[item.activeColor];
              return (
                <div
                  key={item.href}
                  className={`group relative shrink-0 ${isActive ? "sm:hidden" : ""}`}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center justify-center rounded-lg px-2 py-1.5 text-sm font-medium transition-[color,background-color,transform] duration-300 sm:px-4 sm:py-2 sm:text-lg ${
                      isActive
                        ? colors.active
                        : "text-white/70 hover:bg-neutral-800/50 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

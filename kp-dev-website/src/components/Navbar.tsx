"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Award,
  Code2,
  Compass,
  Home,
  Menu,
  Users,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "HOME",
    href: "/",
    description: "Club landing",
    accent: "from-[#608e56]/50 to-[#50e5ff]/20",
    icon: Home,
  },
  {
    label: "TEAM",
    href: "/team",
    description: "Meet the builders",
    accent: "from-[#c9a227]/45 to-transparent",
    icon: Users,
  },
  {
    label: "ACHIEVEMENT",
    href: "/achievement",
    description: "Wins and milestones",
    accent: "from-[#d4af37]/50 to-transparent",
    icon: Award,
  },
  {
    label: "ROAD MAP",
    href: "/roadmap",
    description: "What ships next",
    accent: "from-[#1a6b3c]/55 to-transparent",
    icon: Compass,
  },
  {
    label: "HACKATHON",
    href: "/hackathon",
    description: "Chaos, prizes, builds",
    accent: "from-[#ff3c3c]/55 to-transparent",
    icon: Code2,
  },
  {
    label: "CONTACT",
    href: "/#contact",
    description: "Reach the club",
    accent: "from-white/20 to-transparent",
    icon: ArrowRight,
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      {/* Original desktop navbar */}
      <div className="hidden lg:block bg-[#050505]/90 px-4 py-[12px] backdrop-blur-md md:px-[20px] border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <Link href="/">
              <img
                src="/IMAGE/image.png"
                alt="Kamand Prompt Logo"
                className="h-[30px] lg:h-[40px] w-auto object-contain mix-blend-screen"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-[32px]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[14px] tracking-[0.15em] font-bold transition-colors uppercase font-mono leading-none whitespace-nowrap ${
                  pathname === item.href || (item.href === "/" && pathname === "/")
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/#join"
              className="flex items-center justify-center w-[44px] h-[44px] border border-white/40 text-white/90 hover:bg-white hover:text-[#050505] transition-colors rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Dock-style mobile/tablet navigation */}
      <div className="lg:hidden px-4 pt-6">
        <div className="flex items-center gap-2 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Dock Icons */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href === "/" && pathname === "/") ||
              (item.href.startsWith("/#") && pathname === "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-125 hover:-translate-y-2"
                title={item.label}
              >
                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white/20"
                    : "bg-white/5 group-hover:bg-white/15"
                }`} />
                <Icon className={`relative z-10 h-5 w-5 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-white/50 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                }`} />
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-mono tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Google Login Button */}
          <Link
            href="/#join"
            className="group relative flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-125 hover:-translate-y-2"
            title="Login with Google"
          >
            <div className="absolute inset-0 rounded-xl bg-white/5 group-hover:bg-white/15 transition-all duration-300" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-mono tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Login with Google
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

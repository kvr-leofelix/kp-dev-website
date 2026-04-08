import Link from "next/link";

const navItems = [
  "HOME",
  "TEAM",
  "ACHIEVEMENT",
  "ROAD MAP",
  "HACKATHON",
  "CONTACT",
  "ADMIN"
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-[12px] lg:py-[20px] px-4 md:px-[20px]">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0">
        <div className="flex w-full lg:w-auto items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-[6px]">
            <Link href="/">
              <img 
                src="/IMAGE/image.png" 
                alt="Kamand Prompt Logo" 
                className="h-[30px] lg:h-[40px] w-auto object-contain mix-blend-screen" 
              />
            </Link>
          </div>
          {/* Mobile Right CTA */}
          <div className="block lg:hidden mt-2">
            <Link
              href="#join"
              className="px-[16px] py-[8px] border border-white/40 text-white/90 hover:bg-white hover:text-[#050505] transition-colors font-mono tracking-[0.2em] text-[12px] uppercase inline-block leading-none"
            >
              ./JOIN.SH
            </Link>
          </div>
        </div>

        {/* Center Nav Items & Terminal Block */}
        <div className="flex flex-col items-center w-full lg:w-auto mt-2 lg:mt-0 overflow-hidden">
          <nav className="flex items-center justify-start lg:justify-center gap-[24px] lg:gap-[40px] w-full overflow-x-auto pb-2 scrollbar-hide lg:mb-[16px] lg:pb-0">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white/60 hover:text-white text-[12px] lg:text-[16px] tracking-[0.15em] font-bold transition-colors uppercase font-mono leading-none whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Floating Terminal Decorator */}
          <div className="hidden lg:flex text-[#d8cbb8] font-mono text-[12px] items-center gap-[12px] border border-white/10 px-[20px] py-[6px] bg-[#0a0a0a] leading-none">
            <span className="text-white/40 whitespace-pre">{">_ $"}</span>
            <span className="text-[#a89f91]">cd /iit-mandi/devcell</span>
          </div>
        </div>

        {/* Desktop Right CTA */}
        <div className="hidden lg:block">
          <Link
            href="#join"
            className="px-[24px] py-[10px] border border-white/40 text-white/90 hover:bg-white hover:text-[#050505] transition-colors font-mono tracking-[0.2em] text-[16px] uppercase inline-block leading-none"
          >
            ./JOIN.SH
          </Link>
        </div>
      </div>
    </header>
  );
}

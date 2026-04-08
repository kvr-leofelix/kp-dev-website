import { Terminal } from "lucide-react";

export function ClubHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 border-b border-white/10 z-10 bg-[#050505]">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center space-y-10">
        
        <h1 className="text-[7rem] sm:text-[9rem] md:text-[14rem] leading-[0.8] font-bebas text-white tracking-widest uppercase drop-shadow-2xl">
          KAMAND<br />PROMPT
        </h1>
        
        <p className="font-mono text-[#8a8a8a] text-lg md:text-2xl tracking-[0.2em] uppercase max-w-2xl">
          THE PROGRAMMING CLUB @ IIT MANDI
        </p>

        <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto">
          <button className="px-10 py-5 bg-white text-black font-mono font-bold tracking-[0.1em] text-sm md:text-base hover:bg-gray-200 transition-colors uppercase flex items-center justify-center gap-3">
            $ ../JOIN_US -{'>'}
          </button>
          
          <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-mono font-bold tracking-[0.1em] text-sm md:text-base hover:bg-white/5 transition-colors uppercase flex items-center justify-center gap-3">
             $ CAT PROJECTS
          </button>
        </div>

      </div>
    </section>
  );
}

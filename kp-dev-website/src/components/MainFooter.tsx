export function MainFooter() {
  return (
    <footer className="relative w-full bg-[#050505] pt-32 pb-12 z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
        
        {/* Branding block */}
        <div className="lg:col-span-8 flex flex-col items-start pr-12">
            <h2 className="text-6xl font-bebas text-white tracking-wider uppercase leading-none m-0 p-0">KAMAND</h2>
            <h2 className="text-6xl font-bebas text-white/50 tracking-wider uppercase leading-none m-0 p-0">PROMPT</h2>

            <p className="mt-8 font-mono text-[#8a8a8a] text-sm md:text-base leading-relaxed max-w-sm">
                The Programming Club of IIT Mandi.
                Building the future, one commit at a time.
            </p>

            <button className="mt-12 text-white font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-2 hover:text-[#8a8a8a] transition-colors border-b border-white/20 pb-1">
                Get In Touch <span className="text-[10px]">▼</span>
            </button>
        </div>

        {/* Social / Social block */}
        <div className="lg:col-span-4 flex flex-col justify-end">
          <p className="font-mono text-xs text-[#8a8a8a] tracking-widest uppercase mb-4">SOCIAL</p>
          <div className="flex gap-4">
              <a href="#" aria-label="GitHub" className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 mt-32 text-center border-t border-white/5 pt-12">
          <p className="font-mono text-[10px] text-[#8a8a8a] tracking-widest uppercase opacity-50">
              © 2026 Programming Club, IIT Mandi
          </p>
      </div>
    </footer>
  );
}

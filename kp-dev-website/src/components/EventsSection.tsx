export function EventsSection() {
  return (
    <section className="relative w-full py-32 bg-[#050505] border-b border-white/5 z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <p className="font-mono text-[#8a8a8a] text-xs tracking-[0.2em] mb-4">
            $ cat /events/current.md
          </p>
          <h2 className="text-6xl md:text-8xl font-bebas text-white tracking-widest uppercase mb-4">
            OUR_EVENTS
          </h2>
          <p className="font-mono text-white/50 text-sm tracking-[0.1em] uppercase">
            WORKSHOPS // BOOTCAMPS // HACKATHONS
          </p>
        </div>

        {/* Large Event Image Area */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-white/5 border border-white/10 group overflow-hidden">
            {/* Fallback pattern / Placeholder for actual image if none available */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <img 
                src="https://images.unsplash.com/photo-1544144433-d50aff500b91?q=80&w=2940&auto=format&fit=crop" 
                alt="Event presentation" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out grayscale"
            />
            
            <div className="absolute bottom-8 left-8 z-20">
                <span className="font-bebas text-4xl text-white/40 block mb-1">02</span>
                <h3 className="text-4xl md:text-6xl font-mono font-bold text-white uppercase tracking-tighter mb-2">
                    INTER IIT
                </h3>
                <p className="font-mono text-[#8a8a8a] text-sm">
                    Intensive Tech Bootcamp
                </p>
            </div>
        </div>

        {/* Slider dots indicator */}
        <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-1 h-1 bg-[#8a8a8a] rounded-full"></div>
            <div className="text-white font-mono text-xs font-bold w-4 text-center">02</div>
            <div className="w-1 h-1 bg-[#8a8a8a] rounded-full"></div>
            <div className="w-1 h-1 bg-[#8a8a8a] rounded-full"></div>
        </div>

      </div>
    </section>
  );
}

import { Users, Code2, CopyMinus } from "lucide-react";

export function StatsSection() {
  return (
    <section className="relative w-full py-16 bg-[#050505] border-b border-white/5 z-10">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10">
        
        {/* Metric 1 */}
        <div className="flex flex-col items-center py-12 px-6 hover:bg-white/5 transition-colors">
          <Users className="w-6 h-6 text-[#8a8a8a] mb-4" />
          <h3 className="text-5xl font-bebas text-white tracking-wide">47+</h3>
          <p className="text-xs font-mono text-[#8a8a8a] tracking-[0.2em] mt-2 uppercase">MEMBERS</p>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col items-center py-12 px-6 hover:bg-white/5 transition-colors">
          <Code2 className="w-6 h-6 text-[#8a8a8a] mb-4" />
          <h3 className="text-5xl font-bebas text-white tracking-wide">14+</h3>
          <p className="text-xs font-mono text-[#8a8a8a] tracking-[0.2em] mt-2 uppercase">CORE</p>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col items-center py-12 px-6 hover:bg-white/5 transition-colors">
          <CopyMinus className="w-6 h-6 text-[#8a8a8a] mb-4" />
          <h3 className="text-5xl font-bebas text-white tracking-wide">19+</h3>
          <p className="text-xs font-mono text-[#8a8a8a] tracking-[0.2em] mt-2 uppercase">PROJECTS</p>
        </div>

      </div>
    </section>
  );
}

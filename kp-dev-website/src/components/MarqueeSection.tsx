"use client";

import { motion } from "framer-motion";

export function MarqueeSection() {
  return (
    <section className="w-full py-48 bg-[#050505] overflow-hidden whitespace-nowrap border-b border-white/5 relative z-10">
      <motion.div 
        className="inline-flex items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
      >
        {/* We repeat the massive text to create the seamless marquee effect */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 flex items-center pr-16 text-[15rem] md:text-[25rem] font-bebas text-white tracking-widest uppercase leading-none">
            <span className="text-white">EAT.</span>
            <span className="text-white ml-16">CODE.</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

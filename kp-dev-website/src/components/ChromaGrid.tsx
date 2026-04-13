"use client";

import { useState } from "react";

interface ChromaGridProps {
  items: Array<{
    id: number;
    name: string;
    role: string;
    image: string;
  }>;
}

export function ChromaGrid({ items }: ChromaGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colors = [
    "from-[#608e56]/50 to-[#50e5ff]/20",
    "from-[#c9a227]/45 to-transparent",
    "from-[#d4af37]/50 to-transparent",
    "from-[#1a6b3c]/55 to-transparent",
    "from-[#ff3c3c]/55 to-transparent",
    "from-white/20 to-transparent",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group relative h-80 cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Card Container */}
          <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:scale-[1.02]">
            {/* Image */}
            <div className="relative w-full h-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ zIndex: 1 }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" style={{ zIndex: 2 }} />
              
              {/* Chromatic Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-0 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-40" : ""
                }`}
                style={{ zIndex: 3 }}
              />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ zIndex: 4 }}>
              <h3 className="font-bebas text-2xl text-white tracking-wider uppercase mb-1 transition-transform duration-300 group-hover:-translate-y-1">
                {item.name}
              </h3>
              <p className="font-mono text-xs text-[#608e56] tracking-widest uppercase transition-transform duration-300 group-hover:-translate-y-1">
                {item.role}
              </p>
            </div>

            {/* Hover Glow Effect */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" style={{ zIndex: 5 }} />
            )}
          </div>

          {/* Floating Chroma Particles */}
          {hoveredIndex === index && (
            <>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ zIndex: 6 }} />
              <div className="absolute top-8 right-8 w-1 h-1 rounded-full bg-[#50e5ff]/80 animate-pulse delay-75" style={{ zIndex: 6 }} />
              <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-[#608e56]/80 animate-pulse delay-150" style={{ zIndex: 6 }} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

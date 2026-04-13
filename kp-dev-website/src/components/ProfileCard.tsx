"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  year?: string;
}

export function ProfileCard({ name, role, image, year }: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group w-64 h-80 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-3xl ${
          isHovered ? "rotate-y-12 scale-105" : "rotate-y-0"
        }`}
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
          {/* Glowing effect on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-[#608e56]/20 to-[#50e5ff]/20 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          
          {/* Image Container */}
          <div className="relative w-full h-48 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/80 transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-60"
              }`}
            />
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="relative p-6 pt-2">
            <h3 className="font-bebas text-2xl text-white tracking-wider uppercase mb-1">
              {name}
            </h3>
            <p className="font-mono text-xs text-[#608e56] tracking-widest uppercase mb-2">
              {role}
            </p>
            {year && (
              <p className="font-mono text-[10px] text-white/40 tracking-wider">
                Class of {year}
              </p>
            )}
          </div>

          {/* Shine effect on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-all duration-700 ${
              isHovered ? "opacity-100 translate-x-full" : "opacity-0 -translate-x-full"
            }`}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

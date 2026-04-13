"use client";

import { useEffect, useState } from "react";
import BlurText from "@/components/BlurText";
import LetterGlitch from "@/components/LetterGlitch";
import Link from "next/link";
import { MainFooter } from "@/components/MainFooter";

interface RoadmapEntry {
  id: number;
  topic: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

export default function RoadmapPage() {
  const [uploadedEntries, setUploadedEntries] = useState<RoadmapEntry[]>([]);

  useEffect(() => {
    fetch("/api/roadmap")
      .then((res) => res.json())
      .then((data) => {
        console.log("Roadmap entries fetched:", data);
        setUploadedEntries(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch roadmap entries:", err);
        setUploadedEntries([]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <LetterGlitch
          glitchColors={["#1a6b3c", "#0f4d2a", "#50e5ff"]}
          glitchSpeed={55}
          outerVignette={true}
          centerVignette={false}
          smooth={true}
        />
      </div>

      {/* Back Navigation */}
      <div className="relative z-10 pt-8 px-8">
        <Link
          href="/"
          className="font-mono text-xs text-white/50 hover:text-white tracking-[0.2em] uppercase transition-colors border-b border-white/10 pb-1"
        >
          ← cd ../HOME
        </Link>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-12">
        <h1 className="text-[5rem] sm:text-[7rem] md:text-[10rem] font-bebas text-white tracking-widest uppercase leading-[0.85] drop-shadow-2xl">
          <BlurText
            text="ROAD"
            animateBy="letters"
            delay={0.08}
            stepDuration={0.38}
            direction="top"
          />
          <br />
          <BlurText
            text="MAP"
            animateBy="letters"
            delay={0.26}
            stepDuration={0.38}
            direction="bottom"
          />
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 pb-24">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#1a6b3c] via-white/10 to-transparent" />

          <div className="space-y-8">
            {/* Uploaded Entries */}
            {uploadedEntries.map((entry) => (
              <div key={entry.id} className="relative pl-20">
                {/* Dot */}
                <div className="absolute left-[26px] top-8 w-5 h-5 rounded-full border-2 bg-[#50e5ff] border-[#50e5ff] shadow-[0_0_12px_#50e5ff] animate-pulse" />

                <div className="bg-black/40 backdrop-blur-sm border border-[#50e5ff]/30 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-[#50e5ff] text-xs tracking-[0.3em] font-bold">UPLOADED</span>
                    <span className="font-mono text-white/20 text-xs">|</span>
                    <span className="font-mono text-white/30 text-xs tracking-widest">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bebas text-white text-3xl tracking-wider mb-4">{entry.topic}</h3>
                  <p className="font-mono text-white/40 text-sm mb-4">{entry.description}</p>
                  {entry.fileUrl && (
                    <div className="mt-4">
                      <a
                        href={entry.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a6b3c]/20 border border-[#1a6b3c]/30 rounded-lg text-[#1a6b3c] font-mono text-xs tracking-wider hover:bg-[#1a6b3c]/30 transition-colors"
                      >
                        {entry.fileName || "View File"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}

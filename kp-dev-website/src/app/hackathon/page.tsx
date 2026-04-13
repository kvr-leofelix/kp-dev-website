"use client";

import { useEffect, useState } from "react";
import BlurText from "@/components/BlurText";
import LetterGlitch from "@/components/LetterGlitch";
import Link from "next/link";
import { MainFooter } from "@/components/MainFooter";

interface HackathonEntry {
  id: number;
  name: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
  prizePool: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

export default function HackathonPage() {
  const [uploadedEntries, setUploadedEntries] = useState<HackathonEntry[]>([]);

  useEffect(() => {
    fetch("/api/hackathon")
      .then((res) => res.json())
      .then((data) => {
        console.log("Hackathon entries fetched:", data);
        setUploadedEntries(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch hackathon entries:", err);
        setUploadedEntries([]);
      });
  }, []);

  const isLive = (startDateTime: string, endDateTime: string) => {
    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    return now >= start && now <= end;
  };

  const isPsAvailable = (startDateTime: string) => {
    const now = new Date();
    const start = new Date(startDateTime);
    return now >= start;
  };

  const getStatus = (startDateTime: string, endDateTime: string) => {
    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    
    if (now < start) return "upcoming";
    if (now > end) return "past";
    return "live";
  };

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <LetterGlitch
          glitchColors={["#ff3c3c", "#833014", "#ff8c00"]}
          glitchSpeed={35}
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
            text="HACK"
            animateBy="letters"
            delay={0.08}
            stepDuration={0.38}
            direction="top"
          />
          <br />
          <BlurText
            text="ATHON"
            animateBy="letters"
            delay={0.26}
            stepDuration={0.38}
            direction="bottom"
          />
        </h1>
      </div>

      {/* Hackathon Cards */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 pb-24">
        <div className="space-y-6">
          {uploadedEntries.map((entry) => {
            const status = getStatus(entry.startDateTime, entry.endDateTime);
            const startDate = new Date(entry.startDateTime);
            const endDate = new Date(entry.endDateTime);
            
            return (
              <div
                key={entry.id}
                className={`group bg-black/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01] ${
                  status === "upcoming"
                    ? "border-[#ff3c3c]/20 hover:border-[#ff3c3c]/40"
                    : status === "live"
                    ? "border-[#ff8c00]/40 hover:border-[#ff8c00]/60"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="font-bebas text-white text-3xl md:text-4xl tracking-wider">{entry.name}</h3>
                      {status === "live" && (
                        <span className="font-mono text-[#ff8c00] text-[10px] tracking-widest border border-[#ff8c00]/30 px-3 py-1 rounded-full animate-pulse">
                          LIVE NOW
                        </span>
                      )}
                      {status === "upcoming" && (
                        <span className="font-mono text-[#ff3c3c] text-[10px] tracking-widest border border-[#ff3c3c]/30 px-3 py-1 rounded-full">
                          UPCOMING
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-white/40 text-sm leading-relaxed mb-4">{entry.description}</p>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-white/20 text-xs tracking-widest">
                        📅 {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </span>
                      <span className="font-mono text-[#ff8c00] text-xs tracking-widest">
                        🏆 {entry.prizePool}
                      </span>
                    </div>
                    {entry.fileUrl && isPsAvailable(entry.startDateTime) && (
                      <div className="mt-3">
                        <a
                          href={entry.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3c3c]/20 border border-[#ff3c3c]/30 rounded-lg text-[#ff3c3c] font-mono text-xs tracking-wider hover:bg-[#ff3c3c]/30 transition-colors"
                        >
                          {entry.fileName || "View PS PDF"}
                        </a>
                      </div>
                    )}
                  </div>

                  {(status === "upcoming" || status === "live") && (
                    <button className="px-8 py-4 bg-[#ff3c3c] text-white font-mono font-bold tracking-[0.15em] text-sm rounded-xl hover:bg-[#ff5555] transition-colors shadow-[0_0_20px_rgba(255,60,60,0.3)] whitespace-nowrap">
                      REGISTER →
                    </button>
                  )}
                  {status === "past" && (
                    <span className="font-mono text-white/20 text-xs tracking-widest px-6 py-3 border border-white/5 rounded-xl">
                      COMPLETED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {uploadedEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="font-mono text-white/40 text-sm">No hackathons scheduled yet.</p>
          </div>
        )}
      </div>
      <MainFooter />
    </main>
  );
}

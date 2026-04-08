"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "INVENTORY MANAGEMENT",
    description: "A robust inventory tool built to handle scalable warehouse tracking.",
    github: "#"
  },
  {
    id: "02",
    title: "CONTACTS DIRECTORY",
    description: "An internal directory that provides contact details of everyone at IIT Mandi. No more digging through messy spreadsheets! It employs a real-time elastic search to suggest predictions on the basis of characters already typed and segregated by batches and faculty/student. It has been built on SAP and uses MongoDB for database.",
    github: "#view-on-github"
  },
  {
    id: "03",
    title: "SNTC SERVER",
    description: "The core server orchestration layer for the Student Networking & Technology Club.",
    github: "#"
  },
  {
    id: "04",
    title: "BAAT-CHEET",
    description: "A localized real-time chat application for campus communications.",
    github: "#"
  }
];

export function ProjectsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // 02 defaults open based on screenshot

  return (
    <section className="relative w-full py-32 bg-[#050505] border-b border-white/5 z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Mirroring the text block from Beat B as a static element here */}
        <div className="mb-16">
          <div className="font-mono text-sm md:text-base tracking-[0.2em] mb-4 text-[#8a8a8a]">
            {'>_ $ LS /PROJECTS'}
          </div>
          <h2 className="text-[6rem] md:text-[8rem] xl:text-[10rem] leading-[0.85] font-bebas text-white tracking-widest uppercase">
            OUR PROJECTS
          </h2>
          <p className="mt-8 text-base md:text-xl font-mono text-[#8a8a8a]">
            Open source contributions from the programming club
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full border-t border-white/10 mt-16 font-mono">
          {projects.map((proj, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={proj.id} className="border-b border-white/10">
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-8 flex items-center justify-between text-left group hover:bg-white/[0.02] transition-colors px-4"
                >
                  <div className="flex items-center gap-6 md:gap-12 text-lg md:text-2xl font-bold tracking-tight">
                    <span className="text-[#8a8a8a] text-sm md:text-lg opacity-50 group-hover:opacity-100 transition-opacity">{proj.id}</span>
                    <span className={`uppercase ${isOpen ? 'text-white' : 'text-[#8a8a8a] group-hover:text-white transition-colors'}`}>
                      {proj.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[#8a8a8a]">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={18} />
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#0A0A0A] px-4 md:pl-[6.5rem] md:pr-12"
                    >
                      <div className="py-8 text-[#8a8a8a] text-sm leading-relaxed max-w-4xl border-t border-white/5">
                        <p className="mb-6">{proj.description}</p>
                        <a href={proj.github} className="inline-flex items-center gap-2 text-white hover:underline text-xs md:text-sm font-bold tracking-widest uppercase">
                          <ExternalLink size={14} /> VIEW ON GITHUB
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12">
            <button className="flex items-center gap-3 text-[#8a8a8a] hover:text-white transition-colors font-mono text-sm tracking-widest uppercase">
                {'>'} VIEW ALL IN GITHUB
            </button>
        </div>

      </div>
    </section>
  );
}

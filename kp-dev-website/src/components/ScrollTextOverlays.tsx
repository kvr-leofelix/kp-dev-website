"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export function ScrollTextOverlays({
  progress
}: {
  progress: MotionValue<number>;
}) {
  // Beat A (0–20%)
  const opacityA = useTransform(progress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const yA = useTransform(progress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20]);

  // Beat B (25–45%)
  const opacityB = useTransform(progress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const yB = useTransform(progress, [0.25, 0.3, 0.4, 0.45], [20, 0, 0, -20]);

  // Beat C (50–70%)
  const opacityC = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const yC = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [20, 0, 0, -20]);

  // Beat D (75-95%)
  const opacityD = useTransform(progress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const yD = useTransform(progress, [0.75, 0.8, 0.9, 0.95], [20, 0, 0, -20]);

  // "Scroll to Explore" indicator
  const opacityScroll = useTransform(progress, [0, 0.1], [1, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 text-white flex flex-col justify-center px-8 md:px-24">
      {/* Scroll to Explore (at 0%) */}
      <motion.div
        style={{ opacity: opacityScroll }}
        className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center animate-pulse"
      >
        <span className="text-xs uppercase tracking-widest text-white/40">Scroll to Explore</span>
      </motion.div>

      {/* Beat A */}
      <motion.div
        style={{ opacity: opacityA, y: yA }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 text-center uppercase">
          IIT MANDI DEVCELL
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/60 tracking-wider">

          THE PROGRAMMING CLUB
          <br></br><h5>@ IIT MANDI</h5>
        </p>
      </motion.div>

      {/* Beat B */}
      <motion.div
        style={{ opacity: opacityB, y: yB }}
        className="absolute inset-x-8 md:inset-x-24 top-1/2 -translate-y-1/2"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white/90">
          KAMMAND PROMPT
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/60 max-w-md">
          A world-class engineering marvel<br></br>
          Gradually separating the core components. Every layer reveals meticulously crafted technologies suspended in the void.
        </p>
      </motion.div>

      {/* Beat C */}
      <motion.div
        style={{ opacity: opacityC, y: yC }}
        className="absolute inset-x-8 md:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-end text-right"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white/90">
          Raw Energy
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/60 max-w-md">
          An unprecedented architecture unleashing pure performance, channeling power through uncompromised design.
        </p>
      </motion.div>

      {/* Beat D */}
      <motion.div
        style={{ opacity: opacityD, y: yD }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <h2 className="text-6xl md:text-8xl font-bold text-white/90 uppercase text-center">
          The Final Form
        </h2>
        <p className="mt-4 text-xl text-white/60 mb-8 max-w-2xl text-center">
          The inner truth perfectly exposed. A sophisticated deconstruction capturing every deliberate detail and component alignment.
        </p>
        <button className="px-8 py-4 border border-white/20 hover:bg-white hover:text-[#050505] transition-colors rounded-full uppercase tracking-widest text-sm pointer-events-auto">
          Explore DevCell
        </button>
      </motion.div>
    </div>
  );
}

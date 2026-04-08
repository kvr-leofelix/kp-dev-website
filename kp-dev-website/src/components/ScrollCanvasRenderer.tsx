"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ScrollTextOverlays } from "./ScrollTextOverlays";

const FRAME_COUNT = 240; // 0 to 239

export function ScrollCanvasRenderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const isLoaded = loadedCount === FRAME_COUNT;

  // Wait for client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Track when the top hits the top, up to when bottom hits the bottom
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload Images
  useEffect(() => {
    if (!isClient) return;

    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Ensure we hit the public folder
      img.src = `/sequence/frame_${i}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      // fallback in case of load error to not block UI forever
      img.onerror = () => {
        loaded++; 
        setLoadedCount(loaded);
        console.error(`Failed to load frame_${i}.jpg`);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [isClient]);

  // Frame Rendering Logic
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // false for performance + opaque background
    if (!ctx) return;

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.width) return;

      const containerW = window.innerWidth;
      const containerH = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      
      // Update canvas physical pixels bounds if needed
      if (canvas.width !== containerW * dpr || canvas.height !== containerH * dpr) {
         canvas.width = containerW * dpr;
         canvas.height = containerH * dpr;
      }

      // Reset transform so we don't infinitely scale
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Fill with purely black void to match blending #050505
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, containerW, containerH);

      // High quality smoothing for resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const imgRatio = img.width / img.height;
      const containerRatio = containerW / containerH;

      let drawW = containerW;
      let drawH = containerH;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > containerRatio) {
        drawW = containerW;
        drawH = containerW / imgRatio;
      } else {
        drawH = containerH;
        drawW = containerH * imgRatio;
      }

      // Cap scale at 100% of the image's original resolution to prevent pixel blurring from upscaling
      if (drawW > img.width || drawH > img.height) {
        drawW = img.width;
        drawH = img.height;
      }

      // Center the final block
      offsetX = (containerW - drawW) / 2;
      offsetY = (containerH - drawH) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    // Render immediately on mount once loaded
    renderFrame(0);

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latest * FRAME_COUNT))
      );
      // We can use requestAnimationFrame for slightly better sequencing,
      // but framer-motion already batches updates nicely.
      requestAnimationFrame(() => renderFrame(frameIndex));
    });

    const handleResize = () => {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(smoothProgress.get() * FRAME_COUNT))
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, smoothProgress]);

  return (
    <div ref={containerRef} className="h-[800vh] md:h-[600vh] lg:h-[400vh] w-full relative bg-[#050505]">
      {(!isClient || !isLoaded) && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white/60">
          <Loader2 className="w-8 h-8 animate-spin text-white mb-6" />
          <p className="text-sm uppercase tracking-widest text-white/80">
            Assembling System... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
          </p>
          <div className="w-64 h-[2px] bg-white/10 mt-6 overflow-hidden relative rounded-full">
            <div 
               className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
               style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Sticky container that holds the canvas and overlays */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
        {isClient && isLoaded && <ScrollTextOverlays progress={smoothProgress} />}
      </div>
    </div>
  );
}

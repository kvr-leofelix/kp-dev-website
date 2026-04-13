"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface BounceCardsProps {
  className?: string;
  images: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  memberData?: Array<{
    id: number;
    name: string;
    year: string;
    photo: string;
  }>;
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = true,
  memberData = [],
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coloredCards, setColoredCards] = useState<number[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bc-card",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    setColoredCards((prev) => [...prev, hoveredIdx]);
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.bc-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const distance = Math.abs(hoveredIdx - i);
        gsap.to(target, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.4,
          ease: "back.out(1.4)",
          delay: distance * 0.05,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.bc-card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: transformStyles[i] || "none",
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images.map((src, idx) => {
        const member = memberData[idx];
        return (
          <div
            key={idx}
            className={`bc-card bc-card-${idx} group`}
            style={{
              position: "absolute",
              width: 250,
              aspectRatio: "1",
              border: "3px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              transform: transformStyles[idx] ?? "none",
              cursor: "pointer",
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                borderRadius: "17px",
              }}
            >
              <img
                src={src}
                alt={`card-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: coloredCards.includes(idx) ? "grayscale(0%)" : "grayscale(100%)",
                  transition: "filter 0.5s ease-in-out",
                }}
              />
            </div>
            {/* Hover Text Overlay */}
            {member && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "16px",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  borderRadius: "17px",
                }}
                className="group-hover:opacity-100"
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
              >
                <p
                  style={{
                    color: "white",
                    fontFamily: "bebas, sans-serif",
                    fontSize: "24px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {member.name}
                </p>
                <p
                  style={{
                    color: "#608e56",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    margin: "4px 0 0 0",
                  }}
                >
                  {member.year}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

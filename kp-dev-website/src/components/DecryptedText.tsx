"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
}

export function DecryptedText({ 
  text, 
  className = "", 
  speed = 30,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Intersection Observer to trigger animation when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Start animation when element comes into view
            setIsAnimating(true);
            setDisplayText("");
            setCurrentIndex(0);
            setIsComplete(false);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isAnimating || currentIndex >= text.length) {
      if (currentIndex >= text.length) {
        setIsComplete(true);
        setIsAnimating(false);
      }
      return;
    }

    const targetChar = text[currentIndex];
    let iterations = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      iterations++;
      
      if (iterations >= maxIterations) {
        setDisplayText((prev) => prev + targetChar);
        setCurrentIndex((prev) => prev + 1);
        clearInterval(interval);
        return;
      }

      // Show random characters during animation
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      setDisplayText((prev) => 
        prev.substring(0, currentIndex) + randomChar + prev.substring(currentIndex + 1)
      );
    }, speed);

    return () => clearInterval(interval);
  }, [currentIndex, text, speed, characters, isAnimating]);

  return (
    <span ref={elementRef} className={className}>
      {isVisible ? (
        <>
          {displayText}
          {!isComplete && (
            <span className="animate-pulse text-white/80">|</span>
          )}
        </>
      ) : (
        // Show placeholder text when not visible yet
        <span className="opacity-0">IIT MANDI DEVCELL</span>
      )}
    </span>
  );
}

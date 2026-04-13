"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  stepDuration?: number;
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  animateBy = "words",
  direction = "top",
  stepDuration = 0.35,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  const elements =
    animateBy === "words" ? text.split(" ") : text.split("");

  const yFrom = direction === "top" ? -40 : 40;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [controls, hasAnimated]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      filter: "blur(24px)",
      opacity: 0,
      y: yFrom,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: stepDuration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          style={{
            display: "inline-block",
            willChange: "filter, opacity, transform",
          }}
        >
          {el}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

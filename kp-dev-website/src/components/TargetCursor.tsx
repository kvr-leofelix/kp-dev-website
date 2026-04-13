"use client";

import { useEffect, useState } from "react";

export function TargetCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        * {
          cursor: none !important;
        }
      `}</style>
      {/* Target Cursor */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isHovering ? '40px' : '20px',
          height: isHovering ? '40px' : '20px',
          border: '2px solid #608e56',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
          backgroundColor: 'transparent',
        }}
      />
      {/* Center Dot */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '4px',
          height: '4px',
          backgroundColor: isHovering ? '#50e5ff' : '#608e56',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background-color 0.2s ease',
        }}
      />
      {/* Crosshair Lines */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isHovering ? '60px' : '30px',
          height: '1px',
          backgroundColor: isHovering ? '#50e5ff' : '608e56',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.5,
          transition: 'width 0.2s ease, background-color 0.2s ease',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '1px',
          height: isHovering ? '60px' : '30px',
          backgroundColor: isHovering ? '#50e5ff' : '#608e56',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.5,
          transition: 'height 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  );
}

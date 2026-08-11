import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  darkMode: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Target mouse position
  const mousePos = useRef({ x: -200, y: -200 });
  // Lerp ring position
  const ringPos = useRef({ x: -200, y: -200 });

  const animFrameId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);

  useEffect(() => {
    // Keep refs in sync for requestAnimationFrame
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isClickedRef.current = isClicked;
  }, [isClicked]);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], label, .interactive-hover')
        );
        setIsHovered(interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      isClickedRef.current = true;
      mousePos.current = { x: e.clientX, y: e.clientY };
      ringPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsClicked(false);
      isClickedRef.current = false;
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleDragStart = (e: DragEvent) => e.preventDefault();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('dragstart', handleDragStart);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Render Loop - Unified rendering for both ring and dot
    const render = () => {
      // Ring position
      if (isClickedRef.current) {
        ringPos.current.x = mousePos.current.x;
        ringPos.current.y = mousePos.current.y;
      } else {
        const ease = 0.18;
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;
      }

      // Render Ring
      if (ringRef.current) {
        const ringScale = isClickedRef.current ? 0.8 : isHoveredRef.current ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      // Render Dot - ALWAYS synchronized in the same frame
      if (dotRef.current) {
        const dotScale = isClickedRef.current ? 0.7 : isHoveredRef.current ? 1.5 : 1;
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Smooth Lerp Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border transition-colors duration-200 pointer-events-none flex items-center justify-center ${
          isHovered
            ? 'bg-blue-500/15 border-blue-400 backdrop-blur-[1px] shadow-lg shadow-blue-500/25'
            : isClicked
            ? 'bg-emerald-500/25 border-emerald-400'
            : darkMode
            ? 'border-blue-400/60 bg-blue-400/5'
            : 'border-blue-600/60 bg-blue-600/5'
        }`}
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      {/* Inner Instant Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full transition-colors duration-150 pointer-events-none ${
          isHovered
            ? 'bg-emerald-400 ring-4 ring-emerald-400/30'
            : isClicked
            ? 'bg-blue-400 scale-90'
            : darkMode
            ? 'bg-blue-400 shadow-sm shadow-blue-400/60'
            : 'bg-blue-600 shadow-sm shadow-blue-600/60'
        }`}
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

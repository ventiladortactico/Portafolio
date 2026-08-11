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

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });

  const animFrameId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);

  useEffect(() => {
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

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], label, .interactive-hover')
        );
        setIsHovered(interactive);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      isClickedRef.current = true;
    };

    const handleMouseUp = () => {
      setIsClicked(false);
      isClickedRef.current = false;
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

    const render = () => {
      // Ring position: instant when clicking, lerp when not
      if (isClickedRef.current) {
        ringPos.current.x = mousePos.current.x;
        ringPos.current.y = mousePos.current.y;
      } else {
        const ease = 0.18;
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;
      }

      const x = mousePos.current.x;
      const y = mousePos.current.y;
      const ringScale = isClickedRef.current ? 0.8 : isHoveredRef.current ? 1.6 : 1;
      const dotScale = isClickedRef.current ? 0.7 : isHoveredRef.current ? 1.5 : 1;

      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
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
      <div
        ref={ringRef}
        className={`fixed w-10 h-10 rounded-full border pointer-events-none flex items-center justify-center will-change-transform ${
          isHovered
            ? 'bg-blue-500/15 border-blue-400 backdrop-blur-[1px] shadow-lg shadow-blue-500/25'
            : isClicked
            ? 'bg-emerald-500/25 border-emerald-400'
            : darkMode
            ? 'border-blue-400/60 bg-blue-400/5'
            : 'border-blue-600/60 bg-blue-600/5'
        }`}
        style={{ left: -200, top: -200, transform: 'translate(-50%, -50%) scale(1)' }}
      />
      <div
        ref={dotRef}
        className={`fixed w-2.5 h-2.5 rounded-full pointer-events-none will-change-transform ${
          isHovered
            ? 'bg-emerald-400 ring-4 ring-emerald-400/30'
            : isClicked
            ? 'bg-blue-400'
            : darkMode
            ? 'bg-blue-400 shadow-sm shadow-blue-400/60'
            : 'bg-blue-600 shadow-sm shadow-blue-600/60'
        }`}
        style={{ left: -200, top: -200, transform: 'translate(-50%, -50%) scale(1)' }}
      />
    </div>
  );
};

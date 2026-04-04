"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const springX = useSpring(x, { stiffness: 500, damping: 35 });
  const springY = useSpring(y, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setHasFinePointer(mq.matches);
    if (!mq.matches) return;

    let moveTimer: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsMoving(true);
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => setIsMoving(false), 120);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      clearTimeout(moveTimer);
    };
  }, [x, y]);

  if (!hasFinePointer) return null;

  const scale = isHovering ? 2.2 : isMoving ? 1.35 : 1;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="w-3.5 h-3.5 rounded-full bg-white/80 shadow-[0_0_10px_3px_rgba(255,255,255,0.3)]"
        animate={{ scale }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </motion.div>
  );
}

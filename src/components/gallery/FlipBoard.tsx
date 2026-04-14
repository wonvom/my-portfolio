"use client";

import { useEffect, useState } from "react";

const CHARS = "0123456789";
const FLIP_STEPS = 8;

function FlipDigit({ from, to, delay }: { from: string; to: string; delay: number }) {
  const [displayed, setDisplayed] = useState(from);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (from === to) return;
    const t = setTimeout(() => {
      setFlipping(true);
      let step = 0;
      const iv = setInterval(() => {
        step++;
        if (step >= FLIP_STEPS) {
          setDisplayed(to);
          setFlipping(false);
          clearInterval(iv);
        } else {
          setDisplayed(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      }, 40);
    }, delay);
    return () => clearTimeout(t);
  }, [from, to, delay]);

  return (
    <span
      className="inline-block w-[1ch] text-center font-mono tabular-nums"
      style={{
        transition: flipping ? "none" : undefined,
        display: "inline-block",
      }}
    >
      {displayed}
    </span>
  );
}

interface FlipBoardProps {
  value: string; // e.g. "2023"
  className?: string;
}

export function FlipBoard({ value, className }: FlipBoardProps) {
  const [prev, setPrev] = useState(value);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    setPrev(current);
    setCurrent(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const digits = current.split("");
  const prevDigits = prev.split("");
  // Pad to same length
  while (prevDigits.length < digits.length) prevDigits.unshift("0");

  return (
    <span className={className}>
      {digits.map((d, i) => (
        <FlipDigit key={i} from={prevDigits[i] ?? "0"} to={d} delay={i * 60} />
      ))}
    </span>
  );
}

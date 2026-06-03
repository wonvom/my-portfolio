"use client";

type Props = {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
};

export function SectionDots({ total, current, onDotClick }: Props) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[6px] items-center hidden md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`섹션 ${i + 1}로 이동`}
          className="transition-all duration-300"
          style={{
            width: i === current ? 6 : 4,
            height: i === current ? 6 : 4,
            borderRadius: "50%",
            background: i === current ? "var(--fg)" : "var(--muted)",
          }}
        />
      ))}
    </div>
  );
}

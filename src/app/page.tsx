import { LandingGrid } from "@/components/landing/LandingGrid";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07070f] flex flex-col items-center justify-center relative overflow-hidden px-4 py-16">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_55%_at_50%_50%,rgba(80,90,200,0.05),transparent_70%)]" />

      {/* Header text */}
      <div className="text-center mb-10 space-y-1.5 relative">
        <p className="text-neutral-600 text-xs tracking-[0.3em] uppercase">
          Wonjong Kim
        </p>
        <p className="text-neutral-600 text-sm tracking-wide">
          Select a destination
        </p>
      </div>

      {/* 2×2 card grid */}
      <div className="relative">
        <LandingGrid />
      </div>
    </div>
  );
}

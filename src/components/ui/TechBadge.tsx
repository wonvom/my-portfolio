type TechBadgeProps = {
  name: string;
  level?: "primary" | "secondary";
};

export function TechBadge({ name, level = "secondary" }: TechBadgeProps) {
  return (
    <span
      className={
        level === "primary"
          ? "px-2.5 py-1 rounded-full text-xs font-medium text-neutral-200 bg-white/[0.08] border border-white/[0.12]"
          : "px-2.5 py-1 rounded-full text-xs text-neutral-400 bg-white/[0.04] border border-white/[0.07]"
      }
    >
      {name}
    </span>
  );
}

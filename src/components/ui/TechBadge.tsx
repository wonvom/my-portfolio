type TechBadgeProps = {
  name: string;
  level?: "primary" | "secondary";
};

export function TechBadge({ name, level = "secondary" }: TechBadgeProps) {
  return (
    <span
      className={
        level === "primary"
          ? "px-2.5 py-1 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.07] dark:bg-white/[0.08] border border-black/[0.1] dark:border-white/[0.12]"
          : "px-2.5 py-1 rounded-full text-xs text-neutral-500 dark:text-neutral-400 bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.07]"
      }
    >
      {name}
    </span>
  );
}

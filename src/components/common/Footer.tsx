export function Footer() {
  return (
    <footer
      className="border-t py-8 px-6"
      style={{ borderColor: "var(--border)" }}
    >
      <p
        className="text-center text-xs tracking-[2px]"
        style={{ color: "var(--muted)" }}
      >
        © {new Date().getFullYear()} Wonjong Kim. All rights reserved.
      </p>
    </footer>
  );
}

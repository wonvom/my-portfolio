import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.08] dark:border-white/10 py-8">
      <Container>
        <p className="text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Wonjong Kim. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

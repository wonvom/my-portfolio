"use client";

import { useEffect, useRef, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
};

let idCounter = 0;

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "neutral", fontFamily: "inherit" });
        const id = `mermaid-${++idCounter}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setError(true);
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) return null;
  if (!svg) return <div className="h-32 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse" />;

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-x-auto bg-neutral-50 dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.07] p-4 [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

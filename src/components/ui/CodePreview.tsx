"use client";

import { highlight } from "sugar-high";

type CodePreviewProps = {
  code: string;
  language?: string;
  filename?: string;
};

export function CodePreview({ code, filename }: CodePreviewProps) {
  const html = highlight(code);

  return (
    <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#f8f8f8] dark:bg-[#0d0e17]">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.03]">
          <span className="text-[10px] text-neutral-500 font-mono">{filename}</span>
        </div>
      )}
      <pre className="px-4 py-3 overflow-x-auto text-[11.5px] leading-[1.75] font-mono">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

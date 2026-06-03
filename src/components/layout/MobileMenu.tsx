"use client";

import { motion, AnimatePresence } from "motion/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  sections: { label: string; id: string }[];
  onNavigate: (id: string) => void;
};

export function MobileMenu({ isOpen, onClose, sections, onNavigate }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-center px-8"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-[10px] tracking-[3px] uppercase"
            style={{ color: "var(--sub)" }}
          >
            Close
          </button>
          <nav className="flex flex-col gap-2">
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => { onNavigate(s.id); onClose(); }}
                className="text-left text-4xl font-black tracking-[-2px] py-2"
                style={{ color: "var(--fg)" }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {s.label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

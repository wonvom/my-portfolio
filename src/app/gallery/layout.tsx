export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f5f5f7] dark:bg-[#07070f]">
      {children}
    </div>
  );
}

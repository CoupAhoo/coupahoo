import type { ReactNode } from "react";

export function Sea({ children, compact }: { children: ReactNode; compact?: boolean }) {
  return (
    <div
      className="relative isolate overflow-hidden rounded-[18px] border-[3px] border-ink"
      style={{ minHeight: compact ? 420 : 520 }}
    >
      <div className="absolute inset-0 bg-sky" />
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-70"
        style={{
          background:
            "radial-gradient(20px 12px at 12% 40%, #fff 40%, transparent 42%), radial-gradient(28px 14px at 48% 30%, #fff 40%, transparent 42%), radial-gradient(22px 12px at 82% 45%, #fff 40%, transparent 42%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-sea" />
      <div className="sea-swell absolute inset-x-0 bottom-[38%] h-10 opacity-80" />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end px-3 pb-6 pt-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}

import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  compact?: boolean;
  framed?: boolean;
  className?: string;
};

export function Sea({ children, compact, framed = true, className }: Props) {
  const minH = compact ? 380 : 560;
  const style = { minHeight: minH } as CSSProperties;
  return (
    <div
      className={`ahoo-sky relative isolate overflow-hidden ${
        framed ? "rounded-[22px] border-[3px] border-ink" : ""
      } ${className ?? ""}`}
      style={style}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
        <g fill="none" stroke="var(--color-sky-line)" strokeWidth="10" strokeLinecap="round" strokeDasharray="0 34">
          {Array.from({ length: 18 }, (_, i) => (
            <path key={i} d={`M ${-80 + i * 90} -40 L ${120 + i * 90} 820`} />
          ))}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0">
        <span className="cloud cloud-a" />
        <span className="cloud cloud-b" />
        <span className="cloud cloud-c" />
      </div>
      <div className="ahoo-water absolute inset-x-0 bottom-0 h-[42%]" />
      <svg
        className="wave-band pointer-events-none absolute inset-x-0 bottom-[38%] h-16 w-[200%]"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="wave-path"
          d="M0 40 Q 50 18 100 40 T 200 40 T 300 40 T 400 40 T 500 40 T 600 40 T 700 40 T 800 40 T 900 40 T 1000 40 T 1100 40 T 1200 40 V80 H0 Z"
          fill="var(--color-sea)"
          stroke="var(--color-foam)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col px-3 pb-8 pt-4 sm:px-6">{children}</div>
    </div>
  );
}

import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  compact?: boolean;
  framed?: boolean;
  className?: string;
};

const STREAKS = Array.from({ length: 28 }, (_, i) => i);
const CLOUDS = [
  { x: 160, y: 90, s: 1.1 },
  { x: 480, y: 50, s: 0.85 },
  { x: 820, y: 110, s: 1.35 },
  { x: 1100, y: 40, s: 0.95 },
  { x: 140, y: 200, s: 0.8 },
];

export function Sea({ children, compact, framed = true, className }: Props) {
  const minH = compact ? 420 : 580;
  const style = { minHeight: minH } as CSSProperties;
  return (
    <div
      className={`ahoo-sky relative isolate overflow-hidden ${
        framed ? "rounded-[22px] border-[3px] border-ink" : ""
      } ${className ?? ""}`}
      style={style}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {STREAKS.map((i) => (
          <g key={i} transform={`translate(${-200 + i * 80},0) rotate(45)`}>
            <path
              d="M0,-400 L0,1600"
              stroke="#0000ff22"
              strokeWidth="48"
              strokeLinecap="round"
              strokeDasharray="0 35"
              fill="none"
            />
          </g>
        ))}
        {CLOUDS.map((c, i) => (
          <ellipse
            key={i}
            cx={c.x}
            cy={c.y}
            rx={140 * c.s}
            ry={30 * c.s}
            fill="none"
            stroke="#ffffff22"
            strokeWidth={100 * c.s}
            strokeLinecap="round"
            strokeDasharray={`0 ${80 * c.s}`}
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[#2bb8c9]" />
      <svg
        className="wave-band pointer-events-none absolute inset-x-0 bottom-[24%] h-12 w-[200%]"
        viewBox="0 0 2400 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 Q50,18 100,40 T200,40 T300,40 T400,40 T500,40 T600,40 T700,40 T800,40 T900,40 T1000,40 T1100,40 T1200,40 T1300,40 T1400,40 T1500,40 T1600,40 T1700,40 T1800,40 T1900,40 T2000,40 T2100,40 T2200,40 T2300,40 T2400,40 L2400,80 L0,80 Z"
          fill="#03fcf4aa"
          stroke="#ffffffbb"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col px-3 pb-16 pt-4 sm:px-6 sm:pb-20">
        {children}
      </div>
    </div>
  );
}

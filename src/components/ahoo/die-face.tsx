type Props = {
  pips: number;
  plated?: boolean;
  size?: number;
  dim?: boolean;
  selected?: boolean;
  damage?: boolean;
  onClick?: () => void;
  label?: string;
};

const PIP_POS: Record<number, [number, number][]> = {
  0: [],
  1: [[50, 50]],
  2: [
    [25, 25],
    [75, 75],
  ],
  3: [
    [25, 25],
    [50, 50],
    [75, 75],
  ],
  4: [
    [25, 25],
    [75, 25],
    [25, 75],
    [75, 75],
  ],
  5: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 75],
    [75, 75],
  ],
  6: [
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75],
  ],
  7: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75],
  ],
  8: [
    [25, 22],
    [75, 22],
    [25, 41],
    [75, 41],
    [25, 59],
    [75, 59],
    [25, 78],
    [75, 78],
  ],
  9: [
    [25, 22],
    [75, 22],
    [50, 22],
    [25, 50],
    [50, 50],
    [75, 50],
    [25, 78],
    [50, 78],
    [75, 78],
  ],
};

function Star({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="28" fill="#000">
      ✦
    </text>
  );
}

export function DieFace({
  pips,
  plated,
  size = 44,
  dim,
  selected,
  damage,
  onClick,
  label,
}: Props) {
  const n = Math.max(0, Math.min(9, pips));
  const spots = PIP_POS[n] ?? PIP_POS[6];
  const fill = selected ? "#f2e949" : plated ? "#a9c5db" : "#fff";
  const className = "relative inline-flex items-center justify-center border-[4px] border-black";
  const style = {
    width: size,
    height: size,
    opacity: dim ? 0.4 : 1,
    background: fill,
  } as const;
  const face = (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {damage
        ? spots.map(([x, y], i) => <Star key={i} x={x} y={y} />)
        : spots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8} fill="#000" />)}
    </svg>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label ?? `${n} pip die`} className={className} style={style}>
        {face}
      </button>
    );
  }
  return (
    <div aria-label={label ?? `${n} pip die`} className={className} style={style}>
      {face}
    </div>
  );
}

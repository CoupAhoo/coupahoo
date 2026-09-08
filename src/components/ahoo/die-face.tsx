type Props = {
  pips: number;
  plated?: boolean;
  size?: number;
  dim?: boolean;
  selected?: boolean;
  onClick?: () => void;
  label?: string;
};

const PIP_POS: Record<number, [number, number][]> = {
  0: [],
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]],
  7: [[28, 24], [72, 24], [50, 50], [28, 50], [72, 50], [28, 76], [72, 76]],
  8: [[28, 22], [72, 22], [28, 41], [72, 41], [28, 59], [72, 59], [28, 78], [72, 78]],
  9: [[28, 22], [72, 22], [50, 22], [28, 50], [50, 50], [72, 50], [28, 78], [50, 78], [72, 78]],
};

export function DieFace({ pips, plated, size = 44, dim, selected, onClick, label }: Props) {
  const n = Math.max(0, Math.min(9, pips));
  const spots = PIP_POS[n] ?? PIP_POS[6];
  const className =
    "relative inline-flex items-center justify-center rounded-[6px] border-[3px] border-ink bg-paper shadow-[2px_2px_0_0_var(--color-ink)]";
  const style = {
    width: size,
    height: size,
    opacity: dim ? 0.45 : 1,
    outline: selected ? "3px solid var(--color-sail-orange)" : undefined,
    outlineOffset: 2,
    background: plated ? "#d9d3c4" : undefined,
  } as const;
  const face = (
    <>
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
        {spots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={plated ? 8 : 9} fill="var(--color-ink)" />
        ))}
      </svg>
      {plated ? (
        <span className="pointer-events-none absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-ink bg-gold" />
      ) : null}
    </>
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

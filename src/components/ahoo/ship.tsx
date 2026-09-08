import { DieFace } from "@/components/ahoo/die-face";
import { hp, isCursed, type Crew, type Die, type Sail } from "@/lib/ahoo/engine";

type Props = {
  name: string;
  sail: Sail;
  cargo: Die[];
  crew?: Crew[];
  facing?: "left" | "right";
  onDieClick?: (id: string) => void;
  aim?: boolean;
  compact?: boolean;
};

const SAIL: Record<Sail, string> = {
  orange: "var(--color-sail-orange)",
  magenta: "var(--color-sail-magenta)",
  cream: "var(--color-paper)",
};

function Stick({ hat, body }: { hat: string; body: string }) {
  return (
    <svg viewBox="0 0 40 70" width="28" height="48" aria-hidden="true">
      <ellipse cx="20" cy="66" rx="10" ry="3" fill="var(--color-ink)" opacity="0.15" />
      <rect x="17" y="28" width="6" height="22" rx="3" fill={body} stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="20" cy="18" r="9" fill="#f6e4c8" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="17" cy="17" r="1.4" fill="var(--color-ink)" />
      <circle cx="23" cy="17" r="1.4" fill="var(--color-ink)" />
      <path d="M16 22 Q20 25 24 22" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <path d="M11 12 Q20 4 29 12" fill={hat} stroke="var(--color-ink)" strokeWidth="2" />
      <line x1="20" y1="6" x2="20" y2="1" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="20" cy="1" r="2.2" fill={hat} stroke="var(--color-ink)" strokeWidth="1.5" />
    </svg>
  );
}

export function Ship({ name, sail, cargo, crew = [], facing = "right", onDieClick, aim, compact }: Props) {
  const cursed = isCursed(cargo);
  const total = hp(cargo);
  const sailFill = SAIL[sail];
  return (
    <div className={`relative ${compact ? "w-full max-w-[420px]" : "w-full max-w-[520px]"}`}>
      <div className="mb-1 flex items-end justify-between gap-2 px-2">
        <p className="font-display text-lg leading-none tracking-wide">{name}</p>
        <p className={`font-display text-2xl leading-none tabular-nums ${cursed ? "curse-glow" : ""}`}>
          {total}
        </p>
      </div>
      <div className="bob relative">
        <svg
          viewBox="0 0 320 160"
          className="h-auto w-full"
          style={{ transform: facing === "left" ? "scaleX(-1)" : undefined }}
          aria-hidden="true"
        >
          <polygon points="148,18 148,108 218,78" fill={sailFill} stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" />
          <polygon points="148,28 108,86 148,86" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          <rect x="142" y="12" width="8" height="108" rx="2" fill="var(--color-hull-deep)" stroke="var(--color-ink)" strokeWidth="2" />
          <path
            d="M36 112 C70 92, 250 92, 286 114 L270 138 C210 150, 110 150, 52 138 Z"
            fill="var(--color-hull)"
            stroke="var(--color-ink)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <rect x="210" y="96" width="46" height="16" rx="4" fill="var(--color-ink)" />
          <circle cx="256" cy="104" r="9" fill="#3a3a3a" stroke="var(--color-ink)" strokeWidth="2" />
        </svg>
        <div className="absolute bottom-[30%] left-[16%] right-[18%] flex flex-wrap items-end justify-center gap-1">
          {cargo.map((d) => (
            <DieFace
              key={d.id}
              pips={d.pips}
              plated={d.plated}
              size={aim ? 48 : 38}
              onClick={onDieClick ? () => onDieClick(d.id) : undefined}
              label={`Cargo ${d.pips}${d.plated ? " plated" : ""}`}
            />
          ))}
        </div>
        <div
          className="absolute bottom-[38%] flex items-end gap-1"
          style={{
            left: facing === "left" ? undefined : "18%",
            right: facing === "left" ? "18%" : undefined,
          }}
        >
          <Stick hat={sailFill} body={sail === "magenta" ? "#f4c4d8" : "#f3d7a4"} />
          {crew.slice(0, 2).map((c) => (
            <Stick key={c.id} hat="var(--color-gold)" body="#c8e4ef" />
          ))}
        </div>
      </div>
      {cursed ? (
        <p className="mt-1 text-center font-display text-sm tracking-wide text-curse">THIRTEEN</p>
      ) : null}
    </div>
  );
}

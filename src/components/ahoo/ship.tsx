import { DieFace } from "@/components/ahoo/die-face";
import { Dude, type DudeRole } from "@/components/ahoo/dude";
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
  angry?: boolean;
  crown?: boolean;
  captain?: boolean;
  sunk?: boolean;
};

const SAIL: Record<Sail, string> = {
  orange: "var(--color-sail-orange)",
  magenta: "var(--color-sail-magenta)",
  cream: "var(--color-paper)",
};

const CREW_ROLE: Record<Crew["kind"], DudeRole> = {
  gunner: "gunner",
  carpenter: "carpenter",
  lookout: "lookout",
  cook: "cook",
};

export function Ship({
  name,
  sail,
  cargo,
  crew = [],
  facing = "right",
  onDieClick,
  aim,
  compact,
  angry,
  crown,
  captain = true,
  sunk,
}: Props) {
  const cursed = isCursed(cargo);
  const total = cargo.length ? hp(cargo) : 0;
  const sailFill = SAIL[sail];
  const dieSize = aim ? 40 : compact ? 26 : 32;
  const flip = facing === "left";
  const lookout = crew.find((c) => c.kind === "lookout");
  const rest = crew.filter((c) => c.kind !== "lookout").slice(0, 2);

  return (
    <div className={`relative ${compact ? "w-full max-w-[420px]" : "w-full max-w-[540px]"}`}>
      {compact ? null : (
        <p className="mb-1 px-3 font-display text-sm tracking-wide text-ink/70">{name}</p>
      )}
      <div className={`relative ${sunk ? "sink" : "bob"}`}>
        <div className={flip ? "-scale-x-100" : ""}>
          <svg viewBox="0 0 440 250" className="h-auto w-full" aria-hidden="true">
            <rect
              x="236"
              y="28"
              width="12"
              height="150"
              rx="2"
              fill="var(--color-mast)"
              stroke="var(--color-ink)"
              strokeWidth="3"
            />
            <path
              d="M242 36 Q 70 90 48 168 L 242 168 Z"
              fill={sailFill}
              stroke="var(--color-ink)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M242 48 Q 190 88 242 160"
              fill="var(--color-paper)"
              opacity="0.18"
            />
            <g>
              <path
                d="M318 168 C 318 128, 368 122, 406 158 C 412 164, 404 172, 390 168 L 332 176 Z"
                fill="var(--color-cannon)"
                stroke="var(--color-ink)"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <rect
                x="328"
                y="152"
                width="18"
                height="28"
                rx="2"
                fill="var(--color-cannon)"
                stroke="var(--color-ink)"
                strokeWidth="3"
              />
              <path
                d="M300 176 C 300 148, 338 146, 338 176 Z"
                fill="var(--color-hull)"
                stroke="var(--color-ink)"
                strokeWidth="3.5"
              />
              <circle cx="318" cy="168" r="5" fill="var(--color-ink)" />
            </g>
            <path
              d="M24 150 L 40 218 L 324 218 L 408 146 Z"
              fill="var(--color-hull)"
              stroke="var(--color-ink)"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M34 168 L 384 164 M 38 186 L 360 186 M 42 202 L 340 204"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="3"
              opacity="0.55"
            />
            {lookout ? (
              <path
                d="M214 36 L 204 8 H 276 L 266 36 Z"
                fill="var(--color-hull)"
                stroke="var(--color-ink)"
                strokeWidth="3"
              />
            ) : null}
          </svg>

          <div className="pointer-events-none absolute bottom-[28%] left-[52%] z-[2]">
            <Dude
              role={captain ? (angry ? "enemy" : "captain") : "enemy"}
              angry={angry}
              crown={crown}
              size={compact ? 58 : 74}
            />
          </div>
          {lookout ? (
            <div className="pointer-events-none absolute left-[48%] top-[0%] z-[2]">
              <Dude role="lookout" size={compact ? 26 : 32} />
            </div>
          ) : null}
          <div className="pointer-events-none absolute bottom-[32%] left-[38%] z-[2] flex items-end">
            {rest.map((c) => (
              <Dude key={c.id} role={CREW_ROLE[c.kind]} size={compact ? 34 : 42} />
            ))}
          </div>

          <div
            className="absolute bottom-[32%] left-[26%] z-[3] flex h-[5.4rem] flex-col-reverse flex-wrap content-start gap-[2px]"
            style={{ maxWidth: "34%" }}
          >
            {cargo.map((d) => (
              <DieFace
                key={d.id}
                pips={d.pips}
                plated={d.plated}
                size={dieSize}
                onClick={onDieClick ? () => onDieClick(d.id) : undefined}
                label={`Cargo ${d.pips}${d.plated ? " plated" : ""}`}
              />
            ))}
          </div>
        </div>

        {cargo.length ? (
          <span
            className={`pointer-events-none absolute bottom-[14%] z-[4] font-display text-2xl tracking-wide text-paper sm:text-3xl ${
              flip ? "right-[24%]" : "left-[24%]"
            }`}
            style={{
              WebkitTextStroke: "4px var(--color-ink)",
              paintOrder: "stroke fill",
            }}
          >
            {total}
          </span>
        ) : null}
      </div>
      {cursed ? (
        <p className="mt-1 text-center font-display text-sm tracking-[0.2em] text-curse">THIRTEEN</p>
      ) : null}
    </div>
  );
}

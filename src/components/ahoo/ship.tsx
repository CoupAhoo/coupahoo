import { DieFace } from "@/components/ahoo/die-face";
import { DudeFigure, type DudeRole } from "@/components/ahoo/dude";
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
  posing?: boolean;
  sunk?: boolean;
  friendly?: boolean;
};

const SAIL: Record<Sail, string> = {
  orange: "#e92",
  magenta: "#d420b6",
  cream: "#ff3",
};

const HULL = "#633f15";
const MAST = "#7d572c";
const INK = "#000";

const CREW_ROLE: Record<Crew["kind"], DudeRole> = {
  gunner: "gunner",
  carpenter: "carpenter",
  lookout: "lookout",
  cook: "cook",
};

const CREW_POS: Record<Crew["kind"], { x: number; y: number }> = {
  gunner: { x: 120, y: -122 },
  carpenter: { x: -80, y: -72 },
  lookout: { x: 0, y: -400 },
  cook: { x: -110, y: -70 },
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
  posing,
  sunk,
  friendly,
}: Props) {
  const cursed = isCursed(cargo);
  const total = cargo.length ? hp(cargo) : 0;
  const sailFill = SAIL[sail];
  const dieSize = aim ? 44 : compact ? 36 : 42;
  const flip = facing === "left";
  const lookout = crew.find((c) => c.kind === "lookout");
  const rest = crew.filter((c) => c.kind !== "lookout");

  return (
    <div className={`relative ${compact ? "w-full max-w-[480px]" : "w-full max-w-[620px]"}`}>
      {compact ? null : (
        <p className="mb-1 px-3 font-display text-sm tracking-wide text-ink/70">{name}</p>
      )}
      <div className={`relative ${sunk ? "sink" : aim ? "" : "bob"}`}>
        <div className={flip ? "-scale-x-100" : ""}>
          <svg viewBox="-420 -640 840 700" className="h-auto w-full" aria-hidden="true" overflow="visible">
            <rect x="-10" y="-550" width="15" height="520" fill={MAST} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
            <path
              d="M-20,-520 Q-203,-400 -303,-183 L-20,-180 Z"
              fill={sailFill}
              stroke={INK}
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {friendly ? null : (
              <g transform="translate(160,0) rotate(-6)">
                <g transform="translate(190,0)">
                  <path
                    d="M0,-225 C-300,-250 -300,-150 0,-175 Z"
                    fill="#666"
                    stroke={INK}
                    strokeWidth="7"
                    strokeLinejoin="round"
                  />
                  <rect x="-20" y="-230" width="20" height="60" fill="#666" stroke={INK} strokeWidth="7" />
                </g>
                <path
                  d="M0,-150 C0,-230 70,-230 70,-150 Z"
                  fill={HULL}
                  stroke={INK}
                  strokeWidth="7"
                  strokeLinejoin="round"
                />
                <circle cx="35" cy="-190" r="8" fill={INK} />
              </g>
            )}

            <g transform="scale(1.4)">
              {captain ? (
                <g transform="translate(-55,-72)">
                  <DudeFigure
                    role={angry ? "enemy" : "captain"}
                    angry={angry}
                    crown={crown}
                    posing={posing || angry}
                  />
                </g>
              ) : null}
              {rest.map((c) => (
                <g key={c.id} transform={`translate(${CREW_POS[c.kind].x},${CREW_POS[c.kind].y})`}>
                  <DudeFigure role={CREW_ROLE[c.kind]} />
                </g>
              ))}
              {lookout ? (
                <g transform={`translate(${CREW_POS.lookout.x},${CREW_POS.lookout.y})`}>
                  <DudeFigure role="lookout" />
                </g>
              ) : null}
            </g>

            <path
              d={
                lookout
                  ? "M-200,-150 L-170,10 L180,10 L250,-160 Z M-193,-110 L233,-120 M-183,-72 L213,-77 M-173,-30 L193,-30 M-60,-535 L-80,-595 L80,-595 L60,-535 Z M-70,-565 L70,-565"
                  : "M-200,-150 L-170,10 L180,10 L250,-160 Z M-193,-110 L233,-120 M-183,-72 L213,-77 M-173,-30 L193,-30"
              }
              fill={HULL}
              stroke={INK}
              strokeWidth="7"
              strokeLinejoin="round"
            />
          </svg>

          <div
            className="absolute z-[5] flex flex-col-reverse flex-wrap-reverse content-end items-end gap-[2px]"
            style={{ left: "24%", bottom: "36%", maxWidth: "38%", maxHeight: "44%" }}
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
            className={`pointer-events-none absolute bottom-[26%] z-[4] font-display text-2xl tracking-wide text-sail-yellow sm:text-3xl ${
              flip ? "right-[22%]" : "left-[18%]"
            }`}
            style={{
              WebkitTextStroke: "5px var(--color-ink)",
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

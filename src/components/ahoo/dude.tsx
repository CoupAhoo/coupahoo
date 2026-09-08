import type { CrewKind } from "@/lib/ahoo/engine";

export type DudeRole = "captain" | "enemy" | CrewKind;

type Props = {
  role?: DudeRole;
  angry?: boolean;
  crown?: boolean;
  posing?: boolean;
  size?: number;
  className?: string;
  crop?: "full" | "head";
};

type Look = {
  skin: string;
  hat: string;
  ribbon: string;
  cane: string | null;
  flipHat: number;
  scale: number;
};

const LOOK: Record<DudeRole, Look> = {
  captain: {
    skin: "#dbac86",
    hat: "#2d6b3a",
    ribbon: "#e92",
    cane: "#633f15",
    flipHat: 1,
    scale: 1,
  },
  enemy: {
    skin: "#734e3b",
    hat: "#d420b6",
    ribbon: "#ff3",
    cane: "#7d572c",
    flipHat: 1,
    scale: 1,
  },
  gunner: {
    skin: "#e3e0bc",
    hat: "#9d55d4",
    ribbon: "#ff3",
    cane: null,
    flipHat: -1,
    scale: 0.9,
  },
  carpenter: {
    skin: "#ebb7cc",
    hat: "#6cd158",
    ribbon: "#fff",
    cane: null,
    flipHat: 1,
    scale: 0.9,
  },
  lookout: {
    skin: "#6e594f",
    hat: "#333",
    ribbon: "#f0ed92",
    cane: null,
    flipHat: -1,
    scale: 0.9,
  },
  cook: {
    skin: "#edece1",
    hat: "#a8edae",
    ribbon: "#333",
    cane: null,
    flipHat: 1,
    scale: 0.9,
  },
};

const INK = "#000";
const BLUSH = "#ed4ea3aa";

function Face({ angry }: { angry: boolean }) {
  return (
    <g transform="scale(0.3)">
      <ellipse cx="-44" cy="20" rx="16.5" ry="11" fill={BLUSH} />
      <ellipse cx="44" cy="20" rx="16.5" ry="11" fill={BLUSH} />
      {angry ? (
        <>
          <path d="M-20,-5 L-50,-20" stroke={INK} strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d="M20,-5 L50,-20" stroke={INK} strokeWidth="11" strokeLinecap="round" fill="none" />
          <path
            d="M-16.8,20 Q0,10 16.8,20 Q0,10 -16.8,20"
            fill={INK}
            stroke={INK}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d="M-16.8,20 Q0,40 16.8,20 Q0,40 -16.8,20"
          fill={INK}
          stroke={INK}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <ellipse cx="-30" cy="0" rx="10" ry="10" fill={INK} />
      <ellipse cx="30" cy="0" rx="10" ry="10" fill={INK} />
    </g>
  );
}

function Hat({ hat, ribbon, crown }: { hat: string; ribbon: string; crown: boolean }) {
  if (crown) {
    return (
      <g transform="scale(0.75) translate(0,-12)">
        <path
          d="M-12,-10 L12,-10 L12,-25 L5,-19 L0,-27 L-5,-19 L-12,-25 Z"
          fill="yellow"
          stroke={INK}
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>
    );
  }
  return (
    <g transform="translate(2,-1)">
      <path
        d="M8,-15 C-12,-5 -12,-5 -20,-5.7 C-10,-26 -3,-25.3 10,-18"
        fill={hat}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M9,-17 C7,-25 7,-25 13.9,-35 C15,-25 15,-25 9,-17"
        fill={ribbon}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Inner figure. Origin at the feet, matching dude.ts / captain.svg. */
export function DudeFigure({
  role = "captain",
  angry = false,
  crown = false,
  posing = false,
}: Omit<Props, "size" | "className" | "crop">) {
  const look = LOOK[role];
  const boss = crown && angry;
  const scale = look.scale * (boss ? 1.3 : 1);
  const lean = posing ? -16.04 : 1.15;
  const hop = posing ? -10 : 0;

  return (
    <g transform={`translate(0,${hop}) scale(${scale})`}>
      {posing ? (
        <path
          d="M0,-33.5 Q32.1,-76.75 22,-45"
          fill="none"
          stroke={INK}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M0,-33.5 Q32.1,-31.75 22,0"
          fill="none"
          stroke={INK}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d="M0,-33.5 Q-32.1,-31.75 -22,0"
        fill="none"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform={`translate(0,-3.5) rotate(${lean})`}>
        <path d="M0,-40 L0,-90" stroke={INK} strokeWidth="50" strokeLinecap="round" fill="none" />
        <path d="M0,-40 L0,-90" stroke={look.skin} strokeWidth="35" strokeLinecap="round" fill="none" />
        <g transform="translate(0,-20)">
          <g transform="translate(22,-11.5)">
            {look.cane ? (
              <>
                <path
                  d="M0,-20.25 Q17.05,12.2 20,-16.75"
                  fill="none"
                  stroke={INK}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="-16.75" r="3" fill={INK} />
                <g transform="translate(20,-16.75)">
                  <path d="M0,0 L0,50" stroke={INK} strokeWidth="12" strokeLinecap="round" />
                  <path d="M0,0 L0,50" stroke={look.cane} strokeWidth="6" strokeLinecap="round" />
                </g>
              </>
            ) : (
              <>
                <path d="M0,-18 Q18,-23.6 17,-3" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
                <circle cx="17" cy="-3" r="3" fill={INK} />
              </>
            )}
          </g>
          <g transform="translate(-22,-11.5)">
            <path d="M0,-20.25 Q-22,-26.3 -13,-5.25" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            <circle cx="-13" cy="-5.25" r="3" fill={INK} />
          </g>
          <g transform="translate(4,-51.75)">
            <Face angry={angry || Boolean(boss)} />
            <g transform="translate(-3.9,0) scale(1.35)">
              <g transform="translate(0,-15.55)">
                <g transform={`translate(0,18.25) scale(${1.5 * look.flipHat},1.5)`}>
                  <Hat hat={look.hat} ribbon={look.ribbon} crown={crown} />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/** Sausage pirate. Geometry after Haavikko’s Coup Ahoo captain (MIT). */
export function Dude({
  role = "captain",
  angry = false,
  crown = false,
  posing = false,
  size = 72,
  className,
  crop = "full",
}: Props) {
  const head = crop === "head";
  const w = size;
  const h = head ? size : size * (250 / 190);
  return (
    <svg
      viewBox={head ? "-62 -228 124 108" : "-95 -235 190 250"}
      width={w}
      height={h}
      className={className}
      aria-hidden="true"
      overflow={head ? "hidden" : "visible"}
    >
      <DudeFigure role={role} angry={angry} crown={crown} posing={posing} />
    </svg>
  );
}

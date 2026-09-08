import type { CrewKind } from "@/lib/ahoo/engine";

export type DudeRole = "captain" | "enemy" | CrewKind;

type Props = {
  role?: DudeRole;
  angry?: boolean;
  crown?: boolean;
  size?: number;
  className?: string;
  crop?: "full" | "head";
};

const LOOK: Record<
  DudeRole,
  { skin: string; hat: string; ribbon: string; cane: string | null; sailor: boolean }
> = {
  captain: {
    skin: "var(--color-skin)",
    hat: "var(--color-paper)",
    ribbon: "var(--color-sail-orange)",
    cane: "var(--color-mast)",
    sailor: true,
  },
  enemy: {
    skin: "var(--color-skin-deep)",
    hat: "var(--color-sail-magenta)",
    ribbon: "var(--color-paper)",
    cane: null,
    sailor: false,
  },
  gunner: {
    skin: "var(--color-skin)",
    hat: "var(--color-sail-orange)",
    ribbon: "var(--color-gold)",
    cane: null,
    sailor: false,
  },
  carpenter: {
    skin: "var(--color-skin-warm)",
    hat: "var(--color-yeah-deep)",
    ribbon: "var(--color-paper)",
    cane: null,
    sailor: false,
  },
  lookout: {
    skin: "var(--color-skin)",
    hat: "var(--color-paper)",
    ribbon: "var(--color-ink)",
    cane: null,
    sailor: false,
  },
  cook: {
    skin: "var(--color-skin-warm)",
    hat: "var(--color-gold)",
    ribbon: "var(--color-sail-orange)",
    cane: null,
    sailor: false,
  },
};

/** Sausage pirate — geometry after Haavikko’s Coup Ahoo captain, drawn original. */
export function Dude({
  role = "captain",
  angry = false,
  crown = false,
  size = 72,
  className,
  crop = "full",
}: Props) {
  const look = LOOK[role];
  const head = crop === "head";
  return (
    <svg
      viewBox={head ? "16 6 48 72" : "0 0 80 120"}
      width={size}
      height={head ? size : size * 1.5}
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      <ellipse cx="40" cy="114" rx="16" ry="4" fill="var(--color-ink)" opacity="0.16" />
      <path
        d="M34 86 Q24 100 26 112"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M48 86 Q58 100 54 112"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M40 34 C58 34 62 46 62 64 C62 86 54 94 40 94 C26 94 18 86 18 64 C18 46 22 34 40 34 Z"
        fill={look.skin}
        stroke="var(--color-ink)"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path
        d="M22 62 Q12 70 11 82"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {look.cane ? (
        <g>
          <path
            d="M58 60 Q70 52 72 38"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M72 38 V96"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M72 38 V96"
            fill="none"
            stroke={look.cane}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <path
          d="M58 62 Q70 68 69 80"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      )}
      <ellipse cx="28" cy="62" rx="6.5" ry="4" fill="var(--color-blush)" opacity="0.55" />
      <ellipse cx="52" cy="62" rx="6.5" ry="4" fill="var(--color-blush)" opacity="0.55" />
      {angry ? (
        <>
          <path d="M26 50 L36 54" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M54 50 L44 54" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" />
        </>
      ) : null}
      <circle cx="32" cy="56" r="3.1" fill="var(--color-ink)" />
      <circle cx="48" cy="56" r="3.1" fill="var(--color-ink)" />
      {angry ? (
        <path
          d="M32 74 Q40 70 48 74"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M32 70 Q40 78 48 70"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      )}
      {crown ? (
        <path
          d="M22 30 L58 30 L58 14 L48 22 L40 10 L32 22 L22 14 Z"
          fill="var(--color-gold)"
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      ) : look.sailor ? (
        <g>
          <ellipse
            cx="40"
            cy="32"
            rx="24"
            ry="7"
            fill={look.hat}
            stroke="var(--color-ink)"
            strokeWidth="3.2"
          />
          <path
            d="M20 32 Q40 14 60 32"
            fill={look.hat}
            stroke="var(--color-ink)"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M50 18 Q62 2 68 8 Q58 16 52 24"
            fill={look.ribbon}
            stroke="var(--color-ink)"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </g>
      ) : (
        <g>
          <path
            d="M16 36 C8 40 10 46 22 46 L60 40 C70 38 68 28 54 24 C40 20 28 26 16 36 Z"
            fill={look.hat}
            stroke="var(--color-ink)"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M56 26 Q68 8 74 6 Q66 20 58 30"
            fill={look.ribbon}
            stroke="var(--color-ink)"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

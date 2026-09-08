import { SOCIALS } from "@/lib/game";

type Props = {
  compact?: boolean;
  className?: string;
};

export function Socials({ compact, className }: Props) {
  return (
    <nav
      aria-label="Social"
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className ?? ""}`}
    >
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className={`font-extrabold no-underline hover:underline ${
            compact ? "text-sm" : "text-sm sm:text-base"
          }`}
        >
          {compact ? s.label : `${s.label} ${s.handle}`}
        </a>
      ))}
    </nav>
  );
}

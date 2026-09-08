import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAME, SLOGAN, ATTRIBUTION, SITE } from "@/lib/game";
import { WalletBar } from "@/components/ahoo/wallet-bar";
import { Dude } from "@/components/ahoo/dude";
import { Socials } from "@/components/ahoo/socials";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/play", label: "Play" },
  { to: "/hold", label: "Hold" },
  { to: "/lore", label: "Lore" },
  { to: "/token", label: "Token" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const play = pathname === "/play";
  return (
    <div className="min-h-dvh bg-sky text-ink">
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2">
          <Link to="/" className="flex min-w-0 items-center gap-2 no-underline">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden">
              <Dude role="captain" crop="head" size={40} className="overflow-hidden" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl tracking-wide">{NAME}</span>
              <span className="block text-xs font-semibold text-ink/60">{SLOGAN}</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
            {NAV.map((n) => {
              const on = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-md px-3 py-2 text-sm font-extrabold no-underline ${
                    on ? "bg-ink text-paper" : "text-ink hover:bg-paper-deep"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <Socials compact className="sm:ml-auto" />
          <WalletBar />
        </div>
      </header>
      <main
        className={
          play
            ? "mx-auto w-full max-w-6xl px-0 py-0 sm:px-4 sm:py-4"
            : "mx-auto w-full max-w-6xl px-4 py-6"
        }
      >
        {children}
      </main>
      <footer className="border-t-[3px] border-ink bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-8 shrink-0 overflow-hidden">
              <Dude role="captain" size={36} className="overflow-hidden" />
            </span>
            <p>{ATTRIBUTION}</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <Socials />
            <p>
              <a className="font-semibold text-ink" href={SITE}>
                {SITE.replace("https://", "")}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

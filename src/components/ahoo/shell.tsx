import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAME, SLOGAN, ATTRIBUTION, SITE } from "@/lib/game";
import { WalletBar } from "@/components/ahoo/wallet-bar";
import { Dude } from "@/components/ahoo/dude";

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
      <header className="sticky top-0 z-30 overflow-visible border-b-[3px] border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <Dude role="captain" crop="head" size={40} />
              <span className="leading-tight">
                <span className="block font-display text-xl tracking-wide">{NAME}</span>
                <span className="block text-xs font-semibold text-ink/60">{SLOGAN}</span>
              </span>
            </Link>
            <div className="ml-auto sm:hidden">
              <WalletBar />
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-1 sm:ml-auto">
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
            <span className="hidden sm:inline-flex">
              <WalletBar />
            </span>
          </nav>
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Dude role="captain" size={36} />
            <p>{ATTRIBUTION}</p>
          </div>
          <p>
            <a className="font-semibold text-ink" href={SITE}>
              {SITE.replace("https://", "")}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

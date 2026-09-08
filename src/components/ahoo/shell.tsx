import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAME, SLOGAN, ATTRIBUTION, SITE } from "@/lib/game";
import { WalletBar } from "@/components/ahoo/wallet-bar";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/play", label: "Play" },
  { to: "/hold", label: "Hold" },
  { to: "/lore", label: "Lore" },
  { to: "/token", label: "Token" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-sky text-ink">
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border-[3px] border-ink bg-sail-orange font-display text-lg leading-none">
                13
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl tracking-wide">{NAME}</span>
                <span className="block text-xs text-ink/60">{SLOGAN}</span>
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
                  className={`rounded-md px-3 py-2 text-sm font-semibold no-underline ${
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
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
      <footer className="border-t-[3px] border-ink bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{ATTRIBUTION}</p>
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

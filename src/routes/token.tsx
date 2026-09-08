import { createFileRoute } from "@tanstack/react-router";
import { CaStrip } from "@/components/ahoo/ca-strip";
import {
  CHAIN,
  CONTRACTS,
  FEE,
  GITHUB,
  LETSCASH_PAD,
  TICKER,
  X_URL,
  explorerAddress,
  shortCa,
  SITE,
} from "@/lib/game";

export const Route = createFileRoute("/token")({ component: TokenPage });

function TokenPage() {
  const rows = [
    ["Name", "Coup Ahoo"],
    ["Ticker", `$${TICKER}`],
    ["Chain", `${CHAIN.name} (${CHAIN.id})`],
    ["Supply", "1,000,000,000"],
    ["Trade tax", `${FEE.taxBps / 100}% of the ETH leg`],
    ["Platform", `${FEE.platformBps / 10}% LetsCash`],
    ["The Hold", `${FEE.creatorBps / 100}% of every trade`],
    ["Quote", "ETH"],
    ["LP", "Locked at launch"],
  ];
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <p className="font-display text-sm tracking-[0.2em] text-ink/50">${TICKER}</p>
        <h1 className="font-display text-5xl tracking-wide">The token is the wake.</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">
          Launch on LetsCash. Fee recipient is The Hold — the contract, not a wallet. Split inside
          the Hold is prize / drip / cabin.
        </p>
      </header>
      <CaStrip />
      <section className="overflow-hidden rounded-[18px] border-[3px] border-ink bg-paper">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-b-2 border-ink/10 last:border-0">
                <th className="px-4 py-3 text-left font-display font-normal tracking-wide text-ink/60">
                  {k}
                </th>
                <td className="px-4 py-3 text-right">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="rounded-[18px] border-[3px] border-ink bg-paper p-5">
        <h2 className="font-display text-2xl">Addresses</h2>
        <ul className="mt-3 space-y-2 font-mono text-sm">
          <li>Token {CONTRACTS.token ? shortCa(CONTRACTS.token) : "— pending"}</li>
          <li>
            Hold {CONTRACTS.hold ? shortCa(CONTRACTS.hold) : "— pending"}
            {CONTRACTS.hold ? (
              <>
                {" "}
                <a className="underline" href={explorerAddress(CONTRACTS.hold)}>
                  explorer
                </a>
              </>
            ) : null}
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <a className="underline" href={LETSCASH_PAD} target="_blank" rel="noreferrer">
            LetsCash
          </a>
          <a className="underline" href={X_URL} target="_blank" rel="noreferrer">
            X
          </a>
          <a className="underline" href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="underline" href={SITE}>
            Site
          </a>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CaStrip } from "@/components/ahoo/ca-strip";
import { Sea } from "@/components/ahoo/sea";
import { Ship } from "@/components/ahoo/ship";
import { Socials } from "@/components/ahoo/socials";
import { TitleMark } from "@/components/ahoo/title-mark";
import { CHAIN, CHEST_NAME, FEE, LETSCASH_PAD, TICKER } from "@/lib/game";

const TOKEN_CARGO = [
  { id: "tok-1", pips: 6, plated: false },
  { id: "tok-2", pips: 4, plated: false },
  { id: "tok-3", pips: 4, plated: true },
];

export const Route = createFileRoute("/token")({ component: TokenPage });

function TokenPage() {
  const rows = [
    ["Name", "Coup Ahoo"],
    ["Ticker", `$${TICKER}`],
    ["Chain", `${CHAIN.name} (${CHAIN.id})`],
    ["Supply", "1,000,000,000"],
    ["Trade tax", `${FEE.taxBps / 100}% of the ETH leg`],
    ["Platform", `${FEE.platformBps / 100}% LetsCash`],
    [CHEST_NAME, `${FEE.creatorBps / 100}% of every trade`],
    ["Quote", "ETH"],
    ["LP", "Locked at launch"],
  ];
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Sea compact>
        <div className="flex flex-col items-center gap-2 py-2">
          <TitleMark size="sm" />
          <Ship name={`$${TICKER}`} sail="orange" cargo={TOKEN_CARGO} compact captain posing />
        </div>
      </Sea>
      <header>
        <p className="font-display text-sm tracking-[0.2em] text-ink/50">${TICKER}</p>
        <h1 className="font-display text-5xl tracking-wide">The token is the wake.</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">
          Launch on LetsCash. {FEE.taxBps / 100}% tax. Platform {FEE.platformBps / 100}%. The rest
          goes to {CHEST_NAME} — prize, drip, cabin.
        </p>
      </header>
      <CaStrip />
      <section className="ahoo-card overflow-hidden">
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
      <section className="ahoo-card p-5">
        <h2 className="font-display text-2xl">Socials</h2>
        <div className="mt-3">
          <Socials />
        </div>
        <p className="mt-4 text-sm font-semibold">
          <a className="underline" href={LETSCASH_PAD} target="_blank" rel="noreferrer">
            LetsCash
          </a>
        </p>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CONTRACTS, EPOCH_SECONDS, FEE, explorerAddress, shortCa } from "@/lib/game";
import { Sea } from "@/components/ahoo/sea";
import { Ship } from "@/components/ahoo/ship";
import { TitleMark } from "@/components/ahoo/title-mark";

const HOLD_CARGO = [
  { id: "hold-1", pips: 6, plated: true },
  { id: "hold-2", pips: 5, plated: false },
  { id: "hold-3", pips: 3, plated: true },
];

export const Route = createFileRoute("/hold")({ component: HoldPage });

function HoldPage() {
  const hold = CONTRACTS.hold;
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Sea compact>
        <div className="flex flex-col items-center gap-2 py-2">
          <TitleMark size="sm" />
          <Ship name="The Hold" sail="magenta" cargo={HOLD_CARGO} compact captain />
          <p className="stroke-title font-display text-xl">Fees land here</p>
        </div>
      </Sea>
      <header>
        <p className="font-display text-sm tracking-[0.2em] text-ink/50">THE HOLD</p>
        <h1 className="font-display text-5xl tracking-wide">Fees land here. Prize leaves here.</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/80">
          Every trade pays 5%. The platform keeps 0.3%. The rest hits The Hold — a contract with no
          EOA in the LetsCash form. Epochs last {EPOCH_SECONDS / 60} minutes. Best run on the board
          can take the prize. Anyone may settle. No keeper.
        </p>
      </header>

      <section className="ahoo-card p-5">
        <h2 className="font-display text-2xl">Contract</h2>
        {hold ? (
          <p className="mt-2 font-mono text-sm">
            {shortCa(hold)}{" "}
            <a className="underline" href={explorerAddress(hold)} target="_blank" rel="noreferrer">
              Explorer
            </a>
          </p>
        ) : (
          <p className="mt-2 text-ink/70">Hold address posts after Remix deploy. Empty until then.</p>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "Prize", v: `${FEE.holdShare.prizeBps / 100}%`, d: "Best run of the epoch. 80% paid, rest rolls." },
          { k: "Drip", v: `${FEE.holdShare.dripBps / 100}%`, d: "Accrues in The Hold. Paid out after the token is live." },
          { k: "Cabin", v: `${FEE.holdShare.cabinBps / 100}%`, d: "Studio. Withdraw only from cabin." },
        ].map((x) => (
          <article key={x.k} className="ahoo-card p-4">
            <p className="font-display text-sm text-ink/50">{x.k}</p>
            <p className="font-display text-3xl">{x.v}</p>
            <p className="mt-1 text-sm text-ink/70">{x.d}</p>
          </article>
        ))}
      </section>

      <section className="ahoo-card p-5">
        <h2 className="font-display text-2xl">How a cycle closes</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          <li>Play. Your score stays on this device until you log it on-chain.</li>
          <li>When The Hold is live, log one run per epoch from the connected wallet.</li>
          <li>After the epoch ends, anyone calls settle. Winner is the best logged score.</li>
          <li>Closer takes 1% of the payout. Empty epochs roll the pot.</li>
        </ol>
      </section>
    </div>
  );
}

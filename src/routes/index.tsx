import { createFileRoute, Link } from "@tanstack/react-router";
import { CaStrip } from "@/components/ahoo/ca-strip";
import { Ship } from "@/components/ahoo/ship";
import { Sea } from "@/components/ahoo/sea";
import { LINE, NAME, SLOGAN, TICKER, CURSE } from "@/lib/game";

const DEMO = [
  { id: "demo-1", pips: 6, plated: false },
  { id: "demo-2", pips: 4, plated: true },
  { id: "demo-3", pips: 4, plated: false },
];

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const demo = DEMO;
  return (
    <div className="flex flex-col gap-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="font-display text-sm tracking-[0.2em] text-ink/60">ROBINHOOD CHAIN</p>
          <h1 className="font-display text-5xl leading-[0.95] tracking-wide sm:text-7xl">{NAME}</h1>
          <p className="font-display text-2xl text-ink/80">{SLOGAN}</p>
          <p className="max-w-xl text-lg leading-relaxed">{LINE}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/play" className="ahoo-btn bg-gold text-ink no-underline">
              Play
            </Link>
            <Link to="/token" className="ahoo-btn bg-paper text-ink no-underline">
              ${TICKER}
            </Link>
          </div>
        </div>
        <Sea compact>
          <div className="flex justify-center">
            <Ship name="Your sloop" sail="orange" cargo={demo} />
          </div>
        </Sea>
      </section>

      <CaStrip />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            n: "01",
            t: "Cargo is the hull",
            d: "Each die is hit points and a gun. More crates, more shots. Empty the deck and you sink.",
          },
          {
            n: "02",
            t: `Fear ${CURSE}`,
            d: "If the pips sum to thirteen you are cursed. The first ball of every volley goes overboard.",
          },
          {
            n: "03",
            t: "The Hold pays the wake",
            d: "Trades feed The Hold. Best run of each epoch can take the prize. Anyone may settle. No keeper.",
          },
        ].map((b) => (
          <article key={b.n} className="rounded-[18px] border-[3px] border-ink bg-paper p-5">
            <p className="font-display text-sm text-ink/50">{b.n}</p>
            <h2 className="mt-1 font-display text-2xl tracking-wide">{b.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{b.d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

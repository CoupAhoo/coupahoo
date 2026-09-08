import { createFileRoute, Link } from "@tanstack/react-router";
import { CaStrip } from "@/components/ahoo/ca-strip";
import { Ship } from "@/components/ahoo/ship";
import { Sea } from "@/components/ahoo/sea";
import { TitleMark } from "@/components/ahoo/title-mark";
import { LINE, TICKER, CURSE } from "@/lib/game";

const DEMO = [
  { id: "demo-1", pips: 6, plated: false },
  { id: "demo-2", pips: 4, plated: true },
  { id: "demo-3", pips: 4, plated: false },
];

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Sea>
        <div className="flex flex-1 flex-col items-center justify-between gap-4 py-2">
          <p className="stroke-title wobble text-center font-display text-xl sm:text-3xl">
            Lets start by rolling for your cargo!
          </p>
          <TitleMark size="lg" className="text-center" />
          <Ship name="Your sloop" sail="orange" cargo={DEMO} compact captain />
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/play" className="ahoo-btn ahoo-btn-roll no-underline">
              PLAY
            </Link>
            <Link to="/token" className="ahoo-btn ahoo-btn-keep no-underline">
              ${TICKER}
            </Link>
          </div>
        </div>
      </Sea>

      <p className="mx-auto max-w-2xl text-center text-lg font-extrabold leading-relaxed">{LINE}</p>

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
          <article key={b.n} className="ahoo-card p-5">
            <p className="font-display text-sm text-ink/50">{b.n}</p>
            <h2 className="mt-1 font-display text-2xl tracking-wide">{b.t}</h2>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-ink/80">{b.d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

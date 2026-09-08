import { createFileRoute, Link } from "@tanstack/react-router";
import { CaStrip } from "@/components/ahoo/ca-strip";
import { Sea } from "@/components/ahoo/sea";
import { Ship } from "@/components/ahoo/ship";
import { TitleMark } from "@/components/ahoo/title-mark";
import {
  ATTRIBUTION,
  CABIN,
  CHEST_CA,
  CHEST_NAME,
  CURSE,
  EPOCH_SECONDS,
  FEE,
  SITE,
  TOKEN_CA,
  TICKER,
} from "@/lib/game";

export const Route = createFileRoute("/article")({ component: Article });

function Article() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Sea compact>
        <div className="flex flex-col items-center gap-2 py-2">
          <TitleMark size="sm" />
          <Ship
            name="The wake"
            sail="orange"
            cargo={[
              { id: "a1", pips: 5, plated: false },
              { id: "a2", pips: 6, plated: false },
              { id: "a3", pips: 4, plated: true },
            ]}
            compact
            captain
          />
        </div>
      </Sea>

      <header>
        <p className="font-display text-sm tracking-[0.2em] text-ink/50">ARTICLE</p>
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
          Dice, fees, and The Chest
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">
          Coup Ahoo is a dice-pirate game with a token on LetsCash. The loop is local. The prize
          is on-chain. This is how the hull, the tax, and {CHEST_NAME} fit.
        </p>
      </header>

      <CaStrip />

      <section className="space-y-3">
        <h2 className="font-display text-3xl tracking-wide">The story</h2>
        <p className="text-lg font-semibold leading-relaxed">
          You are done with the fleet. One sloop at a time, you take the channel. Cargo is stacked
          on the deck — dice. Their pips are hit points. Their count is how many balls you throw.
          Empty decks sink. Thirteen is not a score. It is a hole.
        </p>
        <p className="text-lg font-semibold leading-relaxed">
          The ship-and-dice loop is inspired by Antti Haavikko's js13k Coup Ahoo. {CHEST_NAME},
          ${TICKER}, and the chain side are original. Sprites and the original song were not
          ported.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl tracking-wide">How you play</h2>
        <ol className="list-decimal space-y-3 pl-5 text-lg font-semibold leading-relaxed">
          <li>
            Roll 3d6. That is your ship. You may reroll. KEEP locks the hull. Pips = HP. Dice count
            = guns.
          </li>
          <li>
            Hull {CURSE} is cursed. The first ball of every volley goes overboard.
          </li>
          <li>
            Nine watches. Odd numbers are fights. Even numbers are events. The last is the
            flagship.
          </li>
          <li>
            Combat dice are 0 / 0 / 1 / 1 / 2 / 2. Keep the hits. Reroll the blanks once. Then
            click their cargo.
          </li>
          <li>
            A plated crate shrugs 1 damage. Killing a die kills a gun — their next volley is
            smaller.
          </li>
          <li>
            Events: merchants, shipwrights, storms, sailors in dinghies. Plate a crate. Hire a
            gunner, lookout, carpenter, or cook. Dump cargo if the sea stands up.
          </li>
          <li>Empty deck sinks. Take the fleet, or the sea takes you.</li>
        </ol>
      </section>

      <section className="ahoo-card p-5 space-y-2">
        <h2 className="font-display text-2xl">Crew</h2>
        <ul className="space-y-1 text-sm font-semibold leading-relaxed">
          <li>Gunner — first shot of each volley +1.</li>
          <li>Lookout — enemy wastes their first shot.</li>
          <li>Carpenter — after a win, patches the weakest crate +1.</li>
          <li>Cook — +3 gold every ship you sink.</li>
        </ul>
      </section>

      <section className="ahoo-card p-5 space-y-2">
        <h2 className="font-display text-2xl">Score</h2>
        <p className="text-sm font-semibold leading-relaxed">
          Ships sunk × 250, gold × 12, hull × 8. A clean hull (not {CURSE}) adds 130. Clearing the
          flagship adds 400. The number on GAME OVER is what you can log to {CHEST_NAME}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl tracking-wide">${TICKER}</h2>
        <p className="text-lg font-semibold leading-relaxed">
          One billion supply. Quote is ETH. Launch is LetsCash. LP locked at launch. Every trade
          pays {FEE.taxBps / 100}% of the ETH leg. LetsCash keeps {FEE.platformBps / 100}%. The
          remaining {FEE.creatorBps / 100}% is the creator fee — it does not go to a wallet. It
          hits {CHEST_NAME}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl tracking-wide">{CHEST_NAME}</h2>
        <p className="text-lg font-semibold leading-relaxed">
          A contract. Incoming ETH splits {FEE.chestShare.prizeBps / 100}% prize,{" "}
          {FEE.chestShare.dripBps / 100}% drip, {FEE.chestShare.cabinBps / 100}% cabin. Epochs last{" "}
          {EPOCH_SECONDS / 60} minutes. One log per wallet per epoch. Best score on the board can
          take the prize. Anyone may settle. No keeper.
        </p>
        <ul className="space-y-2 text-sm font-semibold leading-relaxed">
          <li>Settle pays 80% of the prize pot. 20% rolls to the next watch.</li>
          <li>The caller who settles takes 1% of that payout. The rest goes to the winner.</li>
          <li>Empty epochs emit and roll. Cabin withdraws only from the cabin address.</li>
          <li>Drip accrues. Cabin can forward it later. It is not a public claim yet.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl tracking-wide">Addresses</h2>
        <p className="break-all font-mono text-xs leading-relaxed">
          ${TICKER} {TOKEN_CA}
          <br />
          {CHEST_NAME} {CHEST_CA}
          <br />
          Cabin {CABIN}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl tracking-wide">What we are building</h2>
        <p className="text-lg font-semibold leading-relaxed">
          A crew that actually plays. The site, the loop, and {CHEST_NAME} are live. Next watch is
          a DexScreener paid listing — step by step, not a jump. Play it. If a detail is wrong,
          say so. That is how a deck is built.
        </p>
        <p className="text-lg font-semibold leading-relaxed">
          <Link to="/play" className="underline">
            Play
          </Link>
          {" · "}
          <a href={SITE} className="underline">
            {SITE.replace("https://", "")}
          </a>
        </p>
      </section>

      <p className="text-sm text-ink/60">{ATTRIBUTION}</p>
    </article>
  );
}

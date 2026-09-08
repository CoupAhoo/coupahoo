import { createFileRoute } from "@tanstack/react-router";
import { ATTRIBUTION, CURSE, NAME, SLOGAN } from "@/lib/game";

export const Route = createFileRoute("/lore")({ component: Lore });

function Lore() {
  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <p className="font-display text-sm tracking-[0.2em] text-ink/50">LOG</p>
      <h1 className="font-display text-5xl tracking-wide">{NAME}</h1>
      <p className="font-display text-2xl">{SLOGAN}</p>
      <p className="text-lg leading-relaxed">
        You are done with the fleet. One sloop at a time, you take the channel. The only thing
        between you and the water is cargo — dice stacked on the deck. Their pips are hit points.
        Their count is how many balls you throw.
      </p>
      <p className="text-lg leading-relaxed">
        Do not let the hull read {CURSE}. Thirteen is not a score. It is a hole. A cursed ship
        wastes the first shot of every volley, and the sea keeps the pip.
      </p>
      <p className="text-lg leading-relaxed">
        Between fights: merchants, shipwrights, sailors in dinghies. Plate a crate and it shrugs
        damage. Hire a gunner and the first ball bites. Dump cargo in a storm if you have to. Empty
        decks sink.
      </p>
      <p className="text-lg leading-relaxed">
        The Hold is the lockbox under the floorboards. Trades on the token feed it. The best logged
        run of each watch can pull the prize. No keeper. Anyone may settle.
      </p>
      <p className="text-sm text-ink/60">{ATTRIBUTION}</p>
    </article>
  );
}

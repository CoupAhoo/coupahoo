import { createFileRoute } from "@tanstack/react-router";
import { ATTRIBUTION, CURSE, SLOGAN } from "@/lib/game";
import { Dude } from "@/components/ahoo/dude";
import { Sea } from "@/components/ahoo/sea";
import { Ship } from "@/components/ahoo/ship";
import { TitleMark } from "@/components/ahoo/title-mark";

const DEMO = [
  { id: "lore-1", pips: 6, plated: false },
  { id: "lore-2", pips: 5, plated: false },
  { id: "lore-3", pips: 2, plated: true },
];

export const Route = createFileRoute("/lore")({ component: Lore });

function Lore() {
  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <Sea compact>
        <div className="flex flex-col items-center gap-2">
          <TitleMark size="sm" />
          <Ship name="14" sail="cream" cargo={DEMO} compact captain />
        </div>
      </Sea>
      <p className="font-display text-2xl">{SLOGAN}</p>
      <p className="text-lg font-semibold leading-relaxed">
        You are done with the fleet. One sloop at a time, you take the channel. The only thing
        between you and the water is cargo — dice stacked on the deck. Their pips are hit points.
        Their count is how many balls you throw.
      </p>
      <p className="text-lg font-semibold leading-relaxed">
        Do not let the hull read {CURSE}. Thirteen is not a score. It is a hole. A cursed ship
        wastes the first shot of every volley, and the sea keeps the pip.
      </p>
      <p className="text-lg font-semibold leading-relaxed">
        Between fights: merchants, shipwrights, sailors in dinghies. Plate a crate and it shrugs
        damage. Hire a gunner and the first ball bites. Dump cargo in a storm if you have to. Empty
        decks sink.
      </p>
      <section className="ahoo-card grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
        {(
          [
            ["captain", "Captain"],
            ["gunner", "Gunner"],
            ["carpenter", "Shipwright"],
            ["lookout", "Lookout"],
          ] as const
        ).map(([role, label]) => (
          <div key={role} className="flex flex-col items-center text-center">
            <Dude role={role} size={64} />
            <p className="mt-1 font-display text-sm tracking-wide">{label}</p>
          </div>
        ))}
      </section>
      <p className="text-lg font-semibold leading-relaxed">
        The Hold is the lockbox under the floorboards. Trades on the token feed it. The best logged
        run of each watch can pull the prize. No keeper. Anyone may settle.
      </p>
      <p className="text-sm text-ink/60">{ATTRIBUTION}</p>
    </article>
  );
}

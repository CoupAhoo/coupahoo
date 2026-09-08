import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DieFace } from "@/components/ahoo/die-face";
import { Sea } from "@/components/ahoo/sea";
import { Ship } from "@/components/ahoo/ship";
import {
  CREW_BLURB,
  eventCopy,
  hp,
  isCursed,
  nextShot,
  scoreOf,
} from "@/lib/ahoo/engine";
import { CURSE } from "@/lib/game";
import { toggleMute, unlockSfx } from "@/lib/ahoo/sfx";
import { useRun } from "@/store/run";

export const Route = createFileRoute("/play")({ component: Play });

function Play() {
  const run = useRun((s) => s.run);
  const best = useRun((s) => s.best);
  const start = useRun((s) => s.start);
  const rerollCargo = useRun((s) => s.rerollCargo);
  const accept = useRun((s) => s.accept);
  const volley = useRun((s) => s.volley);
  const keep = useRun((s) => s.keep);
  const rerollShots = useRun((s) => s.rerollShots);
  const lock = useRun((s) => s.lock);
  const shoot = useRun((s) => s.shoot);
  const afterWin = useRun((s) => s.afterWin);
  const event = useRun((s) => s.event);
  const giveUp = useRun((s) => s.giveUp);
  const reset = useRun((s) => s.reset);

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "m" || e.key === "M") setMuted(toggleMute());
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cursed = isCursed(run.cargo);
  const shot = nextShot(run);
  const copy = run.event ? eventCopy(run.event) : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border-[3px] border-ink bg-paper px-4 py-3">
        <div className="flex flex-wrap gap-4 font-display text-lg tracking-wide">
          <span>
            Hull <b className={cursed ? "curse-glow" : ""}>{run.cargo.length ? hp(run.cargo) : "—"}</b>
          </span>
          <span>
            Sunk <b>{run.sunk}</b>
          </span>
          <span>
            Gold <b>{run.gold}</b>
          </span>
          <span>
            {run.encounter}/{run.totalEncounters}
          </span>
          <span className="text-ink/50">
            Best <b>{best}</b>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="ahoo-btn bg-paper text-ink !px-3 !py-1 !text-sm"
            onClick={() => {
              unlockSfx();
              setMuted(toggleMute());
            }}
          >
            {muted ? "Sound off" : "Mute (M)"}
          </button>
          {run.phase !== "title" ? (
            <button type="button" className="ahoo-btn bg-paper text-ink !px-3 !py-1 !text-sm" onClick={reset}>
              New run
            </button>
          ) : null}
        </div>
      </div>

      <Sea>
        {run.phase === "title" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 py-10 text-center">
            <p className="stroke-title font-display text-3xl sm:text-5xl">Roll for your cargo</p>
            <p className="max-w-md text-paper [text-shadow:0_1px_0_var(--color-ink)]">
              Dice are the hull. {CURSE} is the hole. Take the fleet one sloop at a time.
            </p>
            <button type="button" className="ahoo-btn bg-gold text-ink" onClick={start}>
              ROLL
            </button>
          </div>
        ) : null}

        {run.phase === "cargo" ? (
          <div className="flex flex-col items-center gap-5 py-6">
            <p className="stroke-title text-center font-display text-3xl sm:text-4xl">Your cargo</p>
            <div className="flex flex-wrap justify-center gap-3">
              {run.cargo.map((d) => (
                <DieFace key={d.id} pips={d.pips} size={64} plated={d.plated} />
              ))}
            </div>
            <p className="font-display text-xl">
              Hull {hp(run.cargo)}
              {cursed ? " — cursed" : ""}
            </p>
            <div className="flex gap-3">
              <button type="button" className="ahoo-btn bg-paper text-ink" onClick={rerollCargo}>
                ROLL
              </button>
              <button type="button" className="ahoo-btn bg-gold text-ink" onClick={accept}>
                KEEP
              </button>
            </div>
          </div>
        ) : null}

        {run.enemy && (run.phase.startsWith("combat") || run.phase === "victory") ? (
          <div className="grid items-end gap-4 lg:grid-cols-2">
            <Ship name="You" sail="orange" cargo={run.cargo} crew={run.crew} facing="right" />
            <Ship
              name={run.enemy.name}
              sail={run.enemy.sail}
              cargo={run.enemy.cargo}
              facing="left"
              aim={run.phase === "combat-aim"}
              onDieClick={run.phase === "combat-aim" ? shoot : undefined}
            />
          </div>
        ) : null}

        {run.phase === "event" && copy ? (
          <div className="mx-auto max-w-lg rounded-[18px] border-[3px] border-ink bg-paper p-5 text-center">
            <p className="font-display text-2xl tracking-wide">{copy.title}</p>
            <p className="mt-2 leading-relaxed">{copy.body}</p>
            <div className="mt-4 flex justify-center gap-3">
              <button type="button" className="ahoo-btn bg-paper text-ink" onClick={() => event(false)}>
                {copy.no}
              </button>
              <button type="button" className="ahoo-btn bg-gold text-ink" onClick={() => event(true)}>
                {copy.yes}
              </button>
            </div>
          </div>
        ) : null}

        {run.phase === "defeat" || run.phase === "over" ? (
          <div className="mx-auto max-w-lg rounded-[18px] border-[3px] border-ink bg-paper p-6 text-center">
            <p className="font-display text-3xl tracking-wide">
              {run.phase === "over" ? "The fleet is yours" : "Sunk"}
            </p>
            <p className="mt-2 font-display text-4xl tabular-nums">{scoreOf(run)}</p>
            <p className="mt-1 text-sm text-ink/70">{run.log}</p>
            <button type="button" className="ahoo-btn mt-4 bg-gold text-ink" onClick={start}>
              Sail again
            </button>
          </div>
        ) : null}
      </Sea>

      <div className="rounded-[14px] border-[3px] border-ink bg-paper px-4 py-4">
        <p className="font-display text-lg tracking-wide">{run.log}</p>
        {run.crew.length ? (
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {run.crew.map((c) => (
              <li key={c.id} className="rounded-md border-2 border-ink px-2 py-1">
                {c.name} · {CREW_BLURB[c.kind]}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {run.phase === "combat-roll" ? (
            <button type="button" className="ahoo-btn bg-gold text-ink" onClick={volley}>
              ROLL
            </button>
          ) : null}

          {run.phase === "combat-keep" ? (
            <>
              <div className="flex flex-wrap gap-2">
                {run.shots.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => keep(s.id)}
                    disabled={s.spent}
                    className="flex flex-col items-center gap-1"
                  >
                    <DieFace pips={s.dmg} size={48} dim={s.spent} selected={s.kept} />
                    <span className="text-[11px] font-semibold">
                      {s.spent ? "curse" : s.kept ? "kept" : `${s.dmg}`}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="ahoo-btn bg-paper text-ink"
                onClick={rerollShots}
                disabled={run.rerollsLeft <= 0}
              >
                ROLL
              </button>
              <button type="button" className="ahoo-btn bg-gold text-ink" onClick={lock}>
                KEEP
              </button>
            </>
          ) : null}

          {run.phase === "combat-aim" ? (
            <p className="text-sm">
              {shot ? `Assign ${shot.dmg} damage — click their cargo.` : "Volley spent."}
            </p>
          ) : null}

          {run.phase === "victory" ? (
            <button type="button" className="ahoo-btn bg-gold text-ink" onClick={afterWin}>
              Sail on
            </button>
          ) : null}

          {run.phase.startsWith("combat") ? (
            <button type="button" className="ahoo-btn bg-paper text-ink !text-sm" onClick={giveUp}>
              Strike colours
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

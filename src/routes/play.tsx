import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DieFace } from "@/components/ahoo/die-face";
import { Sea } from "@/components/ahoo/sea";
import { Ship } from "@/components/ahoo/ship";
import { TitleMark } from "@/components/ahoo/title-mark";
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
  const inCombat = Boolean(run.enemy && (run.phase.startsWith("combat") || run.phase === "victory"));
  const showActions =
    run.phase === "title" ||
    run.phase === "cargo" ||
    run.phase === "combat-roll" ||
    run.phase === "combat-keep" ||
    run.phase === "combat-aim" ||
    run.phase === "victory" ||
    run.phase === "event" ||
    run.phase === "defeat" ||
    run.phase === "over";

  return (
    <div className="flex flex-col gap-3">
      <Sea framed={false} className="min-h-[70dvh] sm:rounded-[22px] sm:border-[3px] sm:border-ink">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-display text-lg tracking-wide text-paper [text-shadow:0_2px_0_var(--color-ink)]">
            <span>
              Hull{" "}
              <b className={`tabular-nums ${cursed ? "curse-glow" : ""}`}>
                {run.cargo.length ? hp(run.cargo) : "—"}
              </b>
            </span>
            <span>
              Sunk <b className="tabular-nums">{run.sunk}</b>
            </span>
            <span>
              Gold <b className="tabular-nums">{run.gold}</b>
            </span>
            <span className="tabular-nums">
              {run.encounter}/{run.totalEncounters}
            </span>
            <span className="opacity-80">
              Best <b className="tabular-nums">{best}</b>
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="ahoo-btn ahoo-btn-keep !px-3 !py-1 !text-sm"
              onClick={() => {
                unlockSfx();
                setMuted(toggleMute());
              }}
            >
              {muted ? "Sound off" : "Mute"}
            </button>
            {run.phase !== "title" ? (
              <button type="button" className="ahoo-btn ahoo-btn-keep !px-3 !py-1 !text-sm" onClick={reset}>
                New run
              </button>
            ) : null}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col">
          {run.phase === "title" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4 text-center">
              <p className="stroke-title wobble font-display text-2xl sm:text-4xl">
                Lets start by rolling for your cargo!
              </p>
              <TitleMark size="md" />
              <Ship name="Your sloop" sail="orange" cargo={[]} compact captain />
            </div>
          ) : null}

          {run.phase === "cargo" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
              <p className="stroke-title wobble text-center font-display text-2xl sm:text-4xl">
                Cast the dice once more?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {run.cargo.map((d) => (
                  <DieFace key={d.id} pips={d.pips} size={64} plated={d.plated} />
                ))}
              </div>
              <p className="font-display text-2xl text-paper [text-shadow:0_2px_0_var(--color-ink)]">
                Hull {hp(run.cargo)}
                {cursed ? " — THIRTEEN" : ""}
              </p>
            </div>
          ) : null}

          {inCombat ? (
            <div className="grid flex-1 items-end gap-2 py-2 lg:grid-cols-2">
              <Ship
                name="You"
                sail="orange"
                cargo={run.cargo}
                crew={run.crew}
                facing="right"
                captain
                sunk={run.phase === "defeat"}
              />
              <Ship
                name={run.enemy!.name}
                sail={run.enemy!.sail}
                cargo={run.enemy!.cargo}
                facing="left"
                angry
                crown={run.encounter === run.totalEncounters}
                aim={run.phase === "combat-aim"}
                onDieClick={run.phase === "combat-aim" ? shoot : undefined}
                sunk={run.phase === "victory"}
              />
            </div>
          ) : null}

          {run.phase === "event" && copy ? (
            <div className="mx-auto my-auto w-full max-w-lg ahoo-card p-5 text-center">
              <p className="font-display text-2xl tracking-wide">{copy.title}</p>
              <p className="mt-2 font-semibold leading-relaxed">{copy.body}</p>
            </div>
          ) : null}

          {run.phase === "defeat" || run.phase === "over" ? (
            <div className="mx-auto my-auto w-full max-w-lg ahoo-card p-6 text-center">
              <p className="font-display text-3xl tracking-wide">
                {run.phase === "over" ? "THE END?" : "GAME OVER"}
              </p>
              <p className="mt-2 font-display text-5xl tabular-nums">{scoreOf(run)}</p>
              <p className="mt-1 text-sm font-semibold text-ink/70">{run.log}</p>
            </div>
          ) : null}

          {run.phase === "combat-keep" ? (
            <div className="flex flex-wrap justify-center gap-2 py-2">
              {run.shots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => keep(s.id)}
                  disabled={s.spent}
                  className="flex flex-col items-center gap-1"
                >
                  <DieFace pips={s.dmg} size={48} dim={s.spent} selected={s.kept} damage />
                  <span className="text-[11px] font-extrabold text-paper [text-shadow:0_1px_0_var(--color-ink)]">
                    {s.spent ? "curse" : s.kept ? "kept" : `${s.dmg}`}
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {run.phase === "combat-aim" ? (
            <p className="stroke-title text-center font-display text-xl sm:text-2xl">
              {shot ? `Incoming ${shot.dmg} damage! Select cargo taking the hit...` : "Volley spent."}
            </p>
          ) : null}

          {run.phase === "victory" ? (
            <p className="stroke-title text-center font-display text-2xl sm:text-3xl">Victory! Nicely done!</p>
          ) : null}

          {run.crew.length > 0 && !inCombat && run.phase !== "title" ? (
            <ul className="mt-auto flex flex-wrap justify-center gap-2 text-xs font-extrabold text-paper [text-shadow:0_1px_0_var(--color-ink)]">
              {run.crew.map((c) => (
                <li key={c.id} className="rounded-md border-2 border-ink bg-paper px-2 py-1 text-ink">
                  {c.name} · {CREW_BLURB[c.kind]}
                </li>
              ))}
            </ul>
          ) : null}

          {showActions ? (
            <div className="mt-3 flex flex-wrap items-center justify-end gap-3">
              {run.phase === "title" ? (
                <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={start}>
                  ROLL
                </button>
              ) : null}

              {run.phase === "cargo" ? (
                <>
                  <button type="button" className="ahoo-btn ahoo-btn-keep" onClick={rerollCargo}>
                    ROLL
                  </button>
                  <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={accept}>
                    KEEP
                  </button>
                </>
              ) : null}

              {run.phase === "combat-roll" ? (
                <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={volley}>
                  SHOOT
                </button>
              ) : null}

              {run.phase === "combat-keep" ? (
                <>
                  <button
                    type="button"
                    className="ahoo-btn ahoo-btn-keep"
                    onClick={rerollShots}
                    disabled={run.rerollsLeft <= 0}
                  >
                    ROLL
                  </button>
                  <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={lock}>
                    KEEP
                  </button>
                </>
              ) : null}

              {run.phase === "event" && copy ? (
                <>
                  <button type="button" className="ahoo-btn ahoo-btn-keep" onClick={() => event(false)}>
                    {copy.no}
                  </button>
                  <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={() => event(true)}>
                    {copy.yes}
                  </button>
                </>
              ) : null}

              {run.phase === "victory" ? (
                <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={afterWin}>
                  SET SAIL
                </button>
              ) : null}

              {run.phase === "defeat" || run.phase === "over" ? (
                <button type="button" className="ahoo-btn ahoo-btn-roll" onClick={start}>
                  TRY AGAIN?
                </button>
              ) : null}

              {run.phase.startsWith("combat") ? (
                <button type="button" className="ahoo-btn ahoo-btn-keep !text-sm" onClick={giveUp}>
                  Strike colours
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Sea>

      <p className="px-4 font-display text-lg tracking-wide sm:px-0">{run.log}</p>
      {cursed && run.phase !== "title" ? (
        <p className="px-4 text-sm font-extrabold text-curse sm:px-0">
          Hull reads {CURSE}. The first ball of every volley goes overboard.
        </p>
      ) : null}
    </div>
  );
}

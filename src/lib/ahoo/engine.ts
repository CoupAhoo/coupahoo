import { CURSE } from "@/lib/game";

export type Die = {
  id: string;
  pips: number;
  plated: boolean;
};

export type CrewKind = "gunner" | "carpenter" | "lookout" | "cook";

export type Crew = {
  id: string;
  kind: CrewKind;
  name: string;
};

export type Shot = {
  id: string;
  dmg: 0 | 1 | 2;
  kept: boolean;
  spent: boolean;
};

export type EventKind =
  | "castaway"
  | "shipwright"
  | "merchant"
  | "storm"
  | "cache"
  | "recruiter";

export type Phase =
  | "title"
  | "cargo"
  | "sailing"
  | "event"
  | "combat-roll"
  | "combat-keep"
  | "combat-aim"
  | "combat-enemy"
  | "victory"
  | "defeat"
  | "over";

export type Sail = "orange" | "magenta" | "cream";

export type EnemyShip = {
  name: string;
  sail: Sail;
  cargo: Die[];
  flavor: string;
};

export type Run = {
  phase: Phase;
  cargo: Die[];
  crew: Crew[];
  gold: number;
  sunk: number;
  encounter: number;
  totalEncounters: number;
  shots: Shot[];
  rerollsLeft: number;
  enemy: EnemyShip | null;
  event: EventKind | null;
  log: string;
  seed: number;
  rng: number;
  turn: number;
};

let _seq = 1;
function uid(prefix: string) {
  _seq += 1;
  return `${prefix}-${_seq.toString(36)}`;
}

export function hp(dice: Die[]) {
  return dice.reduce((s, d) => s + d.pips, 0);
}

export function isCursed(dice: Die[]) {
  return hp(dice) === CURSE;
}

export function rollD6(run: Run) {
  run.rng = (run.rng * 1664525 + 1013904223) >>> 0;
  return 1 + (run.rng % 6);
}

/** Haavikko combat die: 0, 0, 1, 1, 2, 2 */
export function rollDamage(run: Run): 0 | 1 | 2 {
  const r = rollD6(run);
  return Math.floor((r - 1) / 2) as 0 | 1 | 2;
}

export function makeDie(pips: number, plated = false): Die {
  return { id: uid("d"), pips: Math.max(1, Math.min(9, pips)), plated };
}

const CREW_POOL: { kind: CrewKind; name: string }[] = [
  { kind: "gunner", name: "Pip" },
  { kind: "carpenter", name: "Oak" },
  { kind: "lookout", name: "Wren" },
  { kind: "cook", name: "Stew" },
];

export const CREW_BLURB: Record<CrewKind, string> = {
  gunner: "First shot each volley +1.",
  carpenter: "After a win, patches the weakest cargo +1.",
  lookout: "Enemy wastes their first shot.",
  cook: "+3 gold every ship you sink.",
};

const ENEMIES: { name: string; sail: Sail; flavor: string }[] = [
  { name: "Pink Wake", sail: "magenta", flavor: "A loud sloop with worse manners than aim." },
  { name: "Sloop of Sorrow", sail: "cream", flavor: "They keep a thirteen carved in the mast." },
  { name: "Dice Barracuda", sail: "orange", flavor: "Cargo stacked like teeth." },
  { name: "The Unlucky", sail: "magenta", flavor: "Every pip on this hull wants to be thirteen." },
  { name: "Snake-Eyes", sail: "orange", flavor: "Two ones. That's the joke. That's the gun." },
  { name: "Admiral Boxcars", sail: "cream", flavor: "Flagship. Does not reroll. Does not blink." },
];

const EVENT_COPY: Record<EventKind, { title: string; body: string; yes: string; no: string }> = {
  castaway: {
    title: "A stranger on the rocks",
    body: "No particular skill. Father is wealthy, they say, and will surely reward you.",
    yes: "YEAH",
    no: "NOPE",
  },
  shipwright: {
    title: "Want to hire this shipwright?",
    body: "He will plate one cargo die. Plated dice shrug off 1 damage.",
    yes: "YEAH",
    no: "NOPE",
  },
  merchant: {
    title: "A merchant flags you down",
    body: "Trade your lowest cargo for a fresh 5-pip crate. Gold changes hands.",
    yes: "YEAH",
    no: "NOPE",
  },
  storm: {
    title: "The sea stands up",
    body: "Unplated cargo takes a pip. Ride it or dump a crate overboard.",
    yes: "RIDE",
    no: "DUMP",
  },
  cache: {
    title: "A crate in the weed",
    body: "Somebody lost a die. Take it, or leave the curse untempted.",
    yes: "TAKE",
    no: "LEAVE",
  },
  recruiter: {
    title: "A sailor waves from a dinghy",
    body: "They want aboard. Crew is how you stop rolling like a fool.",
    yes: "HIRE",
    no: "PASS",
  },
};

export function eventCopy(kind: EventKind) {
  return EVENT_COPY[kind];
}

export function newRun(seed = Date.now() >>> 0): Run {
  return {
    phase: "title",
    cargo: [],
    crew: [],
    gold: 0,
    sunk: 0,
    encounter: 0,
    totalEncounters: 9,
    shots: [],
    rerollsLeft: 1,
    enemy: null,
    event: null,
    log: "Roll the cargo. That's your hull.",
    seed,
    rng: seed || 1,
    turn: 0,
  };
}

export function beginCargo(run: Run): Run {
  const next = { ...run, phase: "cargo" as const, log: "Roll for your cargo." };
  return rollStartingCargo(next);
}

export function rollStartingCargo(run: Run): Run {
  const r = { ...run, rng: run.rng };
  const cargo = [makeDie(rollD6(r)), makeDie(rollD6(r)), makeDie(rollD6(r))];
  r.cargo = cargo;
  r.log = isCursed(cargo)
    ? "Thirteen already. The sea noticed."
    : `Hull ${hp(cargo)}. Don't let it land on ${CURSE}.`;
  return r;
}

export function acceptCargo(run: Run): Run {
  return sailToNext({ ...run, encounter: 0 });
}

function pickEvent(run: Run): EventKind {
  const kinds: EventKind[] = ["castaway", "shipwright", "merchant", "storm", "cache", "recruiter"];
  run.rng = (run.rng * 1664525 + 1013904223) >>> 0;
  return kinds[run.rng % kinds.length]!;
}

function makeEnemy(run: Run, boss: boolean): EnemyShip {
  const idx = boss ? ENEMIES.length - 1 : run.encounter % (ENEMIES.length - 1);
  const spec = ENEMIES[idx]!;
  const extra = boss ? 3 : Math.min(2, Math.floor(run.encounter / 3));
  const n = 3 + extra;
  const cargo: Die[] = [];
  for (let i = 0; i < n; i++) cargo.push(makeDie(2 + (rollD6(run) % 5)));
  if (boss) cargo[0] = makeDie(8, true);
  return { name: spec.name, sail: spec.sail, cargo, flavor: spec.flavor };
}

export function sailToNext(run: Run): Run {
  const encounter = run.encounter + 1;
  if (encounter > run.totalEncounters) {
    return finishRun({ ...run, encounter, phase: "over", log: "The fleet is yours. Or what's left of you is." });
  }
  const boss = encounter === run.totalEncounters;
  const combat = boss || encounter % 2 === 1;
  if (combat) {
    const enemy = makeEnemy({ ...run, encounter }, boss);
    return {
      ...run,
      encounter,
      enemy,
      event: null,
      phase: "combat-roll",
      shots: [],
      rerollsLeft: 1,
      turn: 0,
      log: boss ? `${enemy.name} bars the channel.` : `${enemy.name} closes. ${enemy.flavor}`,
    };
  }
  const event = pickEvent({ ...run, encounter });
  return {
    ...run,
    encounter,
    event,
    enemy: null,
    phase: "event",
    log: EVENT_COPY[event].body,
  };
}

function hasCrew(run: Run, kind: CrewKind) {
  return run.crew.some((c) => c.kind === kind);
}

export function rollVolley(run: Run): Run {
  if (!run.enemy) return run;
  const r = { ...run, rng: run.rng };
  const n = Math.max(1, r.cargo.length);
  const shots: Shot[] = [];
  for (let i = 0; i < n; i++) {
    let dmg = rollDamage(r);
    if (i === 0 && hasCrew(r, "gunner") && dmg < 2) dmg = (dmg + 1) as 0 | 1 | 2;
    shots.push({ id: uid("s"), dmg, kept: false, spent: false });
  }
  r.shots = shots;
  r.rerollsLeft = 1;
  r.phase = "combat-keep";
  r.log = isCursed(r.cargo)
    ? "Cursed volley. Thirteen takes the first pip."
    : "Keep or roll. Then pick their cargo.";
  if (isCursed(r.cargo) && r.shots[0]) {
    r.shots[0] = { ...r.shots[0], spent: true, dmg: 0 };
  }
  return r;
}

export function toggleKeep(run: Run, shotId: string): Run {
  if (run.phase !== "combat-keep") return run;
  return {
    ...run,
    shots: run.shots.map((s) => (s.id === shotId && !s.spent ? { ...s, kept: !s.kept } : s)),
  };
}

export function rerollUnkept(run: Run): Run {
  if (run.phase !== "combat-keep" || run.rerollsLeft <= 0) return run;
  const r = { ...run, rng: run.rng, rerollsLeft: 0 };
  r.shots = r.shots.map((s) => {
    if (s.kept || s.spent) return s;
    return { ...s, dmg: rollDamage(r) };
  });
  r.log = "Second toss is in. Aim.";
  return r;
}

export function lockVolley(run: Run): Run {
  if (run.phase !== "combat-keep") return run;
  const live = run.shots.filter((s) => !s.spent && s.dmg > 0);
  if (live.length === 0) {
    return enemyVolley({ ...run, phase: "combat-aim", log: "The volley is all blanks. They fire." });
  }
  return { ...run, phase: "combat-aim", log: "Click their cargo." };
}

function applyHit(dice: Die[], index: number, dmg: number): Die[] {
  const target = dice[index];
  if (!target) return dice;
  let d = dmg;
  if (target.plated) d = Math.max(0, d - 1);
  const pips = target.pips - d;
  if (pips <= 0) return dice.filter((_, i) => i !== index);
  return dice.map((die, i) => (i === index ? { ...die, pips } : die));
}

export function aimAt(run: Run, enemyDieId: string): Run {
  if (run.phase !== "combat-aim" || !run.enemy) return run;
  const shot = run.shots.find((s) => !s.spent && s.dmg > 0);
  if (!shot) return enemyVolley(run);
  const idx = run.enemy.cargo.findIndex((d) => d.id === enemyDieId);
  if (idx < 0) return run;
  const cargo = applyHit(run.enemy.cargo, idx, shot.dmg);
  const shots = run.shots.map((s) => (s.id === shot.id ? { ...s, spent: true } : s));
  const enemy = { ...run.enemy, cargo };
  let next: Run = {
    ...run,
    shots,
    enemy,
    log: shot.dmg === 0 ? "A miss on the water." : `Hit ${shot.dmg}.`,
  };
  if (cargo.length === 0) return winCombat(next);
  const remaining = shots.some((s) => !s.spent && s.dmg > 0);
  if (!remaining) return enemyVolley(next);
  return next;
}

function weakestIndex(dice: Die[]) {
  let best = 0;
  for (let i = 1; i < dice.length; i++) {
    const a = dice[i]!;
    const b = dice[best]!;
    if (a.pips < b.pips || (a.pips === b.pips && !a.plated && b.plated)) best = i;
  }
  return best;
}

function strongestIndex(dice: Die[]) {
  let best = 0;
  for (let i = 1; i < dice.length; i++) {
    const a = dice[i]!;
    const b = dice[best]!;
    if (a.pips > b.pips || (a.pips === b.pips && !a.plated && b.plated)) best = i;
  }
  return best;
}

export function enemyVolley(run: Run): Run {
  const enemy = run.enemy;
  if (!enemy || run.cargo.length === 0) return run;
  const r: Run = { ...run, rng: run.rng, phase: "combat-enemy" };
  const shots = Math.max(1, enemy.cargo.length);
  let cargo = [...r.cargo];
  let start = 0;
  if (hasCrew(r, "lookout") && r.turn === 0) {
    start = 1;
    r.log = "Wren calls the shot. Their first ball hits water.";
  }
  for (let i = start; i < shots; i++) {
    if (cargo.length === 0) break;
    const dmg = rollDamage(r);
    if (dmg <= 0) continue;
    cargo = applyHit(cargo, strongestIndex(cargo), dmg);
  }
  r.cargo = cargo;
  r.turn += 1;
  if (cargo.length === 0) {
    return { ...r, phase: "defeat", log: "The hull is empty. The sea takes the rest." };
  }
  r.phase = "combat-roll";
  r.shots = [];
  r.rerollsLeft = 1;
  r.log = isCursed(cargo)
    ? `Hull ${hp(cargo)} — THIRTEEN. They reload.`
    : `Hull ${hp(cargo)}. They reload.`;
  return r;
}

function winCombat(run: Run): Run {
  const r = { ...run, rng: run.rng, sunk: run.sunk + 1, enemy: run.enemy };
  let gold = r.gold + 5 + rollD6(r);
  if (hasCrew(r, "cook")) gold += 3;
  let cargo = [...r.cargo];
  if (cargo.length < 8) {
    cargo = [...cargo, makeDie(1 + (rollD6(r) % 4))];
  }
  if (hasCrew(r, "carpenter") && cargo.length) {
    const i = weakestIndex(cargo);
    cargo = cargo.map((c, idx) => (idx === i ? { ...c, pips: Math.min(9, c.pips + 1) } : c));
  }
  r.gold = gold;
  r.cargo = cargo;
  r.phase = "victory";
  r.log = `Victory. Loot in the hold. Hull ${hp(cargo)}.`;
  return r;
}

export function continueAfterVictory(run: Run): Run {
  return sailToNext({ ...run, enemy: null, shots: [], phase: "sailing" });
}

export function resolveEvent(run: Run, yes: boolean): Run {
  if (run.phase !== "event" || !run.event) return run;
  const r = { ...run, rng: run.rng };
  const kind = r.event;
  let cargo = [...r.cargo];
  let gold = r.gold;
  let crew = [...r.crew];
  let log = "The wake goes quiet.";

  if (kind === "castaway") {
    if (yes) {
      cargo = [...cargo, makeDie(3)];
      gold += 4;
      log = "They scramble aboard with a 3-pip crate. Father still hasn't paid.";
    } else log = "You leave them waving. The rocks keep their secrets.";
  } else if (kind === "shipwright") {
    if (yes && cargo.length) {
      const i = strongestIndex(cargo);
      cargo = cargo.map((d, idx) => (idx === i ? { ...d, plated: true } : d));
      log = "Plated. That crate shrugs off a pip.";
    } else log = "The shipwright rows on.";
  } else if (kind === "merchant") {
    if (yes && cargo.length) {
      const i = weakestIndex(cargo);
      cargo = cargo.map((d, idx) => (idx === i ? makeDie(5) : d));
      gold = Math.max(0, gold - 2);
      log = "Lowest crate for a five. Two gold lighter.";
    } else log = "No deal. The merchant shrugs into the fog.";
  } else if (kind === "storm") {
    if (yes) {
      cargo = cargo
        .map((d) => (d.plated ? d : { ...d, pips: d.pips - 1 }))
        .filter((d) => d.pips > 0);
      log = cargo.length ? "The squall takes a pip from the unplated." : "The squall takes everything.";
    } else if (cargo.length > 1) {
      const i = weakestIndex(cargo);
      cargo = cargo.filter((_, idx) => idx !== i);
      log = "One crate overboard. The rest hold.";
    } else log = "Nothing to dump. You ride it anyway.";
  } else if (kind === "cache") {
    if (yes) {
      cargo = [...cargo, makeDie(rollD6(r))];
      log = `A ${cargo[cargo.length - 1]!.pips}-pip crate. Hull ${hp(cargo)}.`;
    } else log = "You leave the crate. Superstition is a kind of skill.";
  } else if (kind === "recruiter") {
    if (yes) {
      const available = CREW_POOL.filter((p) => !crew.some((c) => c.kind === p.kind));
      if (available.length && crew.length < 3) {
        const pick = available[r.rng % available.length]!;
        crew = [...crew, { id: uid("c"), kind: pick.kind, name: pick.name }];
        log = `${pick.name} the ${pick.kind} climbs aboard. ${CREW_BLURB[pick.kind]}`;
      } else log = "No room, or they're already here.";
    } else log = "You sail past. The dinghy shrinks.";
  }

  if (cargo.length === 0) {
    return { ...r, cargo, gold, crew, event: null, phase: "defeat", log: "No cargo left. The Hold writes you off." };
  }
  return sailToNext({ ...r, cargo, gold, crew, event: null, log, phase: "sailing" });
}

export function concede(run: Run): Run {
  return { ...run, phase: "defeat", log: "You strike the colours." };
}

export function scoreOf(run: Run) {
  const hull = hp(run.cargo);
  const clean = hull !== CURSE ? 130 : 0;
  return run.sunk * 250 + run.gold * 12 + hull * 8 + (run.phase === "over" ? 400 : 0) + clean;
}

export function finishRun(run: Run): Run {
  return { ...run, phase: "over", log: `Final. ${scoreOf(run)} on the board.` };
}

export function restart(_seed?: number): Run {
  return newRun((_seed ?? Date.now()) >>> 0);
}

export function nextShot(run: Run) {
  return run.shots.find((s) => !s.spent && s.dmg > 0) ?? null;
}

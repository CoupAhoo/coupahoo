let ctx: AudioContext | null = null;
let muted = false;

export function isMuted() {
  return muted;
}

export function setMuted(v: boolean) {
  muted = v;
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

export function unlockSfx() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!ctx) ctx = new AC({ latencyHint: "interactive" });
  if (ctx.state === "suspended") void ctx.resume();
}

function beep(freq: number, dur = 0.09, type: OscillatorType = "square", gain = 0.05) {
  if (muted) return;
  unlockSfx();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(gain, t);
  g.gain.setTargetAtTime(0.0001, t + dur * 0.4, 0.03);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

export const sfx = {
  roll: () => {
    beep(220, 0.06);
    beep(330, 0.08);
  },
  keep: () => beep(440, 0.05, "triangle"),
  hit: () => beep(160, 0.1, "sawtooth", 0.06),
  win: () => {
    beep(392, 0.08);
    setTimeout(() => beep(523, 0.12), 80);
  },
  lose: () => beep(90, 0.22, "sawtooth", 0.07),
  curse: () => {
    beep(130, 0.16, "square", 0.07);
    setTimeout(() => beep(100, 0.2, "square", 0.07), 90);
  },
  click: () => beep(620, 0.04, "square", 0.03),
};

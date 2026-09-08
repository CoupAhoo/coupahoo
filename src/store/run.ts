import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  type Run,
  newRun,
  beginCargo,
  rollStartingCargo,
  acceptCargo,
  rollVolley,
  toggleKeep,
  rerollUnkept,
  lockVolley,
  aimAt,
  continueAfterVictory,
  resolveEvent,
  concede,
  restart,
  scoreOf,
} from "@/lib/ahoo/engine";
import { sfx, unlockSfx } from "@/lib/ahoo/sfx";
import { isCursed } from "@/lib/ahoo/engine";

type Store = {
  run: Run;
  best: number;
  wallet: string | null;
  mute: boolean;
  start: () => void;
  rerollCargo: () => void;
  accept: () => void;
  volley: () => void;
  keep: (id: string) => void;
  rerollShots: () => void;
  lock: () => void;
  shoot: (dieId: string) => void;
  afterWin: () => void;
  event: (yes: boolean) => void;
  giveUp: () => void;
  reset: () => void;
  setWallet: (a: string | null) => void;
};

export const useRun = create<Store>()(
  persist(
    (set, get) => ({
      run: newRun(),
      best: 0,
      wallet: null,
      mute: false,
      start: () => {
        unlockSfx();
        sfx.roll();
        set({ run: beginCargo(newRun()) });
      },
      rerollCargo: () => {
        sfx.roll();
        set({ run: rollStartingCargo(get().run) });
      },
      accept: () => set({ run: acceptCargo(get().run) }),
      volley: () => {
        sfx.roll();
        const run = rollVolley(get().run);
        if (isCursed(run.cargo)) sfx.curse();
        set({ run });
      },
      keep: (id) => {
        sfx.click();
        set({ run: toggleKeep(get().run, id) });
      },
      rerollShots: () => {
        sfx.roll();
        set({ run: rerollUnkept(get().run) });
      },
      lock: () => set({ run: lockVolley(get().run) }),
      shoot: (dieId) => {
        sfx.hit();
        const run = aimAt(get().run, dieId);
        if (run.phase === "victory") {
          sfx.win();
          set({ run, best: Math.max(get().best, scoreOf(run)) });
        } else if (run.phase === "defeat") {
          sfx.lose();
          set({ run, best: Math.max(get().best, scoreOf(run)) });
        } else set({ run });
      },
      afterWin: () => set({ run: continueAfterVictory(get().run) }),
      event: (yes) => {
        sfx.click();
        const run = resolveEvent(get().run, yes);
        if (run.phase === "defeat") sfx.lose();
        set({ run, best: Math.max(get().best, scoreOf(run)) });
      },
      giveUp: () => {
        const run = concede(get().run);
        sfx.lose();
        set({ run, best: Math.max(get().best, scoreOf(run)) });
      },
      reset: () => set({ run: restart() }),
      setWallet: (wallet) => set({ wallet }),
    }),
    {
      name: "coup-ahoo-run-v1",
      partialize: (s) => ({ best: s.best, wallet: s.wallet }),
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
    },
  ),
);

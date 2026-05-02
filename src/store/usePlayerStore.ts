import { create } from "zustand";
import { type Snapshot } from "@/components/Player/PlayerBrick/hooks/usePlayerSnapshot";

export interface Brick {
  id: number;
  width: number;
  snapshot: Snapshot | null;
}

export const BPM_LIMITS = {
  MIN: 20,
  MAX: 220,
} as const;

interface PlayerState {
  bricks: Brick[];
  activeBrickId: number | null;
  bpm: number;
  bpmMultiplier: number;
  isPlaying: boolean;
  currentStep: number;
  countIn: number;
  isCountingIn: boolean;

  // Poprawione: teraz przyjmuje opcjonalny snapshot
  addBrick: (initialSnapshot?: Snapshot | null) => void;
  removeBrick: (id: number) => void;
  updateBrickWidth: (id: number, newWidth: number) => void;
  updateBrickSnapshot: (id: number, snapshot: Snapshot) => void;
  setActiveBrickId: (id: number | null) => void;
  setBpm: (bpm: number) => void;
  setBpmMultiplier: (multiplier: number) => void;
  togglePlay: () => void;
  nextStep: () => void;
  getTotalSteps: () => number;
  reorderBricks: (startIndex: number, endIndex: number) => void;
  setBricks: (bricks: Brick[]) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  bricks: [],
  activeBrickId: null,
  bpm: 70,
  bpmMultiplier: 1,
  isPlaying: false,
  currentStep: 0,
  countIn: 0,
  isCountingIn: false,

  addBrick: (initialSnapshot = null) => {
    const newId = Date.now();
    set((state) => ({
      bricks: [
        ...state.bricks,
        {
          id: newId,
          width: 4,
          snapshot: initialSnapshot,
        },
      ],
    }));
  },

  updateBrickSnapshot: (id, snapshot) =>
    set((state) => ({
      bricks: state.bricks.map((b) => {
        if (b.id !== id) return b;

        const hasSameSnapshot =
          JSON.stringify(b.snapshot) === JSON.stringify(snapshot);

        if (hasSameSnapshot) {
          return b;
        }

        return { ...b, snapshot };
      }),
    })),

  removeBrick: (id) =>
    set((state) => ({
      bricks: state.bricks.filter((b) => b.id !== id),
      activeBrickId: state.activeBrickId === id ? null : state.activeBrickId,
    })),

  updateBrickWidth: (id, newWidth) =>
    set((state) => ({
      bricks: state.bricks.map((b) =>
        b.id === id ? { ...b, width: Math.max(1, Math.min(8, newWidth)) } : b,
      ),
    })),

  setActiveBrickId: (id) => set({ activeBrickId: id }),
  setBpm: (bpm) =>
    set({ bpm: Math.max(BPM_LIMITS.MIN, Math.min(BPM_LIMITS.MAX, bpm)) }),
  setBpmMultiplier: (bpmMultiplier) => set({ bpmMultiplier }),

  togglePlay: () => {
    const { isPlaying, bpm } = get();
    if (!isPlaying) {
      set({
        isPlaying: true,
        isCountingIn: true,
        countIn: bpm <= 100 ? 4 : 8,
        currentStep: 0,
      });
    } else {
      set({
        isPlaying: false,
        isCountingIn: false,
        countIn: 0,
        currentStep: 0,
      });
    }
  },

  getTotalSteps: () => {
    const { bricks } = get();
    return bricks.reduce((sum, b) => sum + b.width, 0);
  },

  nextStep: () => {
    const { currentStep, getTotalSteps, isCountingIn, countIn } = get();
    if (isCountingIn) {
      if (countIn > 1) {
        set({ countIn: countIn - 1 });
      } else {
        set({ isCountingIn: false, countIn: 0, currentStep: 0 });
      }
      return;
    }
    const total = getTotalSteps();
    if (total === 0) return;
    set({ currentStep: (currentStep + 1) % total });
  },

  reorderBricks: (startIndex, endIndex) => {
    set((state) => {
      const newBricks = Array.from(state.bricks);
      const [removed] = newBricks.splice(startIndex, 1);
      newBricks.splice(endIndex, 0, removed);

      return { bricks: newBricks };
    });
  },
  setBricks: (bricks) => set({ bricks }),
}));

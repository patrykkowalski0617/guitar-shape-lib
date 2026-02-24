import { create } from "zustand";

export interface Brick {
  id: number;
  width: number;
}

export const transitionTime = 200;

interface PlayerState {
  bricks: Brick[];
  activeBrickId: number | null;
  bpm: number;
  isPlaying: boolean;
  currentStep: number;
  transitionTime: number;
  countIn: number;
  isCountingIn: boolean;

  addBrick: (lockedDataSetter: () => void) => void;
  removeBrick: (id: number) => void;
  updateBrickWidth: (id: number, newWidth: number) => void;
  setActiveBrickId: (id: number | null) => void;
  setBpm: (bpm: number) => void;
  togglePlay: () => void;
  nextStep: () => void;
  getTotalSteps: () => number;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  bricks: [],
  activeBrickId: null,
  bpm: 70,
  isPlaying: false,
  currentStep: 0,
  transitionTime: transitionTime,
  countIn: 0,
  isCountingIn: false,

  addBrick: (lockedDataSetter) => {
    lockedDataSetter();
    const newId = Date.now();
    set((state) => ({
      bricks: [...state.bricks, { id: newId, width: 4 }],
      activeBrickId: newId,
    }));
  },

  removeBrick: (id) =>
    set((state) => ({
      bricks: state.bricks.filter((b) => b.id !== id),
      activeBrickId: state.activeBrickId === id ? null : state.activeBrickId,
    })),

  updateBrickWidth: (id, newWidth) =>
    set((state) => ({
      bricks: state.bricks.map((b) => (b.id === id ? { ...b, width: Math.max(1, Math.min(8, newWidth)) } : b)),
    })),

  setActiveBrickId: (id) => set({ activeBrickId: id }),

  setBpm: (bpm) => set({ bpm: Math.max(20, Math.min(360, bpm)) }),

  togglePlay: () => {
    const { isPlaying } = get();
    if (!isPlaying) {
      set({
        isPlaying: true,
        isCountingIn: true,
        countIn: 4,
        currentStep: 0,
        transitionTime: 0,
      });
    } else {
      set({
        isPlaying: false,
        isCountingIn: false,
        countIn: 0,
        currentStep: 0,
        transitionTime: transitionTime,
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

    set({
      currentStep: (currentStep + 1) % total,
    });
  },
}));

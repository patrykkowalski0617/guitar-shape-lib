import { create } from "zustand";

interface Brick {
  id: number;
  width: number;
}

interface PlayerState {
  bricks: Brick[];
  activeBrickId: number | null;
  bpm: number;
  isPlaying: boolean;

  currentStep: number;

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

  setBpm: (bpm) =>
    set({
      bpm: Math.max(20, Math.min(360, bpm)),
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
      currentStep: 0,
    })),

  getTotalSteps: () => {
    const { bricks } = get();
    return bricks.reduce((sum, b) => sum + b.width, 0);
  },

  nextStep: () => {
    const { currentStep, getTotalSteps } = get();
    const total = getTotalSteps();

    if (total === 0) return;

    set({
      currentStep: (currentStep + 1) % total,
    });
  },
}));

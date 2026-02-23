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

  addBrick: (lockedDataSetter: () => void) => void;
  removeBrick: (id: number) => void;
  updateBrickWidth: (id: number, newWidth: number) => void;

  setActiveBrickId: (id: number | null) => void;
  setBpm: (bpm: number) => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  bricks: [],
  activeBrickId: null,
  bpm: 70,
  isPlaying: false,

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
    })),
}));

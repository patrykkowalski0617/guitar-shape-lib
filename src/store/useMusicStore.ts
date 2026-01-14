import { create } from "zustand";
import { generateScaleSteps, type NoteObject } from "@/utils";

interface MusicState {
  activeScaleNotes: NoteObject[];
  setActiveScaleNotes: (notes: NoteObject[]) => void;
  activeScaleSteps: number[];
  setActiveScaleSteps: (steps: number[]) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeScaleNotes: [],
  setActiveScaleNotes: (notes) => set({ activeScaleNotes: notes }),

  activeScaleSteps: generateScaleSteps(9),
  setActiveScaleSteps: (steps) => set({ activeScaleSteps: steps }),
}));

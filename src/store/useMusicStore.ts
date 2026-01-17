import { create } from "zustand";
import { generateScaleSteps, type NoteObject } from "@/utils";

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;
  activeScaleNotes: NoteObject[];
  setActiveScaleNotes: (notes: NoteObject[]) => void;
  activeScaleSteps: number[];
  setActiveScaleSteps: (steps: number[]) => void;
  activeShapePoint: { stringIdx: number; fretIdx: number; variantIdx: number } | null;
  setActiveShapePoint: (
    point: { stringIdx: number; fretIdx: number; variantIdx: number } | null
  ) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => set({ activeNoteId: noteId }),

  activeScaleNotes: [],
  setActiveScaleNotes: (notes) => set({ activeScaleNotes: notes }),

  activeScaleSteps: generateScaleSteps(9),
  setActiveScaleSteps: (steps) => set({ activeScaleSteps: steps }),

  activeShapePoint: null,
  setActiveShapePoint: (point) => set({ activeShapePoint: point }),
}));

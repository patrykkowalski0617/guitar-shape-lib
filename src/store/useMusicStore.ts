import { create } from "zustand";
import { generateScaleSteps, type NoteObject, type RoleId } from "@/utils";

interface Point {
  s: number;
  f: number;
}

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
  lockedShape: Point[] | null;
  setLockedShape: (points: Point[] | null) => void;
  currentShapeRootFret: number | null;
  setCurrentShapeRootFret: (currentShapeRootFret: number) => void;
  lockedRoleId: RoleId | null;
  setLockedRoleId: (id: RoleId | null) => void;
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

  lockedShape: null,
  setLockedShape: (points) => set({ lockedShape: points }),

  currentShapeRootFret: null,
  setCurrentShapeRootFret: (fret) => set({ currentShapeRootFret: fret }),

  lockedRoleId: null,
  setLockedRoleId: (points) => set({ lockedRoleId: points }),
}));

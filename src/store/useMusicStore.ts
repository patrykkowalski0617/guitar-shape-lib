import { create } from "zustand";

export interface ShapeVariantLocationData {
  shapeId: string | null;
  stringId: string;
  fretIndex: number;
  variantId: string;
}

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  currentShapeVariantLocationData: ShapeVariantLocationData | null;
  setCurrentShapeVariantLocationData: (target: ShapeVariantLocationData | null) => void;

  lockedShapeVariantLocationData: ShapeVariantLocationData | null;
  setLockedShapeVariantLocationData: (target: ShapeVariantLocationData | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => set({ activeNoteId: noteId }),

  currentShapeVariantLocationData: null,
  setCurrentShapeVariantLocationData: (currentShapeVariantLocationData) => set({ currentShapeVariantLocationData }),

  lockedShapeVariantLocationData: null,
  setLockedShapeVariantLocationData: (lockedShapeVariantLocationData) => set({ lockedShapeVariantLocationData }),
}));

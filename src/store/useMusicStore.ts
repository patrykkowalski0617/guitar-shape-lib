import type { FretboardStringId, VariantId } from "@/data";
import { create } from "zustand";

export interface ShapeVariantLocationData {
  shapeId: string | null;
  stringId: FretboardStringId;
  fretIndex: number;
  variantId: VariantId;
}

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  shapeVariantLocationData: ShapeVariantLocationData | null;
  setShapeVariantLocationData: (target: ShapeVariantLocationData | null) => void;

  shapeVariantLocationData_ghost: ShapeVariantLocationData | null;
  setShapeVariantLocationData_ghost: (target: ShapeVariantLocationData | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => set({ activeNoteId: noteId }),

  shapeVariantLocationData: null,
  setShapeVariantLocationData: (shapeVariantLocationData) => set({ shapeVariantLocationData }),

  shapeVariantLocationData_ghost: null,
  setShapeVariantLocationData_ghost: (shapeVariantLocationData_ghost) => set({ shapeVariantLocationData_ghost }),
}));

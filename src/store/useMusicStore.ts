import { create } from "zustand";
import { type RoleId } from "@/data";

export interface ShapeVariantLocationData {
  shapeId: string | null;
  stringId: string;
  fretIndex: number;
  variantId: string;
}

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  lockedRoleId: RoleId | null;
  setLockedRoleId: (id: RoleId | null) => void;

  currentShapeVariantLocationData: ShapeVariantLocationData | null;
  setCurrentShapeVariantLocationData: (target: ShapeVariantLocationData | null) => void;

  lockedShapeVariantLocationData: ShapeVariantLocationData | null;
  setLockedShapeVariantLocationData: (target: ShapeVariantLocationData | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => set({ activeNoteId: noteId }),

  lockedRoleId: null,
  setLockedRoleId: (points) => set({ lockedRoleId: points }),

  currentShapeVariantLocationData: null,
  setCurrentShapeVariantLocationData: (currentShapeVariantLocationData) => set({ currentShapeVariantLocationData }),

  lockedShapeVariantLocationData: null,
  setLockedShapeVariantLocationData: (lockedShapeVariantLocationData) => set({ lockedShapeVariantLocationData }),
}));

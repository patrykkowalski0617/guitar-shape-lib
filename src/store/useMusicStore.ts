import { create } from "zustand";
import { type RoleId } from "@/utils";

export interface CurrentShapeVariantLocation {
  currentShapeId: string | null;
  stringId: string;
  fretIdx: number;
  variantId: string;
}

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  lockedRoleId: RoleId | null;
  setLockedRoleId: (id: RoleId | null) => void;

  currentShapeVariantLocationData: CurrentShapeVariantLocation | null;
  setCurrentShapeVariantLocationData: (target: CurrentShapeVariantLocation | null) => void;

  lockedShapeVariantLocationData: CurrentShapeVariantLocation | null;
  setLockedShapeVariantLocationData: (target: CurrentShapeVariantLocation | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => set({ activeNoteId: noteId }),

  lockedRoleId: null,
  setLockedRoleId: (points) => set({ lockedRoleId: points }),

  currentShapeVariantLocationData: null,
  setCurrentShapeVariantLocationData: (currentShapeVariantLocationData) =>
    set({ currentShapeVariantLocationData }),

  lockedShapeVariantLocationData: null,
  setLockedShapeVariantLocationData: (lockedShapeVariantLocationData) =>
    set({ lockedShapeVariantLocationData }),
}));

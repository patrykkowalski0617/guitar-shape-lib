import { create } from "zustand";
import { type RoleId } from "@/utils";

interface Point {
  s: number;
  f: number;
}

export interface CurrentShapeVariantLocation {
  stringKey: string;
  fretIdx: number;
  variantId: string;
}

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  activeShapePoint: { stringIdx: number; fretIdx: number; variantIdx: number } | null;
  setActiveShapePoint: (
    point: { stringIdx: number; fretIdx: number; variantIdx: number } | null,
  ) => void;

  lockedShape: Point[] | null;
  setLockedShape: (points: Point[] | null) => void;

  lockedRoleId: RoleId | null;
  setLockedRoleId: (id: RoleId | null) => void;

  currentShapeVariantLocationData: CurrentShapeVariantLocation | null;
  setCurrentShapeVariantLocationData: (target: CurrentShapeVariantLocation | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => set({ activeNoteId: noteId }),

  activeShapePoint: null,
  setActiveShapePoint: (point) => set({ activeShapePoint: point }),

  lockedShape: null,
  setLockedShape: (points) => set({ lockedShape: points }),

  lockedRoleId: null,
  setLockedRoleId: (points) => set({ lockedRoleId: points }),

  currentShapeVariantLocationData: null,
  setCurrentShapeVariantLocationData: (currentShapeVariantLocationData) =>
    set({ currentShapeVariantLocationData }),
}));

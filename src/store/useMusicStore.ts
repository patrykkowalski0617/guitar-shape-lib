import type { FretboardStringId, VariantId } from "@/data";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { useControlsStore } from "./useControlsStore";

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
  setShapeVariantLocationData: (
    target: ShapeVariantLocationData | null,
  ) => void;

  shapeVariantLocationData_locked: ShapeVariantLocationData | null;
  setShapeVariantLocationData_locked: (
    target: ShapeVariantLocationData | null,
  ) => void;

  activeNotes: string[];
  setActiveNotes: (activeNote: string) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  setActiveNoteId: (noteId) => {
    const playerState = usePlayerStore.getState();
    const controlState = useControlsStore.getState();
    const dontShowActiveNotes =
      controlState.shapeId !== null || playerState.isPlaying;

    if (dontShowActiveNotes) return;

    set({ activeNoteId: noteId });
  },

  shapeVariantLocationData: null,
  setShapeVariantLocationData: (shapeVariantLocationData) =>
    set((state) => ({ ...state, shapeVariantLocationData })),

  shapeVariantLocationData_locked: null,
  setShapeVariantLocationData_locked: (shapeVariantLocationData_locked) =>
    set((state) => ({
      ...state,
      shapeVariantLocationData_locked,
      _lockedUpdate: Date.now(),
    })),

  activeNotes: [],
  setActiveNotes: (activeNote) =>
    set((state) => {
      const isNoteAlreadyActive = state.activeNotes.includes(activeNote);

      const nextActiveNotes = isNoteAlreadyActive
        ? state.activeNotes.filter((note) => note !== activeNote)
        : [...state.activeNotes, activeNote];

      return {
        ...state,
        activeNotes: nextActiveNotes,
      };
    }),
}));

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

  activeLockedNotes: string[];
  setActiveLockedNotes: (activeNote: string) => void;
  resetActiveLockedNotes: () => void;

  shapeVariantLocationData: ShapeVariantLocationData | null;
  setShapeVariantLocationData: (
    target: ShapeVariantLocationData | null,
  ) => void;

  shapeVariantLocationData_locked: ShapeVariantLocationData | null;
  setShapeVariantLocationData_locked: (
    target: ShapeVariantLocationData | null,
  ) => void;
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

  activeLockedNotes: [],
  setActiveLockedNotes: (activeNote) => {
    const controlState = useControlsStore.getState();
    const isShapeActive = controlState.shapeId !== null;

    if (isShapeActive) return;

    set((state) => {
      const isNoteAlreadyActive = state.activeLockedNotes.includes(activeNote);

      const nextActiveNotes = isNoteAlreadyActive
        ? state.activeLockedNotes.filter((note) => note !== activeNote)
        : [...state.activeLockedNotes, activeNote];

      return {
        activeLockedNotes: nextActiveNotes,
      };
    });
  },
  resetActiveLockedNotes: () => set({ activeLockedNotes: [] }),

  shapeVariantLocationData: null,
  setShapeVariantLocationData: (shapeVariantLocationData) =>
    set({ shapeVariantLocationData }),

  shapeVariantLocationData_locked: null,
  setShapeVariantLocationData_locked: (shapeVariantLocationData_locked) =>
    set({
      shapeVariantLocationData_locked,
    }),
}));

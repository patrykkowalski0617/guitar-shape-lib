import type { FretboardCoordinate, FretboardStringId, VariantId } from "@/data";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { useControlsStore } from "./useControlsStore";
import type { NoteObject } from "@/utils";

export interface ShapeVariantLocationData {
  shapeId: string | null;
  stringId: FretboardStringId;
  fretIndex: number;
  variantId: VariantId;
}

interface MusicState {
  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  shapeNoteIds: string[];
  setShapeNoteIds: (shapeNoteIds: string[]) => void;
  updateShapeNotes: (
    allNotes: NoteObject[][],
    coordinates: FretboardCoordinate[],
  ) => void;

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
  shapeNoteIds: [],
  activeLockedNotes: [],
  shapeVariantLocationData: null,
  shapeVariantLocationData_locked: null,

  setActiveNoteId: (noteId) => {
    const playerState = usePlayerStore.getState();
    const controlState = useControlsStore.getState();
    const isSmallScreen = window.innerWidth < 1024;
    const isPlayingOrHasShape =
      controlState.shapeId !== null || playerState.isPlaying;

    if (isPlayingOrHasShape || isSmallScreen) return;

    set({ activeNoteId: noteId });
  },

  setShapeNoteIds: (shapeNoteIds) => set({ shapeNoteIds }),

  updateShapeNotes: (allNotes, coordinates) => {
    const nextShapeNoteIds: string[] = [];

    allNotes.forEach((row, stringIdx) => {
      row.forEach((note, fretIdx) => {
        const isMatch = coordinates.some(
          ([s, f]) => s === stringIdx && f === fretIdx,
        );
        if (isMatch) {
          nextShapeNoteIds.push(note.noteId);
        }
      });
    });

    set({ shapeNoteIds: nextShapeNoteIds });
  },
  setShapeVariantLocationData: (data) => {
    if (!data) {
      set({ shapeVariantLocationData: null, shapeNoteIds: [] });
      return;
    }

    set({ shapeVariantLocationData: data });
  },

  setActiveLockedNotes: (activeNote) => {
    const controlState = useControlsStore.getState();
    if (controlState.shapeId !== null) return;

    set((state) => {
      const isAlreadyActive = state.activeLockedNotes.includes(activeNote);
      const nextActiveNotes = isAlreadyActive
        ? state.activeLockedNotes.filter((note) => note !== activeNote)
        : [...state.activeLockedNotes, activeNote];

      return { activeLockedNotes: nextActiveNotes };
    });
  },

  resetActiveLockedNotes: () => set({ activeLockedNotes: [] }),
  setShapeVariantLocationData_locked: (data) =>
    set({ shapeVariantLocationData_locked: data }),
}));

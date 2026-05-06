import type { FretboardCoordinate, FretboardStringId, VariantId } from "@/data";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { useControlsStore } from "./useControlsStore";
import type { NoteId, NoteObject } from "@/utils";

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

  selectedComponentNotes: string[];
  setSelectedComponentNotes: (noteName: string) => void;
  resetSelectedComponentNotes: () => void;

  shapeVariantLocationData: ShapeVariantLocationData | null;
  setShapeVariantLocationData: (
    target: ShapeVariantLocationData | null,
  ) => void;

  shapeVariantLocationData_locked: ShapeVariantLocationData | null;
  setShapeVariantLocationData_locked: (
    target: ShapeVariantLocationData | null,
  ) => void;

  bassNoteId: NoteId | null;
  setBassNote: (noteName: NoteId | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  activeNoteId: null,
  shapeNoteIds: [],
  activeLockedNotes: [],
  selectedComponentNotes: [],
  shapeVariantLocationData: null,
  shapeVariantLocationData_locked: null,
  bassNoteId: null,

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

  setSelectedComponentNotes: (noteName) => {
    set((state) => {
      const isAlreadySelected = state.selectedComponentNotes.includes(noteName);
      const nextSelectedNotes = isAlreadySelected
        ? state.selectedComponentNotes.filter((note) => note !== noteName)
        : [...state.selectedComponentNotes, noteName];

      return { selectedComponentNotes: nextSelectedNotes };
    });
  },

  resetSelectedComponentNotes: () => set({ selectedComponentNotes: [] }),

  setShapeVariantLocationData_locked: (data) =>
    set({ shapeVariantLocationData_locked: data }),

  setBassNote: (bassNoteId) => set({ bassNoteId }),
}));

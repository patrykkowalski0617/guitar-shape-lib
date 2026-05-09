import type {
  FretboardCoordinate,
  NoteName,
  ShapeVariantDataKeys,
} from "@/data";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { useControlsStore } from "./useControlsStore";
import type { NoteId, NoteObject } from "@/utils";
import type { Exact } from "@/types";

interface MusicState {
  shapeNoteIds: NoteId[];
  setShapeNoteIds: (shapeNoteIds: NoteId[]) => void;
  updateShapeNotes: (
    allNotes: NoteObject[][],
    coordinates: FretboardCoordinate[],
  ) => void;

  activeNoteId: string | null;
  setActiveNoteId: (noteId: string | null) => void;

  activeLockedNoteIds: string[];
  setActiveLockedNoteIds: (activeNote: string) => void;
  resetActiveLockedNoteIds: () => void;

  backgingtrackNoteIds: NoteId[];
  setBackgingtrackNoteIds: (noteId: NoteId[]) => void;

  selectedTargetNotesNames: NoteName[];
  setSelectedTargetNotesNames: (noteName: NoteName) => void;
  resetSelectedTargetNotesNames: () => void;

  shapeVariantDataKeys: ShapeVariantDataKeys | null;
  setShapeVariantDataKeys: {
    <T>(data: Exact<ShapeVariantDataKeys, T>): void;
    (data: null): void;
  };

  shapeVariantDataKeys_locked: ShapeVariantDataKeys | null;
  setShapeVariantDataKeys_locked: {
    <T>(data: Exact<ShapeVariantDataKeys, T>): void;
    (data: null): void;
  };
}

export const useMusicStore = create<MusicState>((set) => ({
  shapeNoteIds: [],
  activeNoteId: null,
  activeLockedNoteIds: [],
  backgingtrackNoteIds: [],
  selectedTargetNotesNames: [],
  shapeVariantDataKeys: null,
  shapeVariantDataKeys_locked: null,

  setShapeNoteIds: (shapeNoteIds) => set({ shapeNoteIds }),

  updateShapeNotes: (allNotes, coordinates) => {
    const nextShapeNoteIds: NoteId[] = [];

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

  setActiveNoteId: (noteId) => {
    const playerState = usePlayerStore.getState();
    const controlState = useControlsStore.getState();
    const isSmallScreen = window.innerWidth < 1024;
    const isPlayingOrHasShape =
      controlState.shapeDataKey !== null || playerState.isPlaying;

    if (isPlayingOrHasShape || isSmallScreen) return;

    set({ activeNoteId: noteId });
  },

  setActiveLockedNoteIds: (activeNote) => {
    const controlState = useControlsStore.getState();
    if (controlState.shapeDataKey !== null) return;

    set((state) => {
      const isAlreadyActive = state.activeLockedNoteIds.includes(activeNote);
      const nextActiveNotes = isAlreadyActive
        ? state.activeLockedNoteIds.filter((note) => note !== activeNote)
        : [...state.activeLockedNoteIds, activeNote];

      return { activeLockedNoteIds: nextActiveNotes };
    });
  },

  resetActiveLockedNoteIds: () => set({ activeLockedNoteIds: [] }),

  setBackgingtrackNoteIds: (backgingtrackNoteIds) =>
    set({ backgingtrackNoteIds }),

  setSelectedTargetNotesNames: (noteName) => {
    set((state) => {
      const isAlreadySelected =
        state.selectedTargetNotesNames.includes(noteName);
      const nextSelectedNotes = isAlreadySelected
        ? state.selectedTargetNotesNames.filter((note) => note !== noteName)
        : [...state.selectedTargetNotesNames, noteName];

      return { selectedTargetNotesNames: nextSelectedNotes };
    });
  },

  resetSelectedTargetNotesNames: () => set({ selectedTargetNotesNames: [] }),

  setShapeVariantDataKeys: (
    shapeVariantDataKeys: ShapeVariantDataKeys | null,
  ) => {
    set({ shapeVariantDataKeys });
  },

  setShapeVariantDataKeys_locked: (
    shapeVariantDataKeys_locked: ShapeVariantDataKeys | null,
  ) => {
    set({ shapeVariantDataKeys_locked });
  },
}));

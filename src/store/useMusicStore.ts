import type {
  FretboardCoordinate,
  NoteName,
  ShapeVariantDataKeys,
} from "@/data";
import { create } from "zustand";
import type { NoteId, NoteObject } from "@/utils";
import type { Exact } from "@/types";
import { useMetronomeStore } from "./useMetronomeStore";
import { useDataKeyStore } from "./useDataKeyStore";

interface MusicState {
  baseChordBassNoteId: NoteId | null;
  setBaseChordBassNoteId: (noteId: NoteId | null) => void;

  guitarShapeNoteIds: NoteId[];
  setShapeNoteIds: (guitarShapeNoteIds: NoteId[]) => void;
  updateShapeNotes: (
    allNotes: NoteObject[][],
    coordinates: FretboardCoordinate[],
  ) => void;

  activeHoverNoteId: string | null;
  setActiveHoverNoteId: (noteId: string | null) => void;

  activeLockedNoteIds: string[];
  setActiveLockedNoteIds: (activeHoverNote: string) => void;
  resetActiveLockedNoteIds: () => void;

  backgingtrackNoteIds: NoteId[];
  setBackgingtrackNoteIds: (noteId: NoteId[]) => void;

  selectedTargetNotesNames: NoteName[];
  setSelectedTargetNotesNames: (noteName: NoteName) => void;
  resetSelectedTargetNotesNames: () => void;

  guitarShapeVariantDataKeys: ShapeVariantDataKeys | null;
  setShapeVariantDataKeys: {
    <T>(data: Exact<ShapeVariantDataKeys, T>): void;
    (data: null): void;
  };

  guitarShapeVariantDataKeys_locked: ShapeVariantDataKeys | null;
  setShapeVariantDataKeys_locked: {
    <T>(data: Exact<ShapeVariantDataKeys, T>): void;
    (data: null): void;
  };
}

export const useMusicStore = create<MusicState>((set) => ({
  baseChordBassNoteId: null,
  guitarShapeNoteIds: [],
  activeHoverNoteId: null,
  activeLockedNoteIds: [],
  backgingtrackNoteIds: [],
  selectedTargetNotesNames: [],
  guitarShapeVariantDataKeys: null,
  guitarShapeVariantDataKeys_locked: null,

  setBaseChordBassNoteId: (baseChordBassNoteId) => set({ baseChordBassNoteId }),

  setShapeNoteIds: (guitarShapeNoteIds) => set({ guitarShapeNoteIds }),

  updateShapeNotes: (allNotes, coordinates) => {
    const nextShapeNoteIds: NoteId[] = [];

    allNotes.forEach((row, stringIdx) => {
      row.forEach((noteObject, fretIdx) => {
        const isMatch = coordinates.some(
          ([s, f]) => s === stringIdx && f === fretIdx,
        );
        if (isMatch) {
          nextShapeNoteIds.push(noteObject.noteId);
        }
      });
    });

    set({ guitarShapeNoteIds: nextShapeNoteIds });
  },

  setActiveHoverNoteId: (noteId) => {
    const playerState = useMetronomeStore.getState();
    const controlState = useDataKeyStore.getState();
    const isSmallScreen = window.innerWidth < 1024;
    const isPlayingOrHasShape =
      controlState.guitarShapeDataKey !== null || playerState.isPlaying;

    if (isPlayingOrHasShape || isSmallScreen) return;

    set({ activeHoverNoteId: noteId });
  },

  setActiveLockedNoteIds: (activeHoverNote) => {
    const controlState = useDataKeyStore.getState();
    if (controlState.guitarShapeDataKey !== null) return;

    set((state) => {
      const isAlreadyActive =
        state.activeLockedNoteIds.includes(activeHoverNote);
      const nextActiveHoverNotes = isAlreadyActive
        ? state.activeLockedNoteIds.filter(
            (noteObject) => noteObject !== activeHoverNote,
          )
        : [...state.activeLockedNoteIds, activeHoverNote];

      return { activeLockedNoteIds: nextActiveHoverNotes };
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
        ? state.selectedTargetNotesNames.filter(
            (noteObject) => noteObject !== noteName,
          )
        : [...state.selectedTargetNotesNames, noteName];

      return { selectedTargetNotesNames: nextSelectedNotes };
    });
  },

  resetSelectedTargetNotesNames: () => set({ selectedTargetNotesNames: [] }),

  setShapeVariantDataKeys: (
    guitarShapeVariantDataKeys: ShapeVariantDataKeys | null,
  ) => {
    set({ guitarShapeVariantDataKeys });
  },

  setShapeVariantDataKeys_locked: (
    guitarShapeVariantDataKeys_locked: ShapeVariantDataKeys | null,
  ) => {
    set({ guitarShapeVariantDataKeys_locked });
  },
}));

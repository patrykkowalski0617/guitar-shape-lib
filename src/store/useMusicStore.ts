import type {
  FretboardCoordinate,
  NoteName,
  ShapeVariantDataKeys,
} from "@/data";
import { create } from "zustand";
import { useControlsStore } from "./useControlsStore";
import type { NoteId, NoteObject } from "@/utils";
import type { Exact } from "@/types";
import { useMetronomeStore } from "./useMetronomeStore";

interface MusicState {
  baseChordBassNoteId: NoteId | null;
  setBaseChordBassNoteId: (noteId: NoteId | null) => void;

  shapeNoteIds: NoteId[];
  setShapeNoteIds: (shapeNoteIds: NoteId[]) => void;
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
  baseChordBassNoteId: null,
  shapeNoteIds: [],
  activeHoverNoteId: null,
  activeLockedNoteIds: [],
  backgingtrackNoteIds: [],
  selectedTargetNotesNames: [],
  shapeVariantDataKeys: null,
  shapeVariantDataKeys_locked: null,

  setBaseChordBassNoteId: (baseChordBassNoteId) => set({ baseChordBassNoteId }),

  setShapeNoteIds: (shapeNoteIds) => set({ shapeNoteIds }),

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

    set({ shapeNoteIds: nextShapeNoteIds });
  },

  setActiveHoverNoteId: (noteId) => {
    const playerState = useMetronomeStore.getState();
    const controlState = useControlsStore.getState();
    const isSmallScreen = window.innerWidth < 1024;
    const isPlayingOrHasShape =
      controlState.shapeDataKey !== null || playerState.isPlaying;

    if (isPlayingOrHasShape || isSmallScreen) return;

    set({ activeHoverNoteId: noteId });
  },

  setActiveLockedNoteIds: (activeHoverNote) => {
    const controlState = useControlsStore.getState();
    if (controlState.shapeDataKey !== null) return;

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

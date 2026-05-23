import type { ShapeVariantDataKeys } from "@/data";
import { create } from "zustand";
import type { NoteId } from "@/utils";
import { useMetronomeStore } from "../useMetronomeStore/useMetronomeStore";
import { useDataKeyStore } from "../useDataKeyStore/useDataKeyStore";
import type { MusicState } from "./types";

export const useMusicStore = create<MusicState>((set) => ({
  baseChordBassNoteId: null,
  guitarShapeNoteIds: [],
  activeHoverNoteId: null,
  activeLockedNoteIds: [],
  backgingtrackNoteIds: [],
  targetSharpNoteNames: [],
  guitarShapeVariantDataKeys: null,
  guitarShapeVariantDataKeys_locked: null,
  isMajorMode: true,

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

  setTargetSharpNoteNames: (noteName) => {
    set((state) => {
      const isAlreadySelected = state.targetSharpNoteNames.includes(noteName);
      const nextSelectedNotes = isAlreadySelected
        ? state.targetSharpNoteNames.filter(
            (noteObject) => noteObject !== noteName,
          )
        : [...state.targetSharpNoteNames, noteName];

      return { targetSharpNoteNames: nextSelectedNotes };
    });
  },

  replaceTargetSharpNoteNames: (sharpNoteNames) =>
    set({ targetSharpNoteNames: sharpNoteNames }),

  resetTargetSharpNoteNames: () => set({ targetSharpNoteNames: [] }),

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
  setIsMajorMode: (isMajorMode) => set({ isMajorMode }),
}));

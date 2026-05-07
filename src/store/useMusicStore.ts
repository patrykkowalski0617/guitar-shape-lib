import type { FretboardCoordinate, Note } from "@/data";
import { create } from "zustand";
import { usePlayerStore } from "./usePlayerStore";
import { useControlsStore } from "./useControlsStore";
import type { NoteId, NoteObject } from "@/utils";
import type { ShapeVariantLocationData } from "@/types";

interface MusicState {
  shapeNoteIds: string[];
  setShapeNoteIds: (shapeNoteIds: string[]) => void;
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

  selectedTargetNotesNames: Note[];
  setSelectedTargetNotesNames: (noteName: Note) => void;
  resetSelectedTargetNotesNames: () => void;

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
  shapeNoteIds: [],
  activeNoteId: null,
  activeLockedNoteIds: [],
  backgingtrackNoteIds: [],
  selectedTargetNotesNames: [],
  shapeVariantLocationData: null,
  shapeVariantLocationData_locked: null,

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

  setActiveNoteId: (noteId) => {
    const playerState = usePlayerStore.getState();
    const controlState = useControlsStore.getState();
    const isSmallScreen = window.innerWidth < 1024;
    const isPlayingOrHasShape =
      controlState.shapeId !== null || playerState.isPlaying;

    if (isPlayingOrHasShape || isSmallScreen) return;

    set({ activeNoteId: noteId });
  },

  setActiveLockedNoteIds: (activeNote) => {
    const controlState = useControlsStore.getState();
    if (controlState.shapeId !== null) return;

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

  setShapeVariantLocationData: (data) => {
    if (!data) {
      set({ shapeVariantLocationData: null, shapeNoteIds: [] });
      return;
    }

    set({ shapeVariantLocationData: data });
  },

  setShapeVariantLocationData_locked: (data) =>
    set({ shapeVariantLocationData_locked: data }),
}));

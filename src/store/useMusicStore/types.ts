import type {
  FretboardCoordinate,
  ShapeVariantDataKeys,
  SharpNoteName,
} from "@/data";
import type { NoteId, NoteObject } from "@/utils";
import type { Exact } from "@/types";

export interface MusicState {
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

  backingtrackNoteIds: NoteId[];
  setBackingtrackNoteIds: (noteId: NoteId[]) => void;

  targetSharpNoteNames: SharpNoteName[];
  setTargetSharpNoteNames: (sharpNoteName: SharpNoteName) => void;
  replaceTargetSharpNoteNames: (sharpNoteNames: SharpNoteName[]) => void;
  resetTargetSharpNoteNames: () => void;

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

  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;
}

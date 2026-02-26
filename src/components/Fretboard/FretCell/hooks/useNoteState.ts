import { useMusicStore, useControlsStore } from "@/store";
import { getNotes } from "@/utils";
import { type NoteSharp } from "@/data";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useShapeNotes, isShapeNote } from "./useShapeNotes";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";

interface UseFretCellProp {
  sharpNoteName: NoteSharp;
  noteId: string;
  stringIndex: StringIndex;
  fretIndex: number;
}

export const useNoteState = ({ sharpNoteName, noteId, stringIndex, fretIndex }: UseFretCellProp) => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore((state) => state.shapeSemitoneOffsetFromC);
  const isPianoVisable = useControlsStore((state) => state.isPianoVisable);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const shapeVariantLocationData_ghost = useMusicStore((state) => state.shapeVariantLocationData_ghost);

  const NOTES_SHARP = getNotes({ firstNote: tuneKeyId }).map((n) => n.sharpNoteName);

  const shapeRootSharpNote = shapeSemitoneOffsetFromC !== null ? NOTES_SHARP[shapeSemitoneOffsetFromC % 12] : null;

  const currentShapeNotes = useShapeNotes(shapeVariantLocationData);
  const lockedShapeNotes = useShapeNotes(shapeVariantLocationData_ghost);

  const sharpNoteNamesInTune = useInTuneSharpNoteNames();

  const currentCoords: [number, number] = [stringIndex, fretIndex];

  return {
    isActiveNote: activeNoteId === noteId && isPianoVisable,
    isShapeRootNote: shapeRootSharpNote === sharpNoteName && stringIndex > 1,
    isShapeNote: isShapeNote(currentCoords, currentShapeNotes),
    isLockedNote: isShapeNote(currentCoords, lockedShapeNotes),
    isTuneNote: sharpNoteNamesInTune.includes(sharpNoteName),
  };
};

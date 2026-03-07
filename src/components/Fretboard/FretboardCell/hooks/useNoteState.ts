import { useMusicStore, useControlsStore } from "@/store";
import { getNotes } from "@/utils";
import { type NoteSharp } from "@/data";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote } from "../utils";

interface UseFretboardCellProp {
  sharpNoteName: NoteSharp;
  noteId: string;
  stringIndex: StringIndex;
  fretIndex: number;
}

export const useNoteState = ({
  sharpNoteName,
  noteId,
  stringIndex,
  fretIndex,
}: UseFretboardCellProp) => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const shapeVariantLocationData_ghost = useMusicStore(
    (state) => state.shapeVariantLocationData_ghost,
  );

  const NOTES_SHARP = getNotes({ firstNote: tuneKeyId }).map(
    (n) => n.sharpNoteName,
  );

  const shapeRootSharpNote =
    shapeSemitoneOffsetFromC !== null
      ? NOTES_SHARP[shapeSemitoneOffsetFromC % 12]
      : null;

  const currentShapeNotes = useShapeCoordinates(shapeVariantLocationData);
  const lockedShapeNotes = useShapeCoordinates(shapeVariantLocationData_ghost);

  const sharpNoteNamesInTune = useInTuneSharpNoteNames();

  const currentCoords: [number, number] = [stringIndex, fretIndex];

  return {
    isActiveNote: activeNoteId === noteId,
    isShapeRootNote: shapeRootSharpNote === sharpNoteName && stringIndex > 1,
    isShapeNote: isShapeNote(currentCoords, currentShapeNotes),
    isLockedNote: isShapeNote(currentCoords, lockedShapeNotes),
    isTuneNote: sharpNoteNamesInTune.includes(sharpNoteName),
  };
};

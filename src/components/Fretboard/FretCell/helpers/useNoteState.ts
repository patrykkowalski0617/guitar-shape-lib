import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
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
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  const lockedShapeVariantLocationData = useMusicStore((state) => state.lockedShapeVariantLocationData);

  const NOTES_SHARP = getNotes({ firstNote: currentKeyId }).map((n) => n.sharpNoteName);

  const shapeRootSharpNote =
    currentShapeSemitoneOffsetFromC !== null ? NOTES_SHARP[currentShapeSemitoneOffsetFromC % 12] : null;

  const currentShapeNotes = useShapeNotes(currentShapeVariantLocationData);
  const lockedShapeNotes = useShapeNotes(lockedShapeVariantLocationData);

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

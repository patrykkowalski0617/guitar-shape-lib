import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes, type NoteSharp } from "@/utils";
import { useShapeNotes } from "./useShapeNotes";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";
import type { StringIndex } from "../../FretboardRow/FretboardRow";

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

  const { isShapeNote } = useShapeNotes(currentShapeVariantLocationData);
  const { isShapeNote: isLockedShapeNote } = useShapeNotes(lockedShapeVariantLocationData);
  const sharpNoteNamesInTune = useInTuneSharpNoteNames();

  return {
    isActiveNote: activeNoteId === noteId,
    isShapeRootNote: shapeRootSharpNote === sharpNoteName && stringIndex > 1,
    isShapeNote: isShapeNote([stringIndex, fretIndex]),
    isLockedNote: isLockedShapeNote([stringIndex, fretIndex]),
    isTuneNote: sharpNoteNamesInTune.includes(sharpNoteName),
  };
};

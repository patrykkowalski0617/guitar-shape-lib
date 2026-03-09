import { useMusicStore, useControlsStore, usePlayerStore } from "@/store";
import { getNotes } from "@/utils";
import { type NoteSharp } from "@/data";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote as isShapeNoteFn } from "../helpers";
import { useFretboardStates } from "./useFretboardStates";

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
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { isShapeSelected, shouldMarkTuneNotes } = useFretboardStates();
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const shapeVariantLocationData_locked = useMusicStore(
    (state) => state.shapeVariantLocationData_locked,
  );

  const shapeCoordintes = useShapeCoordinates(shapeVariantLocationData);
  const currentCoordinates: [number, number] = [stringIndex, fretIndex];
  const NOTES_SHARP = getNotes({ firstNote: tuneKeyId }).map(
    (n) => n.sharpNoteName,
  );
  const shapeRootSharpNote =
    shapeSemitoneOffsetFromC !== null
      ? NOTES_SHARP[shapeSemitoneOffsetFromC % 12]
      : null;
  const lockedShapeNotes = useShapeCoordinates(shapeVariantLocationData_locked);

  const isActiveNote = activeNoteId === noteId;
  const isShapeRootNote =
    shapeRootSharpNote === sharpNoteName && stringIndex > 1 && !isPlaying;
  const isShapeNote = isShapeNoteFn(currentCoordinates, shapeCoordintes);
  const isLockedNote = isShapeNoteFn(currentCoordinates, lockedShapeNotes);
  const isTuneNote = useInTuneSharpNoteNames().includes(sharpNoteName);

  const isVisibleInGeneralMode =
    !isShapeSelected && (isActiveNote || isTuneNote || !shouldMarkTuneNotes);
  const isVisibleInSelectionMode = isShapeNote || isShapeRootNote;
  const isSemiVisible = isActiveNote || isTuneNote || !shouldMarkTuneNotes;

  const getOpacity = () => {
    if (isVisibleInSelectionMode || isVisibleInGeneralMode) return 1;
    if (isSemiVisible) return 0.5;
    return 0;
  };

  return {
    isActiveNote,
    isShapeRootNote,
    isShapeNote,
    isLockedNote,
    isTuneNote,
    opacity: getOpacity(),
    cursor: isShapeRootNote ? "pointer" : "default",
    brightness: isActiveNote ? 3 : 1,
  };
};

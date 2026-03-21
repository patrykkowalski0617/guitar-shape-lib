import { useMusicStore, usePlayerStore } from "@/store";
import { type NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote as isShapeNoteFn } from "../helpers";
import { useFretboardStates } from "./useFretboardStates";
import { useBaseChordCoords } from "./useBaseChordCoords";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import {
  useEnharmonicNoteName,
  useBaseChordsNames,
  useShapeRootSharpNote,
} from "@/hooks";

interface UseNoteStateProps {
  noteData: NoteObject;
  stringIndex: StringIndex;
  fretIndex: number;
}

export const useNoteState = ({
  noteData,
  stringIndex,
  fretIndex,
}: UseNoteStateProps) => {
  const baseChordCellsCoords = useBaseChordCoords();
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const shapeVariantLocationData_locked = useMusicStore(
    (state) => state.shapeVariantLocationData_locked,
  );
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const { isRoleSelected, isShapeSelected, shouldMarkTuneNotes } =
    useFretboardStates();
  const allShapesCoordinates = useShapeAllCoordinates();
  const shapeCoordinates = useShapeCoordinates(shapeVariantLocationData);

  const currentCoordinates: [number, number] = [stringIndex, fretIndex];
  const shapeCoordintes = shapeVariantLocationData
    ? shapeCoordinates
    : allShapesCoordinates;
  const lockedShapeCoordinates = useShapeCoordinates(
    shapeVariantLocationData_locked,
  );

  const currentPointIndex = baseChordCellsCoords.findIndex(
    ([targetString, targetFret]: number[]) =>
      targetString === stringIndex && targetFret === fretIndex,
  );

  const isBaseChordNote = currentPointIndex !== -1 && !isRoleSelected;
  const indexToSemitonMap = [0, 2, 4, 5, 7, 9];
  const getBaseChordName = useBaseChordsNames();

  const shapeRootSharpNote = useShapeRootSharpNote();
  const isActiveNote = activeNoteId === noteData.noteId;
  const isShapeRootNote =
    shapeRootSharpNote === noteData.sharpNoteName && !isPlaying;

  const isShapeNote = isShapeNoteFn(currentCoordinates, shapeCoordintes);

  const isLockedNote = isShapeNoteFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const isTuneNote = useInTuneSharpNoteNames().includes(noteData.sharpNoteName);

  const getOpacity = () => {
    const isVisibleInGeneralMode =
      !isShapeSelected && (isActiveNote || isTuneNote || !shouldMarkTuneNotes);
    const isVisibleInSelectionMode = isShapeNote || isShapeRootNote;
    const isSemiVisible = isActiveNote || isTuneNote || !shouldMarkTuneNotes;

    if (isVisibleInSelectionMode || isVisibleInGeneralMode) return 1;
    if (isSemiVisible) return 0.5;
    return 0;
  };
  return {
    isActiveNote,
    isShapeNote,
    isLockedNote,
    isBaseChordNote,
    noteLabel: isBaseChordNote
      ? getBaseChordName({
          semitoneOffsetFromC: indexToSemitonMap[currentPointIndex],
        })
      : getEnharmonicNoteName(noteData),
    opacity: getOpacity(),
    brightness: isActiveNote ? 3 : 1,
  };
};

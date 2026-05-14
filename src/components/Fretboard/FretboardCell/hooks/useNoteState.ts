import { useMusicStore } from "@/store";
import { type NoteObject } from "@/utils";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeCell as isShapeCellFn } from "../helpers/isShapeCell";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import { useEnharmonicNoteName } from "@/hooks";
import { useBaseChordShapes } from "./useBaseChordShapes";
import { findMatchingBaseChord } from "../helpers/findMatchingBaseChord";
import { isBaseChordCell as isBaseChordCellFn } from "../helpers/isBaseChordCell";
import { type FretboardCoordinate } from "@/data";
import { type StringIndexes } from "../../constants";

interface UseNoteStateProps {
  noteData: NoteObject;
  stringIndex: StringIndexes;
  fretIndex: number;
}

export const useNoteState = ({
  noteData,
  stringIndex,
  fretIndex,
}: UseNoteStateProps) => {
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const shapeVariantDataKeys_locked = useMusicStore(
    (state) => state.shapeVariantDataKeys_locked,
  );
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );

  const allShapesCoordinates = useShapeAllCoordinates();
  const shapeCoordinates = useShapeCoordinates(shapeVariantDataKeys);
  const { baseChordCoordinates } = useBaseChordShapes();
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const currentCoordinates: FretboardCoordinate = [stringIndex, fretIndex];

  const finalShapeCoordinates = shapeVariantDataKeys
    ? shapeCoordinates
    : allShapesCoordinates;

  const lockedShapeCoordinates = useShapeCoordinates(
    shapeVariantDataKeys_locked,
  ) as FretboardCoordinate[];

  const isActiveNote = activeNoteId === noteData.noteId;
  const isShapeCell = isShapeCellFn(
    currentCoordinates,
    finalShapeCoordinates as FretboardCoordinate[],
  );
  const isLockedNote = isShapeCellFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const isActiveLockedNotes = activeLockedNoteIds.includes(noteData.noteId);

  const baseChordMatch = findMatchingBaseChord({
    baseChordCoordinates,
    shapeCoordinates,
  });

  const matchingBaseChordCoordinates = shapeVariantDataKeys && baseChordMatch;

  const isBaseChordCell =
    !!matchingBaseChordCoordinates &&
    isBaseChordCellFn({
      matchingBaseChordCoordinates,
      stringIndex,
      fretIndex,
    });

  return {
    isVisible: isShapeCell || isActiveNote || isActiveLockedNotes,
    isShapeCell,
    isLockedNote,
    isBaseChordCell,
    noteLabel: getEnharmonicNoteName(noteData),
    matchingBaseChordCoordinates,
  };
};

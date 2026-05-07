import { useMusicStore } from "@/store";
import { type NoteObject } from "@/utils";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote as isShapeNoteFn } from "../helpers";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import { useEnharmonicNoteName } from "@/hooks";
import { useBaseChordShapes } from "./useBaseChordShapes";
import { findMatchingBaseChordCoordinates } from "../helpers/findMatchingBaseChordCoordinates";
import { isBaseChordNote as isBaseChordNoteFn } from "../helpers/isBaseChordNote";
import { type FretboardCoordinate } from "@/data";
import { type StringIndex } from "../../constants";

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
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const shapeVariantLocationData_locked = useMusicStore(
    (state) => state.shapeVariantLocationData_locked,
  );
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );

  const allShapesCoordinates = useShapeAllCoordinates();
  const shapeCoordinates = useShapeCoordinates(shapeVariantLocationData);
  const { baseChordCoordinates } = useBaseChordShapes();
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const currentCoordinates: FretboardCoordinate = [stringIndex, fretIndex];

  const finalShapeCoordinates = shapeVariantLocationData
    ? shapeCoordinates
    : allShapesCoordinates;

  const lockedShapeCoordinates = useShapeCoordinates(
    shapeVariantLocationData_locked,
  ) as FretboardCoordinate[];

  const isActiveNote = activeNoteId === noteData.noteId;
  const isShapeNote = isShapeNoteFn(
    currentCoordinates,
    finalShapeCoordinates as FretboardCoordinate[],
  );
  const isLockedNote = isShapeNoteFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const isActiveLockedNotes = activeLockedNoteIds.includes(noteData.noteId);

  const baseChordMatch = findMatchingBaseChordCoordinates({
    baseChordCoordinates,
    shapeCoordinates,
  });

  const matchingBaseChordCoordinates =
    shapeVariantLocationData && baseChordMatch;

  const isBaseChordNote =
    !!matchingBaseChordCoordinates &&
    isBaseChordNoteFn({
      matchingBaseChordCoordinates,
      stringIndex,
      fretIndex,
    });

  return {
    isVisible: isShapeNote || isActiveNote || isActiveLockedNotes,
    isShapeNote,
    isLockedNote,
    isBaseChordNote,
    noteLabel: getEnharmonicNoteName(noteData),
    matchingBaseChordCoordinates,
  };
};

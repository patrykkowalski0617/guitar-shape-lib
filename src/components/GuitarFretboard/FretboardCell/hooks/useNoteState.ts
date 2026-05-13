import { useMusicStore } from "@/store";
import { type NoteObject } from "@/utils";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import { useEnharmonicNoteName } from "@/hooks";
import { type FretboardCoordinate } from "@/data";
import { type StringIndexes } from "../../constants";
import { isShapeCell as isShapeCellFn } from "../../FretboardRow/helpers";

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
  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const shapeVariantDataKeys_locked = useMusicStore(
    (state) => state.shapeVariantDataKeys_locked,
  );

  const allShapesCoordinates = useShapeAllCoordinates();
  const shapeCoordinates = useShapeCoordinates(shapeVariantDataKeys);
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const currentCoordinates: FretboardCoordinate = [stringIndex, fretIndex];

  const finalShapeCoordinates = shapeVariantDataKeys
    ? shapeCoordinates
    : allShapesCoordinates;

  const lockedShapeCoordinates = useShapeCoordinates(
    shapeVariantDataKeys_locked,
  ) as FretboardCoordinate[];

  const isShapeCell = isShapeCellFn(
    currentCoordinates,
    finalShapeCoordinates as FretboardCoordinate[],
  );
  const isLockedNote = isShapeCellFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const matchingBaseChordCoordinates = shapeVariantDataKeys;

  return {
    isShapeCell,
    isLockedNote,
    noteLabel: getEnharmonicNoteName(noteData),
    matchingBaseChordCoordinates,
  };
};

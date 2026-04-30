import { useMusicStore } from "@/store";
import { type NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote as isShapeNoteFn } from "../helpers";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import { useEnharmonicNoteName } from "@/hooks";
import { useBaseChordShapes } from "./useBaseChordShapes";
import {
  findMatchingBaseChordCoordinates,
  type MatcherParams,
} from "../helpers/findMatchingBaseChordCoordinates";
import { isBaseChordNote as isBaseChordNoteFn } from "../helpers/isBaseChordNote";
import type { FretboardCoordinate } from "@/data";

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
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);

  const getEnharmonicNoteName = useEnharmonicNoteName();

  const allShapesCoordinates = useShapeAllCoordinates();
  const shapeCoordinates = useShapeCoordinates(shapeVariantLocationData);

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

  if (isShapeNote) {
    console.log(noteData.noteId);
  }

  const isLockedNote = isShapeNoteFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const isActiveLockedNotes = activeLockedNotes.includes(noteData.noteId);

  const { baseChordCoordinates } = useBaseChordShapes();
  const matchingBaseChordCoordinates =
    shapeVariantLocationData &&
    findMatchingBaseChordCoordinates({
      baseChordCoordinates,
      shapeCoordinates,
    } as MatcherParams);

  let isBaseChordNote: boolean = false;

  if (matchingBaseChordCoordinates) {
    isBaseChordNote = isBaseChordNoteFn({
      matchingBaseChordCoordinates,
      stringIndex,
      fretIndex,
    });
  }

  return {
    isVisible: isShapeNote || isActiveNote || isActiveLockedNotes,
    isLockedNote,
    isBaseChordNote,
    noteLabel: getEnharmonicNoteName(noteData),
    matchingBaseChordCoordinates,
  };
};

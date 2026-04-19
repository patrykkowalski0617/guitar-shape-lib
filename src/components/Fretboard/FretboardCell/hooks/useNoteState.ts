import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { type NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote as isShapeNoteFn } from "../helpers";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import { useEnharmonicNoteName, useShapeRootSharpNote } from "@/hooks";
import { useBaseChordShapes } from "./useBaseChordShapes";
import {
  findMatchingBaseChordCoordinates,
  type MatcherParams,
} from "../helpers/findMatchingBaseChordCoordinates";
import { isBaseChordNote as isBaseChordNoteFn } from "../helpers/isBaseChordNote";
import type { Opacity } from "../parts";
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
  const shapeId = useControlsStore((state) => state.shapeId);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
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

  const shapeRootSharpNote = useShapeRootSharpNote();
  const isActiveNote = activeNoteId === noteData.noteId;
  const isShapeRootNote =
    shapeRootSharpNote === noteData.sharpNoteName && !isPlaying;

  const isShapeNote = isShapeNoteFn(
    currentCoordinates,
    finalShapeCoordinates as FretboardCoordinate[],
  );

  const isLockedNote = isShapeNoteFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const isTuneNote = useInTuneSharpNoteNames().includes(noteData.sharpNoteName);

  const isActiveLockedNotes = activeLockedNotes.includes(noteData.noteId);

  const isHighlighted = isShapeNote || isActiveNote || isActiveLockedNotes;

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

  const getOpacity = () => {
    const isSemiVisible = isActiveNote || isTuneNote;
    const isVisibleInGeneralMode = !shapeId && isSemiVisible;
    const isVisibleInSelectionMode = isShapeNote || isShapeRootNote;

    if (
      isVisibleInSelectionMode ||
      isVisibleInGeneralMode ||
      isActiveLockedNotes ||
      isBaseChordNote
    )
      return "max";
    if (isSemiVisible) return "medium";
    return "min";
  };

  return {
    isHighlighted,
    isLockedNote,
    isBaseChordNote,
    noteLabel: getEnharmonicNoteName(noteData),
    opacity: getOpacity() as Opacity,
    matchingBaseChordCoordinates,
  };
};

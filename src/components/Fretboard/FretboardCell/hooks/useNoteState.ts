import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { type NoteObject } from "@/utils";
import type { StringIndex } from "@/components/Fretboard/FretboardRow/FretboardRow";
import { useInTuneSharpNoteNames } from "./useInTuneSharpNoteNames";
import { useShapeCoordinates } from "./useShapeCoordinates";
import { isShapeNote as isShapeNoteFn } from "../helpers";
import { useShapeAllCoordinates } from "./useShapeAllCoordinates";
import { useEnharmonicNoteName, useShapeRootSharpNote } from "@/hooks";
import { useBaseChordCoordinates } from "./useBaseChordCoordinates";

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

  const currentCoordinates: [number, number] = [stringIndex, fretIndex];

  const finalShapeCoordinates = shapeVariantLocationData
    ? shapeCoordinates
    : allShapesCoordinates;
  const lockedShapeCoordinates = useShapeCoordinates(
    shapeVariantLocationData_locked,
  );

  const shapeRootSharpNote = useShapeRootSharpNote();
  const isActiveNote = activeNoteId === noteData.noteId;
  const isShapeRootNote =
    shapeRootSharpNote === noteData.sharpNoteName && !isPlaying;

  const isShapeNote = isShapeNoteFn(currentCoordinates, finalShapeCoordinates);

  const isLockedNote = isShapeNoteFn(
    currentCoordinates,
    lockedShapeCoordinates,
  );

  const isTuneNote = useInTuneSharpNoteNames().includes(noteData.sharpNoteName);

  const isActiveLockedNotes = activeLockedNotes.includes(noteData.noteId);

  const getOpacity = () => {
    const isSemiVisible = isActiveNote || isTuneNote;
    const isVisibleInGeneralMode = !shapeId && isSemiVisible;
    const isVisibleInSelectionMode = isShapeNote || isShapeRootNote;

    if (
      isVisibleInSelectionMode ||
      isVisibleInGeneralMode ||
      isActiveLockedNotes
    )
      return 1;
    if (isSemiVisible) return 0.7;
    return 0;
  };

  const isHighlighted = isShapeNote || isActiveNote || isActiveLockedNotes;

  useBaseChordCoordinates(shapeCoordinates);

  return {
    isHighlighted,
    isLockedNote,
    noteLabel: getEnharmonicNoteName(noteData),
    opacity: getOpacity(),
  };
};

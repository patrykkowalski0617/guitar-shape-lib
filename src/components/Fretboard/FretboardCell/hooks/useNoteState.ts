import { useControlsStore, useMusicStore } from "@/store";
import { getNotes, type NoteObject } from "@/utils";
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
import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type FretboardCoordinate,
} from "@/data";
import { STRINGS_CONFIG } from "../../FretboardRow/helpers/constants";

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
  const setBassNote = useMusicStore((state) => state.setBassNote);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const shapeVariantLocationData_locked = useMusicStore(
    (state) => state.shapeVariantLocationData_locked,
  );
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const allShapesCoordinates = useShapeAllCoordinates();
  const shapeCoordinates = useShapeCoordinates(shapeVariantLocationData);
  const { baseChordCoordinates } = useBaseChordShapes();
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);
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

  const isActiveLockedNotes = activeLockedNotes.includes(noteData.noteId);
  const baseChordMatch = findMatchingBaseChordCoordinates({
    baseChordCoordinates,
    shapeCoordinates,
  } as MatcherParams);

  const matchingBaseChordCoordinates =
    shapeVariantLocationData && baseChordMatch;

  let isBaseChordNote: boolean = false;

  if (matchingBaseChordCoordinates) {
    isBaseChordNote = isBaseChordNoteFn({
      matchingBaseChordCoordinates,
      stringIndex,
      fretIndex,
    });
  }

  const setBassNoteToStore = () => {
    if (
      !baseChordMatch ||
      !shapeVariantLocationData ||
      !tuneKeyId ||
      !baseChordId
    )
      return;
    const { baseStringIndex, baseFretIndex } = baseChordMatch;

    const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
    const baseChordOffsetFromC =
      BASE_CHORDS[baseChordId].semitoneOffsetFromMajorScaleRoot - 12;
    let bassNoteFretIndex =
      baseFretIndex + tuneKeyOffset + baseChordOffsetFromC;

    bassNoteFretIndex =
      bassNoteFretIndex < 0
        ? bassNoteFretIndex + 12
        : bassNoteFretIndex > 24
          ? bassNoteFretIndex - 12
          : bassNoteFretIndex;

    const notes = getNotes({
      firstNote: STRINGS_CONFIG[baseStringIndex].firstNoteInRow,
      length: 24,
      firstOctave: STRINGS_CONFIG[baseStringIndex].firstNoteOctaveNumber,
    });
    const bassNoteId = notes[bassNoteFretIndex].noteId;

    setBassNote(bassNoteId);
  };
  setBassNoteToStore();

  return {
    isVisible: isShapeNote || isActiveNote || isActiveLockedNotes,
    isShapeNote,
    isLockedNote,
    isBaseChordNote,
    noteLabel: getEnharmonicNoteName(noteData),
    matchingBaseChordCoordinates,
  };
};

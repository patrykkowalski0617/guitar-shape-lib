import { useControlsStore } from "@/store";
import {
  shapes,
  type Shape,
  harmonicMinorScale,
  majorScale,
  minorScale,
  UNIFIED_MUSIC_KEYS,
  type Note,
  BASE_CHORDS_MAP,
} from "@/data";
import { matchShapeNotesToRoleNotes } from "../../helpers/matchShapeNotesToRoleNotes";
import { getNotes } from "@/utils";

export const useScaleLogic = () => {
  const { baseChordId, tuneKeyId, shapeId, shapeSemitoneOffsetFromC } =
    useControlsStore();

  const FIRST_OCTAVE_NO_FOR_PRESENTATION = 3;
  const PRESENTATION_SCALE_LENGTH = 36;

  const currentMusicKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  const currentMajorFirstNote: Note = currentMusicKey.majorFirstNote;
  const currentRelativeMinorFirstNote: Note =
    currentMusicKey.relativeMinorFirstNote;
  const currentMajorRootOffsetFromC: number = currentMusicKey.offsetFromC;

  const isMajorMode = baseChordId
    ? BASE_CHORDS_MAP[baseChordId].isMajorMode
    : true;

  const currentScaleTemplate = isMajorMode
    ? majorScale
    : !isMajorMode && baseChordId !== "Domi"
      ? minorScale
      : harmonicMinorScale;

  const currentShape: Shape | null = shapes && shapeId ? shapes[shapeId] : null;

  const allNotesFromMajorRoot = getNotes({
    firstNote: currentMajorFirstNote,
    firstOctave: FIRST_OCTAVE_NO_FOR_PRESENTATION,
    length: PRESENTATION_SCALE_LENGTH,
  });

  const relativeMinorOctaveBase =
    currentMajorRootOffsetFromC >= 3
      ? FIRST_OCTAVE_NO_FOR_PRESENTATION
      : FIRST_OCTAVE_NO_FOR_PRESENTATION - 1;

  const isMinorTonicMode = baseChordId === "tonic";
  const minorStartingOctave = isMinorTonicMode
    ? relativeMinorOctaveBase + 1
    : relativeMinorOctaveBase;

  const allNotesFromNearestRelativeMinorRoot = getNotes({
    firstNote: currentRelativeMinorFirstNote,
    firstOctave: minorStartingOctave,
    length: PRESENTATION_SCALE_LENGTH,
  });

  const getOnlyScaleNotesIds = (scaleTemplate: number[]) => {
    const allNotes = isMajorMode
      ? allNotesFromMajorRoot
      : allNotesFromNearestRelativeMinorRoot;

    return allNotes
      .filter((_, index) => scaleTemplate.includes(index % 12))
      .map(({ noteId }) => noteId);
  };

  const currentScaleNoteIdsLength =
    baseChordId === "tonic" || baseChordId === "Tonic"
      ? 13
      : baseChordId === "subdomi" || baseChordId === "Subdomi"
        ? 16
        : baseChordId === "Domi"
          ? 17
          : 7;

  const currentScaleNoteIds = getOnlyScaleNotesIds(currentScaleTemplate).slice(
    0,
    currentScaleNoteIdsLength,
  );

  const roleIntervalOffset =
    baseChordId === "tonic" || baseChordId === "Tonic"
      ? 0
      : baseChordId === "subdomi" || baseChordId === "Subdomi"
        ? 3
        : 4;

  const currentRoleNoteIds = baseChordId
    ? [...currentScaleNoteIds]
        .splice(roleIntervalOffset)
        .filter((_, i) => (i + 1) % 2)
        .slice(0, 7)
    : [];

  let currentShapeNoteIds: string[] = [];
  if (currentShape && shapeSemitoneOffsetFromC !== null) {
    const shapeIntervals = currentShape.intervals;
    const shapeSharpNoteIds = allNotesFromMajorRoot
      .slice(shapeSemitoneOffsetFromC)
      .filter((_, i) => shapeIntervals.includes(i))
      .map(({ noteId }) => noteId);

    currentShapeNoteIds = matchShapeNotesToRoleNotes(
      currentRoleNoteIds,
      shapeSharpNoteIds,
    );
  }

  return { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds };
};

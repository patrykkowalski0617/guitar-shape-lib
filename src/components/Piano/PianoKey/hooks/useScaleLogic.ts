import { useControlsStore } from "@/store";
import {
  shapes,
  type Shape,
  harmonicMinorScale,
  majorScale,
  minorScale,
  UNIFIED_MUSIC_KEYS,
} from "@/data";
import { matchShapeNotesToRoleNotes } from "../../helpers/matchShapeNotesToRoleNotes";
import { isGlobalRole, getNotes } from "@/utils";
import { type Note } from "@/data";

export const useScaleLogic = () => {
  const { isMajorMode, tuneKeyId, roleId, shapeId, shapeSemitoneOffsetFromC } =
    useControlsStore();

  const FIRST_OCTAVE_NO_FOR_PRESENTATION = 3;
  const PRESENTATION_SCALE_LENGTH = 36;

  const currentMusicKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  const currentMajorFirstNote: Note = currentMusicKey.majorFirstNote;
  const currentRelativeMinorFirstNote: Note =
    currentMusicKey.relativeMinorFirstNote;
  const currentMajorRootOffsetFromC: number = currentMusicKey.offsetFromC;
  const currentScaleTemplate = isMajorMode
    ? majorScale
    : !isMajorMode && roleId !== "dominant"
      ? minorScale
      : harmonicMinorScale;
  const currentShape: Shape | null = shapes && shapeId ? shapes[shapeId] : null;

  const allNotesFromMajorRoot = getNotes({
    firstNote: currentMajorFirstNote,
    firstOctave: FIRST_OCTAVE_NO_FOR_PRESENTATION,
    length: PRESENTATION_SCALE_LENGTH,
  });

  const relativeMinorOctave =
    currentMajorRootOffsetFromC >= 3
      ? FIRST_OCTAVE_NO_FOR_PRESENTATION
      : FIRST_OCTAVE_NO_FOR_PRESENTATION - 1;

  console.log({ currentMajorRootOffsetFromC, relativeMinorOctave });

  const allNotesFromNearestRelativeMinorRoot = getNotes({
    firstNote: currentRelativeMinorFirstNote,
    firstOctave:
      !isMajorMode && roleId === "tonic"
        ? relativeMinorOctave + 1
        : relativeMinorOctave,
    length: PRESENTATION_SCALE_LENGTH,
  });

  const getOnlyScaleNotesIds = (scaleTemplate: number[]) => {
    const allNotes = isMajorMode
      ? allNotesFromMajorRoot
      : allNotesFromNearestRelativeMinorRoot;
    console.log(allNotes);

    return allNotes
      .filter((_, index) => scaleTemplate.includes(index % 12))
      .map(({ noteId }) => noteId);
  };

  const currentScaleNoteIdsLength =
    roleId === "tonic"
      ? 13
      : roleId === "subdominant"
        ? 16
        : roleId === "dominant"
          ? 17
          : 7;

  const currentScaleNoteIds = getOnlyScaleNotesIds(currentScaleTemplate).slice(
    0,
    currentScaleNoteIdsLength,
  );

  const roleIntervalOffeset =
    roleId === "tonic" || roleId === "all-one-instance"
      ? 0
      : roleId === "subdominant"
        ? 3
        : 4;

  const currentRoleNoteIds = !isGlobalRole(roleId)
    ? [...currentScaleNoteIds]
        .splice(roleIntervalOffeset)
        .filter((_, i) => (i + 1) % 2)
        .slice(0, 7)
    : [];

  let currentShapeNoteIds: string[] = [];
  if (currentShape && shapeSemitoneOffsetFromC !== null) {
    const shapeIntervals = currentShape.intervals;
    const shapeSharpNoteId = allNotesFromMajorRoot
      .slice(shapeSemitoneOffsetFromC)
      .filter((_, i) => shapeIntervals.includes(i))
      .map(({ noteId }) => noteId);

    currentShapeNoteIds = matchShapeNotesToRoleNotes(
      currentRoleNoteIds,
      shapeSharpNoteId,
    );
  }

  return { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds };
};

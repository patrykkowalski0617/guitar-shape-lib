import { useControlsStore } from "@/store";
import {
  shapes,
  type Shape,
  harmonicMinorScale,
  majorScale,
  minorScale,
  UNIFIED_MUSIC_KEYS,
  isGlobalRole,
} from "@/data";
import { matchShapeNotesToRoleNotes } from "./matchShapeNotesToRoleNotes";
import { getNotes } from "@/utils";
import { type Note } from "@/data";

export const useScaleLogic = () => {
  const { isMajorMode, currentKeyId, currentRoleId, currentShapeId, currentShapeSemitoneOffsetFromC } =
    useControlsStore();

  const FIRST_OCTAVE_NO_FOR_PRESENTATION = 3;
  const PRESENTATION_SCALE_LENGTH = 36;

  const currentMusicKey = UNIFIED_MUSIC_KEYS[currentKeyId];
  const currentMajorFirstNote: Note = currentMusicKey.majorFirstNote;
  const currentRelativeMinorFirstNote: Note = currentMusicKey.relativeMinorFirstNote;
  const currentMajorRootOffsetFromC: number = currentMusicKey.offsetFromC;
  const currentScaleTemplate = isMajorMode
    ? majorScale
    : !isMajorMode && currentRoleId !== "dominant"
      ? minorScale
      : harmonicMinorScale;
  const currentShape: Shape | null = shapes && currentShapeId ? shapes[currentShapeId] : null;

  const allNotesFromMajorRoot = getNotes({
    firstNote: currentMajorFirstNote,
    firstOctave: FIRST_OCTAVE_NO_FOR_PRESENTATION,
    length: PRESENTATION_SCALE_LENGTH,
  });

  const relativeMinorOctave =
    currentMajorRootOffsetFromC >= 3 ? FIRST_OCTAVE_NO_FOR_PRESENTATION : FIRST_OCTAVE_NO_FOR_PRESENTATION - 1;

  const allNotesFromNearestRelativeMinorRoot = getNotes({
    firstNote: currentRelativeMinorFirstNote,
    firstOctave: relativeMinorOctave,
    length: PRESENTATION_SCALE_LENGTH,
  });

  const getOnlyScaleNotesIds = (scaleTemplate: number[]) => {
    const allNotes = isMajorMode ? allNotesFromMajorRoot : allNotesFromNearestRelativeMinorRoot;
    return allNotes.filter((_, index) => scaleTemplate.includes(index % 12)).map(({ noteId }) => noteId);
  };

  const currentScaleNoteIdsLength =
    currentRoleId === "tonic" ? 13 : currentRoleId === "subdominant" ? 16 : currentRoleId === "dominant" ? 17 : 7;

  const currentScaleNoteIds = getOnlyScaleNotesIds(currentScaleTemplate).slice(0, currentScaleNoteIdsLength);

  const roleIntervalOffeset =
    currentRoleId === "tonic" || currentRoleId === "all-one-instance" ? 0 : currentRoleId === "subdominant" ? 3 : 4;

  const currentRoleNoteIds = !isGlobalRole(currentRoleId)
    ? [...currentScaleNoteIds]
        .splice(roleIntervalOffeset)
        .filter((_, i) => (i + 1) % 2)
        .slice(0, 7)
    : [];

  let currentShapeNoteIds: string[] = [];
  if (currentShape && currentShapeSemitoneOffsetFromC !== null) {
    const shapeIntervals = currentShape.intervals;
    const shapeSharpNoteId = allNotesFromMajorRoot
      .slice(currentShapeSemitoneOffsetFromC)
      .filter((_, i) => shapeIntervals.includes(i))
      .map(({ noteId }) => noteId);

    currentShapeNoteIds = matchShapeNotesToRoleNotes(currentRoleNoteIds, shapeSharpNoteId);
  }

  return { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds };
};

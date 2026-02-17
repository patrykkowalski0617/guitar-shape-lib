import { useControlsStore } from "@/store/useControlsStore";
import { shapes, type Shape, hramonicMinorScale, majorScale, minorScale, UNIFIED_MUSIC_KEYS } from "@/data";
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
      : hramonicMinorScale;
  const currentShape: Shape | null = shapes && currentShapeId ? shapes[currentShapeId] : null;

  //- >>>> getting scale note ids (currentScaleNoteIds)
  const getAllNotesFromMajorRoot = (firstOctave: number, length: number, firstNote: Note) =>
    getNotes({
      firstNote,
      firstOctave,
      length,
    });

  const getAllNotesFromNearestRelativeMinorRoot = (
    relativeMajorFirstOctave: number,
    length: number,
    majorRootOffsetFromC: number,
    firstNote: Note,
  ) => {
    const firstOctave = majorRootOffsetFromC >= 3 ? relativeMajorFirstOctave : relativeMajorFirstOctave - 1;
    return getNotes({
      firstNote,
      firstOctave,
      length,
    });
  };

  const allNotesFromMajorRoot = getAllNotesFromMajorRoot(
    FIRST_OCTAVE_NO_FOR_PRESENTATION,
    PRESENTATION_SCALE_LENGTH,
    currentMajorFirstNote,
  );
  const allNotesFromNearestRelativeMinorRoot = getAllNotesFromNearestRelativeMinorRoot(
    FIRST_OCTAVE_NO_FOR_PRESENTATION,
    PRESENTATION_SCALE_LENGTH,
    currentMajorRootOffsetFromC,
    currentRelativeMinorFirstNote,
  );

  const getOnlyScaleNotesIds = (scaleTemplate: number[]) => {
    const allNotes = isMajorMode ? allNotesFromMajorRoot : allNotesFromNearestRelativeMinorRoot;

    return allNotes.filter((_, index) => scaleTemplate.includes(index % 12)).map(({ noteId }) => noteId);
  };

  const currentScaleNoteIdsLength =
    currentRoleId === "tonic" ? 13 : currentRoleId === "subdominant" ? 16 : currentRoleId === "dominant" ? 17 : 7;

  const currentScaleNoteIds = getOnlyScaleNotesIds(currentScaleTemplate).slice(0, currentScaleNoteIdsLength);

  //- >>>> getting role note ids (currentRoleNoteIds)
  const roleIntervalOffeset =
    currentRoleId === "tonic" || currentRoleId === "all" ? 0 : currentRoleId === "subdominant" ? 3 : 4;

  const currentRoleNoteIds = [...currentScaleNoteIds]
    .splice(roleIntervalOffeset)
    .filter((_, i) => (i + 1) % 2)
    .slice(0, 7);

  //- >>>> geting shape note ids (currentShapeNoteIds)
  let currentShapeNoteIds: string[] = [];
  if (currentShape && currentShapeSemitoneOffsetFromC !== null) {
    const shapeIntervals = currentShape?.intervals;
    const shapeSharpNoteId = allNotesFromMajorRoot
      .slice(currentShapeSemitoneOffsetFromC)
      .filter((_, i) => shapeIntervals.includes(i))
      .map(({ noteId }) => noteId);

    currentShapeNoteIds = matchShapeNotesToRoleNotes(currentRoleNoteIds, shapeSharpNoteId);
  }

  return { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds };
};

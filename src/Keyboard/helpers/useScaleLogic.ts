import { useControlsStore } from "@/store/useControlsStore";
import {
  getNotes,
  hramonicMinorScale,
  majorScale,
  minorScale,
  UNIFIED_MUSIC_KEYS,
  type Note,
} from "@/utils";
import shapes, { type Shape } from "@/utils/shapes";

export type HighlightRole = "tonic" | "subdominant" | "dominant" | "none";

export const useScaleLogic = () => {
  const { isMajorMode, currentKeyId, currentRoleId, currentShapeId, currentShapeOffset } =
    useControlsStore();

  const FIRST_OCTAVE_NO_FOR_PRESENTATION = 3;
  const presentationScaleLength = 36;

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
    const firstOctave =
      majorRootOffsetFromC >= 3 ? relativeMajorFirstOctave : relativeMajorFirstOctave - 1;
    return getNotes({
      firstNote,
      firstOctave,
      length,
    });
  };

  const allNotesFromMajorRoot = getAllNotesFromMajorRoot(
    FIRST_OCTAVE_NO_FOR_PRESENTATION,
    presentationScaleLength,
    currentMajorFirstNote,
  );
  const allNotesFromNearestRelativeMinorRoot = getAllNotesFromNearestRelativeMinorRoot(
    FIRST_OCTAVE_NO_FOR_PRESENTATION,
    presentationScaleLength,
    currentMajorRootOffsetFromC,
    currentRelativeMinorFirstNote,
  );

  const getOnlyScaleNotesIds = (scaleTemplate: number[]) => {
    const allNotes = isMajorMode ? allNotesFromMajorRoot : allNotesFromNearestRelativeMinorRoot;

    return allNotes
      .filter((_, index) => scaleTemplate.includes(index % 12))
      .map(({ noteId }) => noteId);
  };

  const currentScaleNoteIdsLength =
    currentRoleId === "tonic"
      ? 13
      : currentRoleId === "subdominant"
        ? 16
        : currentRoleId === "dominant"
          ? 17
          : 7;

  const currentScaleNoteIds = getOnlyScaleNotesIds(currentScaleTemplate).slice(
    0,
    currentScaleNoteIdsLength,
  );

  //- >>>> getting role note ids (currentRoleNoteIds)
  const roleIntervalOffeset =
    currentRoleId === "tonic" ? 0 : currentRoleId === "subdominant" ? 3 : 4;
  const currentRoleNoteIds = [...currentScaleNoteIds]
    .splice(roleIntervalOffeset)
    .filter((_, i) => (i + 1) % 2)
    .slice(0, 7);

  //- >>>> geting shape note id (currentShapeNoteIds)
  let currentShapeNoteIds: string[] = [];
  if (currentShape && currentShapeOffset !== null) {
    const shapeIntervals = currentShape?.intervals;
    const shapeSharpNoteId = allNotesFromMajorRoot
      .slice(currentShapeOffset)
      .filter((_, i) => shapeIntervals.includes(i))
      .map(({ noteId }) => noteId);

    const matchNotesToTarget = (target: string[], input: string[]): string[] => {
      const inputPool = [...input];

      const getNoteName = (note: string) => note.split("-")[0];
      const matchedFromTarget = target.reduce<string[]>((acc, targetNote) => {
        const targetName = getNoteName(targetNote);
        const foundIndex = inputPool.findIndex((n) => getNoteName(n) === targetName);

        if (foundIndex !== -1) {
          acc.push(targetNote);
          inputPool.splice(foundIndex, 1);
        }

        return acc;
      }, []);

      return [...matchedFromTarget, ...inputPool];
    };

    currentShapeNoteIds = matchNotesToTarget(currentRoleNoteIds, shapeSharpNoteId);
  }

  return { currentScaleNoteIds, currentRoleNoteIds, currentShapeNoteIds };
};

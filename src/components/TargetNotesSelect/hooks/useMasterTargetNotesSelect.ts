import { useShapePlayerStore, useMasterNoteMatrixStore } from "@/store";
import { calculateMatrixData } from "../utils";
import { getIntervalName } from "../utils";

const CHORD_MEMBER_LABELS = ["1", "3", "5", "7", "9", "11", "13"];

export const useMasterTargetNotesSelect = () => {
  const bricks = useShapePlayerStore((s) => s.guitarShapePlayerBricks);
  const updateBrick = useShapePlayerStore((s) => s.updateBrick);
  const setMasterTargetNoteIndex = useMasterNoteMatrixStore(
    (s) => s.setMasterTargetNoteIndex,
  );

  const isSharedInAnyBrick = (positionInChord: number): boolean => {
    return bricks.some((brick) => {
      if (!brick.guitarShapeDataKey) return false;
      const data = calculateMatrixData(
        brick.unifiedMusicKeysDataKey,
        brick.baseChordDataKey,
        brick.guitarShapeDataKey,
        brick.semitoneOffsetFromMajorRoot,
      );
      const chordIndex = data.chordNoteIndices[positionInChord];
      if (chordIndex === undefined) return false;
      const sharpNoteName = data.sharpNoteNames[chordIndex];
      return data.guitarShapeIndices.some(
        (i) => data.sharpNoteNames[i] === sharpNoteName,
      );
    });
  };

  const isTargetInAllPossibleBricks = (positionInChord: number): boolean => {
    const possibleBricks = bricks.filter((brick) => {
      if (!brick.guitarShapeDataKey) return false;
      const data = calculateMatrixData(
        brick.unifiedMusicKeysDataKey,
        brick.baseChordDataKey,
        brick.guitarShapeDataKey,
        brick.semitoneOffsetFromMajorRoot,
      );
      const chordIndex = data.chordNoteIndices[positionInChord];
      if (chordIndex === undefined) return false;
      const sharpNoteName = data.sharpNoteNames[chordIndex];
      return data.guitarShapeIndices.some(
        (i) => data.sharpNoteNames[i] === sharpNoteName,
      );
    });

    if (possibleBricks.length === 0) return false;

    return possibleBricks.every((brick) =>
      (brick.targetNoteIndices ?? [1]).includes(positionInChord),
    );
  };

  const toggleMasterNote = (positionInChord: number) => {
    const isShared = isSharedInAnyBrick(positionInChord);
    if (!isShared) return;

    const allSet = isTargetInAllPossibleBricks(positionInChord);

    bricks.forEach((brick) => {
      if (!brick.guitarShapeDataKey) return;

      const data = calculateMatrixData(
        brick.unifiedMusicKeysDataKey,
        brick.baseChordDataKey,
        brick.guitarShapeDataKey,
        brick.semitoneOffsetFromMajorRoot,
      );
      const chordIndex = data.chordNoteIndices[positionInChord];
      if (chordIndex === undefined) return;

      const sharpNoteName = data.sharpNoteNames[chordIndex];
      const isBrickShared = data.guitarShapeIndices.some(
        (i) => data.sharpNoteNames[i] === sharpNoteName,
      );

      const current = brick.targetNoteIndices ?? [1];

      if (allSet) {
        updateBrick(brick.id, {
          targetNoteIndices: current.filter((i) => i !== positionInChord),
        });
      } else {
        if (!isBrickShared || current.includes(positionInChord)) return;
        updateBrick(brick.id, {
          targetNoteIndices: [...current, positionInChord],
        });
      }
    });

    setMasterTargetNoteIndex(allSet ? null : positionInChord);
  };

  const options = CHORD_MEMBER_LABELS.map((label, positionInChord) => ({
    positionInChord,
    label,
    intervalName: getIntervalName(positionInChord),
    isShared: isSharedInAnyBrick(positionInChord),
    isTargetNote: isTargetInAllPossibleBricks(positionInChord),
  }));

  return { options, toggleMasterNote };
};

import { useEffect, useMemo } from "react";
import { useCurrentShapeRootNote } from "@/hooks";
import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { SHAPES, type TuneKeyId, type Shapes, type BaseChordId } from "@/data";
import { useApplySnapshotToStore } from "./useApplySnapshotToStore";
import type { ShapeVariantLocationData } from "@/types";

export type Snapshot = {
  tuneKeyId: TuneKeyId;
  baseChordId: BaseChordId | null;
  shapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  semitoneOffsetFromMajorTonicRoot: number | null;
  shapeId: string | null;
};

export function usePlayerSnapshot(brickId: number, isEditable: boolean) {
  const updateBrickSnapshot = usePlayerStore(
    (state) => state.updateBrickSnapshot,
  );
  const brick = usePlayerStore((state) =>
    state.bricks.find((b) => b.id === brickId),
  );

  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const semitoneOffsetFromMajorTonicRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorTonicRoot,
  );
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const activeRootNote = useCurrentShapeRootNote();
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const applySnapshotToStore = useApplySnapshotToStore();

  const activeShape = SHAPES[shapeId as keyof Shapes] || null;

  const currentLiveState: Snapshot = useMemo(
    () => ({
      tuneKeyId: tuneKeyId,
      baseChordId,
      shapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      semitoneOffsetFromMajorTonicRoot,
      shapeId,
    }),
    [
      tuneKeyId,
      baseChordId,
      shapeVariantLocationData,
      activeRootNote,
      activeShape,
      semitoneOffsetFromMajorTonicRoot,
      shapeId,
    ],
  );

  useEffect(() => {
    if (!isEditable) {
      return;
    }

    if (!brick) {
      return;
    }

    const currentStoredSnapshot = brick.snapshot;
    const isSame =
      JSON.stringify(currentStoredSnapshot) ===
      JSON.stringify(currentLiveState);

    if (isSame) {
      return;
    }

    updateBrickSnapshot(brickId, currentLiveState);
  }, [isEditable, currentLiveState, brickId, updateBrickSnapshot, brick]);

  const displayData = isEditable
    ? currentLiveState
    : brick?.snapshot || currentLiveState;

  const lockedSnapshot = brick?.snapshot || currentLiveState;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setShapeVariantLocationData_locked(shapeVariantLocationData);

    if (!isEditable && lockedSnapshot.rootNote !== null) {
      applySnapshotToStore(lockedSnapshot);
    }
  };

  return {
    isEditable,
    displayData,
    handleClick,
    lockedSnapshot,
    applySnapshotToStore,
  };
}

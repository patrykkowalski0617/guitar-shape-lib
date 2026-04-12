import { useEffect, useMemo } from "react";
import { useShapeRootNote } from "@/hooks";
import {
  useControlsStore,
  useMusicStore,
  usePlayerStore,
  type ShapeVariantLocationData,
} from "@/store";
import { SHAPES, type TuneKeyId, type Shapes, type RoleId } from "@/data";
import { useApplySnapshotToStore } from "./useApplySnapshotToStore";

export type Snapshot = {
  keyId: TuneKeyId;
  isMajorMode: boolean;
  roleId: RoleId | null;
  shapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  shapeSemitoneOffsetFromC: number | null;
  shapeId: string | null;
};

export function usePlayerSnapshot(
  brickId: number,
  isEditable: boolean,
  onToggleEdit: () => void,
) {
  const updateBrickSnapshot = usePlayerStore(
    (state) => state.updateBrickSnapshot,
  );
  const brick = usePlayerStore((state) =>
    state.bricks.find((b) => b.id === brickId),
  );

  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const roleId = useControlsStore((state) => state.roleId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const activeRootNote = useShapeRootNote();
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const applySnapshotToStore = useApplySnapshotToStore();

  const activeShape = SHAPES[shapeId as keyof Shapes] || null;

  const currentLiveState: Snapshot = useMemo(
    () => ({
      keyId: tuneKeyId,
      isMajorMode,
      roleId,
      shapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      shapeSemitoneOffsetFromC,
      shapeId,
    }),
    [
      tuneKeyId,
      isMajorMode,
      roleId,
      shapeVariantLocationData,
      activeRootNote,
      activeShape,
      shapeSemitoneOffsetFromC,
      shapeId,
    ],
  );

  useEffect(() => {
    if (!isEditable) return;
    if (!brick) return;

    const currentSnapshot = brick.snapshot;
    const isSameSnapshot =
      JSON.stringify(currentSnapshot) === JSON.stringify(currentLiveState);
    if (isSameSnapshot) return;

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

    onToggleEdit();
  };

  return {
    isEditable,
    displayData,
    handleClick,
    lockedSnapshot,
    applySnapshotToStore,
  };
}

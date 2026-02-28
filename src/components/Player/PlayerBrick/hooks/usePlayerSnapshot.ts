import { useEffect, useMemo } from "react";
import { useShapeRootNote } from "@/hooks";
import { useControlsStore, useMusicStore, usePlayerStore, type ShapeVariantLocationData } from "@/store";
import { shapes, type MusicKeyId, type RoleId, type Shapes } from "@/data";

export type Snapshot = {
  keyId: MusicKeyId;
  isMajorMode: boolean;
  roleId: RoleId | null;
  shapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  shapeSemitoneOffsetFromC: number | null;
  shapeId: string | null;
};

export function usePlayerSnapshot(brickId: number, isEditable: boolean, onToggleEdit: () => void) {
  const updateBrickSnapshot = usePlayerStore((state) => state.updateBrickSnapshot);
  const brick = usePlayerStore((state) => state.bricks.find((b) => b.id === brickId));

  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const roleId = useControlsStore((state) => state.roleId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore((state) => state.shapeSemitoneOffsetFromC);
  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const activeRootNote = useShapeRootNote();

  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);
  const setShapeVariantLocationData_ghost = useMusicStore((state) => state.setShapeVariantLocationData_ghost);

  const activeShape = shapes[shapeId as keyof Shapes] || null;

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
    if (isEditable) {
      updateBrickSnapshot(brickId, currentLiveState);
    }
  }, [isEditable, currentLiveState, brickId, updateBrickSnapshot]);

  const displayData = isEditable ? currentLiveState : brick?.snapshot || currentLiveState;

  const lockedSnapshot = brick?.snapshot || currentLiveState;

  const applySnapshotToStore = (data: Snapshot) => {
    setShapeVariantLocationData(data.shapeVariantLocationData);
    setTuneKeyId(data.keyId);
    setRoleId(data.roleId);
    setIsMajorMode(data.isMajorMode);
    setShape(data.shapeId, data.shapeSemitoneOffsetFromC);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setShapeVariantLocationData_ghost(shapeVariantLocationData);

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

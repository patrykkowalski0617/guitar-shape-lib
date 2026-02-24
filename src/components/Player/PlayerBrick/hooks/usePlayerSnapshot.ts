import { useEffect, useMemo } from "react";
import { useShapeRootNote } from "@/hooks";
import { useControlsStore, useMusicStore, usePlayerStore, type ShapeVariantLocationData } from "@/store";
import { shapes, type MusicKeyId, type RoleId, type Shapes } from "@/data";

export type Snapshot = {
  keyId: MusicKeyId;
  isMajorMode: boolean;
  currentRoleId: RoleId | null;
  currentShapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  currentShapeSemitoneOffsetFromC: number | null;
  currentShapeId: string | null;
};

export function usePlayerSnapshot(brickId: number, isEditable: boolean, onToggleEdit: () => void) {
  const updateBrickSnapshot = usePlayerStore((state) => state.updateBrickSnapshot);
  const brick = usePlayerStore((state) => state.bricks.find((b) => b.id === brickId));

  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  const activeRootNote = useShapeRootNote();

  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const setShape = useControlsStore((state) => state.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);

  const activeShape = shapes[currentShapeId as keyof Shapes] || null;

  const currentLiveState: Snapshot = useMemo(
    () => ({
      keyId: currentKeyId,
      isMajorMode,
      currentRoleId,
      currentShapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      currentShapeSemitoneOffsetFromC,
      currentShapeId,
    }),
    [
      currentKeyId,
      isMajorMode,
      currentRoleId,
      currentShapeVariantLocationData,
      activeRootNote,
      activeShape,
      currentShapeSemitoneOffsetFromC,
      currentShapeId,
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
    setCurrentShapeVariantLocationData(data.currentShapeVariantLocationData);
    setCurrentKey(data.keyId);
    setCurrentRoleId(data.currentRoleId);
    setIsMajorMode(data.isMajorMode);
    setShape(data.currentShapeId, data.currentShapeSemitoneOffsetFromC);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (displayData.currentShapeVariantLocationData === null) {
      setLockedShapeVariantLocationData(currentShapeVariantLocationData);
    }

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

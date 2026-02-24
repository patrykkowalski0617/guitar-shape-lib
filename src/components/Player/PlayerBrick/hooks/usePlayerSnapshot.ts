import { useState } from "react";
import { useShapeRootNote } from "@/hooks/useShapeRootNote";
import { useControlsStore, useMusicStore, type ShapeVariantLocationData } from "@/store";
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

export function usePlayerSnapshot(isEditable: boolean, onToggleEdit: () => void) {
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

  const currentLiveState: Snapshot = {
    keyId: currentKeyId,
    isMajorMode,
    currentRoleId,
    currentShapeVariantLocationData,
    rootNote: activeRootNote,
    shapeLabel: activeShape?.label,
    currentShapeSemitoneOffsetFromC,
    currentShapeId,
  };

  const [lockedSnapshot, setLockedSnapshot] = useState<Snapshot>(() => ({
    ...currentLiveState,
    currentShapeVariantLocationData: null,
    rootNote: null,
    shapeLabel: undefined,
  }));

  if (isEditable) {
    if (
      lockedSnapshot.currentShapeVariantLocationData !== currentLiveState.currentShapeVariantLocationData ||
      lockedSnapshot.rootNote !== currentLiveState.rootNote ||
      lockedSnapshot.keyId !== currentLiveState.keyId
    ) {
      setLockedSnapshot({ ...currentLiveState });
    }
  }

  const displayData = isEditable ? currentLiveState : lockedSnapshot;

  const applySnapshotToStore = (data: Snapshot) => {
    setCurrentShapeVariantLocationData(data.currentShapeVariantLocationData);
    setCurrentKey(data.keyId);
    setCurrentRoleId(data.currentRoleId);
    setIsMajorMode(data.isMajorMode);
    setShape(data.currentShapeId, data.currentShapeSemitoneOffsetFromC);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isEmpty = displayData.currentShapeVariantLocationData === null;
    if (isEmpty) {
      setLockedShapeVariantLocationData(currentShapeVariantLocationData);
    }
    if (!isEditable) {
      if (lockedSnapshot.rootNote !== null) {
        applySnapshotToStore(lockedSnapshot);
      }
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

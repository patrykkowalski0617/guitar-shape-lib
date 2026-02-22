import { useState } from "react";
import { useShapeRootNote } from "@/hooks/useShapeRootNote";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore, type ShapeVariantLocationData } from "@/store/useMusicStore";
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
  // --- STORE DATA (LIVE) ---
  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const currentShapeId = useControlsStore((s) => s.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((s) => s.currentShapeSemitoneOffsetFromC);
  const currentShapeVariantLocationData = useMusicStore((s) => s.currentShapeVariantLocationData);
  const activeRootNote = useShapeRootNote();

  const setCurrentKey = useControlsStore((s) => s.setCurrentKey);
  const setCurrentRoleId = useControlsStore((s) => s.setCurrentRoleId);
  const setIsMajorMode = useControlsStore((s) => s.setIsMajorMode);
  const setShape = useControlsStore((s) => s.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((s) => s.setCurrentShapeVariantLocationData);
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

  // --- STATE ---

  const [lockedSnapshot, setLockedSnapshot] = useState<Snapshot>(() => ({
    ...currentLiveState,
    currentShapeVariantLocationData: null,
    rootNote: null,
    shapeLabel: undefined,
  }));

  // --- SYNCHRONIZACJA (PODCZAS RENDERU) ---
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

  // --- HANDLERS ---
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
  };
}

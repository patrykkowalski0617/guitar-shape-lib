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

export function usePlayerSnapshot() {
  // --- STORE DATA ---
  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const currentShapeId = useControlsStore((s) => s.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((s) => s.currentShapeSemitoneOffsetFromC);

  const setCurrentKey = useControlsStore((s) => s.setCurrentKey);
  const setCurrentRoleId = useControlsStore((s) => s.setCurrentRoleId);
  const setIsMajorMode = useControlsStore((s) => s.setIsMajorMode);
  const setShape = useControlsStore((s) => s.setShape);

  const currentShapeVariantLocationData = useMusicStore((s) => s.currentShapeVariantLocationData);
  const setCurrentShapeVariantLocationData = useMusicStore((s) => s.setCurrentShapeVariantLocationData);

  const activeRootNote = useShapeRootNote();
  const activeShape = shapes[currentShapeId as keyof Shapes] || null;

  // --- STATE ---
  const [lockedSnapshot, setLockedSnapshot] = useState<Snapshot | null>(null);

  const currentSnapshot: Snapshot = {
    keyId: currentKeyId,
    isMajorMode,
    currentRoleId,
    currentShapeVariantLocationData,
    rootNote: activeRootNote,
    shapeLabel: activeShape?.label,
    currentShapeSemitoneOffsetFromC,
    currentShapeId,
  };

  const isLocked = !!lockedSnapshot;
  const displayData = lockedSnapshot ?? currentSnapshot;

  // --- HANDLERS ---
  const toggleLock = () => {
    setLockedSnapshot((prev) => (prev ? null : { ...currentSnapshot }));
  };

  const logLockedData = () => {
    if (!lockedSnapshot) return;

    setCurrentShapeVariantLocationData(lockedSnapshot.currentShapeVariantLocationData);
    setCurrentKey(lockedSnapshot.keyId);
    setCurrentRoleId(lockedSnapshot.currentRoleId);
    setIsMajorMode(lockedSnapshot.isMajorMode);
    setShape(lockedSnapshot.currentShapeId, lockedSnapshot.currentShapeSemitoneOffsetFromC);
  };

  return {
    isLocked,
    displayData,
    toggleLock,
    logLockedData,
  };
}

import { useEffect, useRef, useState } from "react";
import { useShapeRootNote } from "@/hooks/useShapeRootNote";
import { useControlsStore } from "@/store/useControlsStore";
import { shapes, type MusicKeyId, type RoleId, type Shapes } from "@/data";
import { useMusicStore, type ShapeVariantLocationData } from "@/store/useMusicStore";
import * as S from "./parts";

type Snapshot = {
  keyId: MusicKeyId;
  isMajorMode: boolean;
  currentRoleId: RoleId | null;
  currentShapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  currentShapeSemitoneOffsetFromC: number | null;
  currentShapeId: string | null;
};

export default function Player() {
  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const activeRootNote = useShapeRootNote();
  const currentShapeId = useControlsStore((s) => s.currentShapeId);
  const activeShape = shapes[currentShapeId as keyof Shapes] || null;
  const currentShapeVariantLocationData = useMusicStore((s) => s.currentShapeVariantLocationData);
  const setCurrentShapeVariantLocationData = useMusicStore((s) => s.setCurrentShapeVariantLocationData);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);
  const setShape = useControlsStore((state) => state.setShape);

  const [isLocked, setIsLocked] = useState(false);
  const [lockedSnapshot, setLockedSnapshot] = useState<Snapshot | null>(null);

  const liveRef = useRef<Snapshot>({
    keyId: currentKeyId,
    currentShapeVariantLocationData: currentShapeVariantLocationData,
    rootNote: activeRootNote,
    shapeLabel: activeShape?.label,
    isMajorMode,
    currentRoleId,
    currentShapeSemitoneOffsetFromC,
    currentShapeId,
  });

  useEffect(() => {
    liveRef.current = {
      keyId: currentKeyId,
      currentShapeVariantLocationData: currentShapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      isMajorMode,
      currentRoleId,
      currentShapeSemitoneOffsetFromC,
      currentShapeId,
    };
  }, [
    currentKeyId,
    currentShapeVariantLocationData,
    activeRootNote,
    activeShape?.label,
    isMajorMode,
    currentRoleId,
    currentShapeSemitoneOffsetFromC,
    currentShapeId,
    isLocked,
  ]);

  const toggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      setLockedSnapshot(null);
    } else {
      const snap: Snapshot = { ...liveRef.current };
      setLockedSnapshot(snap);
      setIsLocked(true);
    }
  };

  const logLockedData = () => {
    if (!lockedSnapshot) return;
    setCurrentShapeVariantLocationData(lockedSnapshot.currentShapeVariantLocationData);
    setCurrentKey(lockedSnapshot.keyId);
    setCurrentRoleId(lockedSnapshot.currentRoleId);
    setIsMajorMode(lockedSnapshot.isMajorMode);
    setShape(lockedSnapshot.currentShapeId, lockedSnapshot.currentShapeSemitoneOffsetFromC);
  };

  const displayRoot = isLocked && lockedSnapshot ? lockedSnapshot.rootNote : activeRootNote;
  const displayLabel = isLocked && lockedSnapshot ? lockedSnapshot.shapeLabel : activeShape?.label;

  return (
    <S.Container $locked={isLocked}>
      <span onClick={logLockedData}>
        {displayRoot} {displayLabel || "—"}
      </span>
      <span onClick={toggleLock}> {isLocked ? "Edit" : "Save"}</span>
    </S.Container>
  );
}

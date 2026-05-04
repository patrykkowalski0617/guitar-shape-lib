import { useState, useEffect, useRef } from "react";
import { useMusicStore, usePlayerStore, type Brick } from "@/store";
import { usePlayerSnapshot } from "./usePlayerSnapshot";
import { useBrickWidthUnit } from "./useBrickWidthUnit";
import { useBrickResize } from "./useBrickResize";
import { useRoleMarkers } from "@/hooks/useRoleMarkers";

interface UsePlayerBrickLogicProps {
  brick: Brick;
  isEditable: boolean;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
}

export const usePlayerBrickLogic = ({
  brick,
  isEditable,
  onWidthChange,
}: UsePlayerBrickLogicProps) => {
  const { id, width } = brick;

  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const currentStep = usePlayerStore((state) => state.currentStep);
  const bricks = usePlayerStore((state) => state.bricks);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);

  const [isResizing, setIsResizing] = useState(false);
  const birckWidthUnit = useBrickWidthUnit();

  const { displayData, handleClick, applySnapshotToStore, lockedSnapshot } =
    usePlayerSnapshot(id, isEditable);

  const resizeHandlers = useBrickResize({
    isEditable,
    width,
    onWidthChange,
    birckWidthUnit,
    isResizing,
    setIsResizing,
  });

  const myIndex = bricks.findIndex((b) => b.id === id);
  const stepsBeforeMe = bricks
    .slice(0, myIndex)
    .reduce((sum, b) => sum + b.width, 0);

  const activeBrickIndex = bricks.findIndex((b, idx) => {
    const stepStart = bricks
      .slice(0, idx)
      .reduce((sum, prev) => sum + prev.width, 0);
    return currentStep >= stepStart && currentStep < stepStart + b.width;
  });

  const isActivePlayback = isPlaying && !isCountingIn;
  const isMeActive = activeBrickIndex === myIndex && isActivePlayback;
  const isMeNext =
    (activeBrickIndex + 1) % bricks.length === myIndex && isActivePlayback;

  const activePart = isMeActive ? currentStep - stepsBeforeMe + 1 : 0;

  const didSyncStartRef = useRef(false);

  const syncSnapshotOnBrickStart = () => {
    const isFirstStepOfBrick = activePart === 1;
    if (!isFirstStepOfBrick) {
      didSyncStartRef.current = false;
      return;
    }

    if (didSyncStartRef.current) return;
    didSyncStartRef.current = true;

    if (lockedSnapshot.rootNote !== null) {
      applySnapshotToStore(lockedSnapshot);
    }

    const isNotSingleBlockBrick = width > 1;
    if (isNotSingleBlockBrick) {
      setShapeVariantLocationData_locked(null);
    }
  };

  const syncNextBrickPreview = () => {
    const currentActiveBrick = bricks[activeBrickIndex];
    if (!currentActiveBrick || !isMeNext) return;

    const stepStartOfActive = bricks
      .slice(0, activeBrickIndex)
      .reduce((sum, b) => sum + b.width, 0);
    const isLastStepOfActiveBrick =
      currentStep - stepStartOfActive + 1 === currentActiveBrick.width;

    if (isLastStepOfActiveBrick && bricks.length > 1) {
      setShapeVariantLocationData_locked(
        lockedSnapshot.shapeVariantLocationData,
      );
    }
  };

  useEffect(syncSnapshotOnBrickStart, [
    activePart,
    applySnapshotToStore,
    lockedSnapshot,
    width,
    setShapeVariantLocationData_locked,
  ]);

  useEffect(syncNextBrickPreview, [
    isMeNext,
    currentStep,
    activeBrickIndex,
    bricks,
    lockedSnapshot.shapeVariantLocationData,
    setShapeVariantLocationData_locked,
  ]);

  const modeKey = displayData.isMajorMode ? "major" : "minor";
  const keyId = displayData.keyId;

  const roleMarkersMap = useRoleMarkers(keyId);

  const roleMarker =
    displayData &&
    displayData.baseChordId !== null &&
    displayData.baseChordId in roleMarkersMap[modeKey]
      ? roleMarkersMap[modeKey][
          displayData.baseChordId as keyof (typeof roleMarkersMap)[typeof modeKey]
        ].chordName + " | "
      : "";

  const hasData = displayData.rootNote !== null;

  const label = isResizing
    ? width
    : hasData
      ? `${roleMarker}${displayData.rootNote} ${displayData.shapeLabel}`
      : `Empty`;

  return {
    birckWidthUnit,
    activePart,
    label,
    handleClick,
    isResizing,
    resizeHandlers,
  };
};

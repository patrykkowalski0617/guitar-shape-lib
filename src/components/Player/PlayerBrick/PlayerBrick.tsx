import { useState, useEffect } from "react";
import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";
import { useBrickWidthUnit } from "./hooks/useBrickWidthUnit";
import { useBrickResize } from "./hooks/useBrickResize";
import { usePlayerStore, type Brick } from "@/store/usePlayerStore";
import { useMusicStore } from "@/store/useMusicStore";

interface PlayerBrickProps {
  brick: Brick;
  isEditable: boolean;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
}

export default function PlayerBrick({ brick, isEditable, onToggleEdit, onWidthChange }: PlayerBrickProps) {
  const { id, width } = brick;

  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const currentStep = usePlayerStore((s) => s.currentStep);
  const bricks = usePlayerStore((s) => s.bricks);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isCountingIn = usePlayerStore((s) => s.isCountingIn);

  const { displayData, handleClick, applySnapshotToStore, lockedSnapshot } = usePlayerSnapshot(
    isEditable,
    onToggleEdit,
  );

  const [isResizing, setIsResizing] = useState(false);
  const birckWidthUnit = useBrickWidthUnit();

  const { handleMouseDown, handleTouchStart, handleTouchMove, handleTouchEnd } = useBrickResize({
    isEditable,
    width,
    onWidthChange,
    birckWidthUnit,
    isResizing,
    setIsResizing,
  });

  const myIndex = bricks.findIndex((b) => b.id === id);

  const activeBrickIndex = bricks.findIndex((b, idx) => {
    const stepStart = bricks.slice(0, idx).reduce((sum, prev) => sum + prev.width, 0);
    return currentStep >= stepStart && currentStep < stepStart + b.width;
  });

  const isMeActive = activeBrickIndex === myIndex && isPlaying && !isCountingIn;

  const isMeNext = (activeBrickIndex + 1) % bricks.length === myIndex && isPlaying && !isCountingIn;

  const activePart = isMeActive ? currentStep - bricks.slice(0, myIndex).reduce((sum, b) => sum + b.width, 0) + 1 : 0;

  useEffect(() => {
    if (activePart === 1 && lockedSnapshot.rootNote !== null) {
      applySnapshotToStore(lockedSnapshot);
    }
  }, [activePart, applySnapshotToStore, lockedSnapshot]);

  useEffect(() => {
    const currentActiveBrick = bricks[activeBrickIndex];
    if (!currentActiveBrick) return;

    const stepStartOfActive = bricks.slice(0, activeBrickIndex).reduce((sum, b) => sum + b.width, 0);
    const activePartInCurrentBrick = currentStep - stepStartOfActive + 1;

    if (isMeNext && activePartInCurrentBrick === currentActiveBrick.width) {
      setLockedShapeVariantLocationData(lockedSnapshot.currentShapeVariantLocationData);
    }
  }, [
    isMeNext,
    currentStep,
    activeBrickIndex,
    bricks,
    lockedSnapshot.currentShapeVariantLocationData,
    setLockedShapeVariantLocationData,
  ]);

  const hasData = displayData.currentShapeVariantLocationData !== null;

  return (
    <S.Brick
      $isEditable={isEditable}
      $unit={birckWidthUnit}
      $widthUnit={width}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <S.Label>{isResizing ? width : hasData ? `${displayData.rootNote} ${displayData.shapeLabel}` : "Empty"}</S.Label>

      <S.TicksContainer>
        {Array.from({ length: width }).map((_, i) => (
          <S.Tick key={i} $unit={birckWidthUnit} $isActive={i + 1 === activePart} />
        ))}
      </S.TicksContainer>

      <S.BrickOptions $isEditable={isEditable}>
        {isEditable ? <Check size={16} /> : <Pencil size={14} />}
      </S.BrickOptions>
    </S.Brick>
  );
}

import { useState, useEffect } from "react";
import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";
import { useBrickWidthUnit } from "./hooks/useBrickWidthUnit";
import { useBrickResize } from "./hooks/useBrickResize";
import { usePlayerStore, type Brick } from "@/store/usePlayerStore";

interface PlayerBrickProps {
  brick: Brick;
  isEditable: boolean;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
}

export default function PlayerBrick({ brick, isEditable, onToggleEdit, onWidthChange }: PlayerBrickProps) {
  const { id, width } = brick;

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

  const currentStep = usePlayerStore((s) => s.currentStep);
  const bricks = usePlayerStore((s) => s.bricks);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isCountingIn = usePlayerStore((s) => s.isCountingIn);

  const activePart = (() => {
    if (!isPlaying || isCountingIn) return 0;

    const brickIndex = bricks.findIndex((b) => b.id === id);
    if (brickIndex === -1) return 0;

    const stepStart = bricks.slice(0, brickIndex).reduce((sum, b) => sum + b.width, 0);

    if (currentStep >= stepStart && currentStep < stepStart + width) {
      return currentStep - stepStart + 1;
    }

    return 0;
  })();

  useEffect(() => {
    if (activePart === 1 && lockedSnapshot.currentShapeVariantLocationData !== null) {
      applySnapshotToStore(lockedSnapshot);
    }
  }, [activePart, id, applySnapshotToStore, lockedSnapshot]);

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

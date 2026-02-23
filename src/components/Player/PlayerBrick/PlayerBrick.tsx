import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";
import { useBrickWidthUnit } from "./hooks/useBrickWidthUnit";
import { useBrickResize } from "./hooks/useBrickResize";

interface PlayerBrickProps {
  isEditable: boolean;
  width: number;
  activePart: number;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
}

export default function PlayerBrick({
  isEditable,
  width,
  activePart = 2,
  onToggleEdit,
  onWidthChange,
}: PlayerBrickProps) {
  const { displayData, handleClick } = usePlayerSnapshot(isEditable, onToggleEdit);
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
          <S.Tick key={i} $unit={birckWidthUnit} $activePart={activePart} />
        ))}
      </S.TicksContainer>

      <S.BrickOptions $isEditable={isEditable}>
        {isEditable ? <Check size={16} /> : <Pencil size={14} />}
      </S.BrickOptions>
    </S.Brick>
  );
}

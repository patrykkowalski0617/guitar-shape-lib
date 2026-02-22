import { useRef } from "react";
import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";

interface PlayerBrickProps {
  isEditable: boolean;
  width: number;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
}

export default function PlayerBrick({ isEditable, width, onToggleEdit, onWidthChange }: PlayerBrickProps) {
  const { displayData, handleClick } = usePlayerSnapshot(isEditable, onToggleEdit);
  const startX = useRef<number | null>(null);
  const startWidth = useRef<number>(width);

  const hasData = displayData.currentShapeVariantLocationData !== null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditable) return;
    startX.current = e.clientX;
    startWidth.current = width;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    const newWidth = Math.round(startWidth.current + delta / S.birckWidthUnit);
    if (newWidth !== width) onWidthChange(newWidth);
  };

  const handleMouseUp = () => {
    startX.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditable) return;
    startX.current = e.touches[0].clientX;
    startWidth.current = width;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const delta = e.touches[0].clientX - startX.current;
    const newWidth = Math.round(startWidth.current + delta / S.birckWidthUnit);
    if (newWidth !== width) onWidthChange(newWidth);
  };

  return (
    <S.Brick
      $isEditable={isEditable}
      $widthUnit={width}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => {
        startX.current = null;
      }}
    >
      <S.Label>{hasData ? `${displayData.rootNote} ${displayData.shapeLabel}` : "Empty"}</S.Label>

      <S.TicksContainer>
        {Array.from({ length: width }).map((_, i) => (
          <S.Tick key={i} />
        ))}
      </S.TicksContainer>

      <S.BrickOptions $isEditable={isEditable}>
        {isEditable ? <Check size={16} /> : <Pencil size={14} />}
      </S.BrickOptions>
    </S.Brick>
  );
}

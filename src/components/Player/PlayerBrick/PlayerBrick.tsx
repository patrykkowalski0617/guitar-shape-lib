import { Pencil, Check } from "lucide-react";
import * as S from "./parts";
import { type Brick } from "@/store";
import { usePlayerBrickLogic } from "./hooks";
import { PlayerElementWrapper } from "../parts";

interface PlayerBrickProps {
  brick: Brick;
  isEditable: boolean;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
  $isDragging?: boolean;
}

export default function PlayerBrick(props: PlayerBrickProps) {
  const { brick, isEditable, $isDragging } = props;
  const { birckWidthUnit, activePart, label, handleClick, resizeHandlers } =
    usePlayerBrickLogic(props);

  return (
    <PlayerElementWrapper>
      <S.Brick
        $isEditable={isEditable}
        $unit={birckWidthUnit}
        $widthUnit={brick.width}
        $isDragging={$isDragging}
        onClick={handleClick}
        onMouseDown={resizeHandlers.handleMouseDown}
        onTouchStart={resizeHandlers.handleTouchStart}
        onTouchMove={resizeHandlers.handleTouchMove}
        onTouchEnd={resizeHandlers.handleTouchEnd}
      >
        <S.Label>{label}</S.Label>

        <S.PartsContainer>
          {Array.from({ length: brick.width }).map((_, i) => (
            <S.Part
              key={i}
              $unit={birckWidthUnit}
              $isActive={i + 1 === activePart}
            />
          ))}
        </S.PartsContainer>

        <S.BrickOptions $isEditable={isEditable}>
          {isEditable ? <Check size={16} /> : <Pencil size={14} />}
        </S.BrickOptions>
      </S.Brick>
    </PlayerElementWrapper>
  );
}

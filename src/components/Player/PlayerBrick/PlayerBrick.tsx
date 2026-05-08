import * as S from "./parts";
import { type Brick } from "@/store";
import { usePlayerBrickLogic } from "./hooks";
import { BrickOptions } from "./BrickOptions/BrickOptions";

interface PlayerBrickProps {
  brick: Brick;
  isEditable: boolean;
  isActive: boolean;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
  $isDragging?: boolean;
}

export default function PlayerBrick(props: PlayerBrickProps) {
  const { brick, isEditable, isActive, $isDragging } = props;

  const {
    birckWidthUnit,
    activePart,
    label,
    handleClick,
    handleDelete,
    handleToggleEdit,
    resizeHandlers,
  } = usePlayerBrickLogic(props);

  return (
    <S.Brick
      $isEditable={isEditable}
      $isActive={isActive}
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

      <BrickOptions
        isEditable={isEditable}
        onToggleEdit={handleToggleEdit}
        onDelete={handleDelete}
      />
    </S.Brick>
  );
}

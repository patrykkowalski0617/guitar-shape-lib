import * as S from "./parts";
import { type Brick, usePlayerStore } from "@/store";
import { usePlayerBrickLogic } from "./hooks";
import { BrickOptions } from "./BrickOptions/BrickOptions";

interface PlayerBrickProps {
  brick: Brick;
  isEditable: boolean;
  onToggleEdit: () => void;
  onWidthChange: (newWidth: number) => void;
  $isDragging?: boolean;
}

export default function PlayerBrick(props: PlayerBrickProps) {
  const { brick, isEditable, $isDragging, onToggleEdit } = props;
  const removeBrick = usePlayerStore((state) => state.removeBrick);
  console.log(brick);

  const { birckWidthUnit, activePart, label, handleClick, resizeHandlers } =
    usePlayerBrickLogic(props);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBrick(brick.id);
  };

  const handleToggleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleEdit();
  };

  return (
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

      <BrickOptions
        isEditable={isEditable}
        onToggleEdit={handleToggleEdit}
        onDelete={handleDelete}
      />
    </S.Brick>
  );
}

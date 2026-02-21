import { Pencil } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";

interface PlayerBrickProps {
  isEditable: boolean;
  onToggleEdit: () => void;
}

export default function PlayerBrick({ isEditable, onToggleEdit }: PlayerBrickProps) {
  const { displayData, handleClick } = usePlayerSnapshot(isEditable, onToggleEdit);

  return (
    <S.Brick $isEditable={isEditable} onClick={handleClick}>
      <S.Label>
        {displayData.currentShapeVariantLocationData !== null
          ? `${displayData.rootNote} ${displayData.shapeLabel}`
          : "Empty"}
      </S.Label>

      <S.BrickOptions $isEditable={isEditable}>
        <Pencil size={14} />
      </S.BrickOptions>
    </S.Brick>
  );
}

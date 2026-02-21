import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";

interface PlayerBrickProps {
  isEditable: boolean;
  onToggleEdit: () => void;
}

export default function PlayerBrick({ isEditable, onToggleEdit }: PlayerBrickProps) {
  const { displayData, handleClick } = usePlayerSnapshot(isEditable, onToggleEdit);

  return (
    <S.Container $isEditable={isEditable} onClick={handleClick}>
      <S.Label>
        {displayData.rootNote} {displayData.shapeLabel || "—"}
      </S.Label>

      <S.EditButton $isEditable={isEditable}>{!isEditable ? <Pencil size={14} /> : <Check size={20} />}</S.EditButton>
    </S.Container>
  );
}

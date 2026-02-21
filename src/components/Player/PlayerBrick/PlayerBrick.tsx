import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";

interface PlayerBrickProps {
  isEditable: boolean;
  onToggleEdit: () => void;
}

export default function PlayerBrick({ isEditable, onToggleEdit }: PlayerBrickProps) {
  const { displayData, toggleLock, logLockedData } = usePlayerSnapshot(isEditable, onToggleEdit);

  return (
    <S.Container $isEditable={isEditable} onClick={logLockedData}>
      <S.Label>
        {displayData.rootNote} {displayData.shapeLabel || "—"}
      </S.Label>

      <S.EditButton onClick={toggleLock} $isEditable={isEditable}>
        {!isEditable ? <Pencil size={14} /> : <Check size={20} />}
      </S.EditButton>
    </S.Container>
  );
}

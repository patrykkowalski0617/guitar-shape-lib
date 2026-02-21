import { Pencil, Check } from "lucide-react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";

export default function PlayerBrick() {
  const { isEditable, displayData, toggleLock, logLockedData } = usePlayerSnapshot();

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

import { Pencil, Check, Trash2 } from "lucide-react";
import * as S from "./parts";

interface BrickOptionsProps {
  isEditable: boolean;
  onToggleEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function BrickOptions({
  isEditable,
  onToggleEdit,
  onDelete,
}: BrickOptionsProps) {
  return (
    <S.BrickOptions
      $isEditable={isEditable}
      onClick={(e) => e.stopPropagation()}
    >
      <S.DeleteBrickButton onClick={onDelete}>
        <Trash2 size={16} />
      </S.DeleteBrickButton>

      <S.EditBrickButton onClick={onToggleEdit} $isEditable={isEditable}>
        {isEditable ? <Check size={16} /> : <Pencil size={16} />}
      </S.EditBrickButton>
    </S.BrickOptions>
  );
}

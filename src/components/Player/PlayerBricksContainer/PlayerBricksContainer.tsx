import { useRef } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import PlayerBrick from "../PlayerBrick/PlayerBrick";
import * as S from "./parts";

interface Props {
  bricks: { id: number; width: number }[];
  activeBrickId: number | null;
  onAdd: () => void;
  onRemove: (id: number) => void;
  onUpdateWidth: (id: number, w: number) => void;
  onSelect: (id: number | null) => void;
  onCloseEdit: () => void;
}

export const PlayerBricksContainer = ({
  bricks,
  activeBrickId,
  onAdd,
  onRemove,
  onUpdateWidth,
  onSelect,
  onCloseEdit,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  return (
    <S.PlayerScrollWrapper ref={scrollRef}>
      <S.PlayerRow>
        {bricks.map((brick) => (
          <PlayerBrick
            key={brick.id}
            width={brick.width}
            isEditable={activeBrickId === brick.id}
            onToggleEdit={() => onSelect(activeBrickId === brick.id ? null : brick.id)}
            onWidthChange={(newWidth) => onUpdateWidth(brick.id, newWidth)}
          />
        ))}
        <S.AddBrickButton onClick={onAdd}>
          <Plus size={16} />
        </S.AddBrickButton>
        {activeBrickId !== null && (
          <>
            <S.DeleteButton onClick={() => onRemove(activeBrickId)}>
              <Trash2 size={14} />
            </S.DeleteButton>
            <S.CheckButton onClick={onCloseEdit}>
              <Check size={16} />
            </S.CheckButton>
          </>
        )}
      </S.PlayerRow>
    </S.PlayerScrollWrapper>
  );
};

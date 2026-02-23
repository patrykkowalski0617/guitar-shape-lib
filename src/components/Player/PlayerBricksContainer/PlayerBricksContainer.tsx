import { useRef } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import PlayerBrick from "../PlayerBrick/PlayerBrick";
import * as S from "./parts";
import { usePlayerStore } from "@/store/usePlayerStore";

interface Props {
  onCloseEdit: () => void;
  onAdd: () => void;
}

export const PlayerBricksContainer = ({ onCloseEdit, onAdd }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  const bricks = usePlayerStore((s) => s.bricks);
  const activeBrickId = usePlayerStore((s) => s.activeBrickId);
  const removeBrick = usePlayerStore((s) => s.removeBrick);
  const updateBrickWidth = usePlayerStore((s) => s.updateBrickWidth);
  const setActiveBrickId = usePlayerStore((s) => s.setActiveBrickId);

  return (
    <S.PlayerScrollWrapper ref={scrollRef}>
      <S.PlayerRow>
        {bricks.map((brick) => (
          <PlayerBrick
            key={brick.id}
            width={brick.width}
            isEditable={activeBrickId === brick.id}
            onToggleEdit={() => setActiveBrickId(activeBrickId === brick.id ? null : brick.id)}
            onWidthChange={(newWidth) => updateBrickWidth(brick.id, newWidth)}
          />
        ))}
        <S.AddBrickButton onClick={onAdd}>
          <Plus size={16} />
        </S.AddBrickButton>
        {activeBrickId !== null && (
          <>
            <S.DeleteButton onClick={() => removeBrick(activeBrickId)}>
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

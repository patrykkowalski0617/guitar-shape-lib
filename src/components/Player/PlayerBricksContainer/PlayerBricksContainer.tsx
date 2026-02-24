import { useRef } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import PlayerBrick from "../PlayerBrick/PlayerBrick";
import * as S from "./parts";
import { usePlayerStore } from "@/store";

interface Props {
  onCloseEdit: () => void;
  onAdd: () => void;
}

export const PlayerBricksContainer = ({ onCloseEdit, onAdd }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  const bricks = usePlayerStore((state) => state.bricks);
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const removeBrick = usePlayerStore((state) => state.removeBrick);
  const updateBrickWidth = usePlayerStore((state) => state.updateBrickWidth);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  return (
    <S.PlayerScrollWrapper ref={scrollRef}>
      <S.PlayerRow>
        {bricks.map((brick) => (
          <PlayerBrick
            key={brick.id}
            brick={brick}
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

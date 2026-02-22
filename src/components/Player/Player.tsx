import { useState, useRef } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import * as S from "./parts";
import PlayerBrick from "./PlayerBrick/PlayerBrick";

export default function Player() {
  const [bricks, setBricks] = useState<{ id: number; width: number }[]>([]);
  const [activeBrickId, setActiveBrickId] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  const closeEditMode = () => setActiveBrickId(null);

  const addBrick = () => {
    const newId = Date.now();
    setBricks((prev) => [...prev, { id: newId, width: 4 }]);
    setActiveBrickId(newId);
  };

  const removeBrick = (idToRemove: number) => {
    setBricks((prev) => prev.filter((b) => b.id !== idToRemove));
    if (activeBrickId === idToRemove) {
      setActiveBrickId(null);
    }
  };

  const updateBrickWidth = (id: number, newWidth: number) => {
    setBricks((prev) => prev.map((b) => (b.id === id ? { ...b, width: Math.max(1, Math.min(8, newWidth)) } : b)));
  };

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

        {activeBrickId !== null && (
          <>
            <S.GlobalCheckButton onClick={closeEditMode}>
              <Check size={16} />
            </S.GlobalCheckButton>

            <S.GlobalDeleteButton onClick={() => removeBrick(activeBrickId)}>
              <Trash2 size={14} />
            </S.GlobalDeleteButton>
          </>
        )}

        <S.AddBrickButton onClick={addBrick}>
          <Plus size={16} />
        </S.AddBrickButton>
      </S.PlayerRow>
    </S.PlayerScrollWrapper>
  );
}

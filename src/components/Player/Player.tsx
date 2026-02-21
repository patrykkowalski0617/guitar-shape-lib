import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import * as S from "./parts";
import PlayerBrick from "./PlayerBrick/PlayerBrick";

export default function Player() {
  const [bricks, setBricks] = useState<number[]>([]);
  const [activeBrickId, setActiveBrickId] = useState<number | null>(null);

  const closeEditMode = () => setActiveBrickId(null);

  const addBrick = () => {
    const newId = Date.now();

    setBricks((prev) => [...prev, newId]);

    setActiveBrickId(newId);
  };

  const removeBrick = (idToRemove: number) => {
    setBricks((prev) => prev.filter((id) => id !== idToRemove));
    if (activeBrickId === idToRemove) {
      setActiveBrickId(null);
    }
  };

  return (
    <S.PlayerRow>
      {bricks.map((id) => (
        <PlayerBrick
          key={id}
          isEditable={activeBrickId === id}
          onToggleEdit={() => setActiveBrickId(activeBrickId === id ? null : id)}
        />
      ))}

      {activeBrickId !== null && (
        <>
          <S.GlobalCheckButton onClick={closeEditMode} title="Zapisz">
            <Check size={16} />
          </S.GlobalCheckButton>

          <S.GlobalDeleteButton onClick={() => removeBrick(activeBrickId)} title="Usuń">
            <Trash2 size={14} />
          </S.GlobalDeleteButton>
        </>
      )}

      <S.AddBrickButton onClick={addBrick} title="Dodaj cegiełkę">
        <Plus size={16} />
      </S.AddBrickButton>
    </S.PlayerRow>
  );
}

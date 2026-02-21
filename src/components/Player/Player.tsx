import { useState } from "react";
import { Check } from "lucide-react";
import * as S from "./parts";
import PlayerBrick from "./PlayerBrick/PlayerBrick";

export default function Player() {
  const [activeBrickId, setActiveBrickId] = useState<number | null>(null);
  const bricks = [0, 1, 2];

  // Funkcja do zamykania trybu edycji dla wszystkich
  const closeEditMode = () => setActiveBrickId(null);

  return (
    <S.PlayerRow>
      {bricks.map((id) => (
        <PlayerBrick
          key={id}
          isEditable={activeBrickId === id}
          onToggleEdit={() => setActiveBrickId(activeBrickId === id ? null : id)}
        />
      ))}

      {/* Przycisk pojawia się tylko, gdy jakaś cegiełka jest edytowana */}
      {activeBrickId !== null && (
        <S.GlobalCheckButton onClick={closeEditMode} title="Zapisz i zamknij edycję">
          <Check size={20} />
        </S.GlobalCheckButton>
      )}
    </S.PlayerRow>
  );
}

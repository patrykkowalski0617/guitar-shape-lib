import { useState } from "react";
import * as S from "./parts";
import PlayerBrick from "./PlayerBrick/PlayerBrick";

export default function Player() {
  const [activeBrickId, setActiveBrickId] = useState<number | null>(null);
  const bricks = [0, 1, 2];

  return (
    <S.PlayerRow>
      {bricks.map((id) => (
        <PlayerBrick
          key={id}
          isEditable={activeBrickId === id}
          onToggleEdit={() => setActiveBrickId(activeBrickId === id ? null : id)}
        />
      ))}
    </S.PlayerRow>
  );
}

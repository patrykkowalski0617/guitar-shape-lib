import * as S from "./parts";
import PlayerBrick from "./PlayerBrick.tsx/PlayerBrick";

export default function Player() {
  return (
    <S.PlayerRow>
      <PlayerBrick />
      <PlayerBrick />
      <PlayerBrick />
    </S.PlayerRow>
  );
}

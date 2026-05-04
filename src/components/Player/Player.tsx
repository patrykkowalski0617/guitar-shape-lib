import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";

// 1. Definicja głównych komponentów wewnętrznych
const Bricks = () => (
  <S.PlayerSection>
    <PlayerBricksContainer />
  </S.PlayerSection>
);

const Controls = () => (
  <S.PlayerSection>
    <PlayerControls />
  </S.PlayerSection>
);

// 2. Komponent główny
const PlayerRoot = ({ children }: { children: React.ReactNode }) => {
  usePlayer();

  return <S.PlayerContainer>{children}</S.PlayerContainer>;
};

// 3. Eksport w stylu Compound Components
export const Player = Object.assign(PlayerRoot, {
  Bricks,
  Controls,
  Section: S.PlayerSection, // Pozwalamy na użycie samej sekcji, jeśli potrzeba tam wsadzić coś customowego
});

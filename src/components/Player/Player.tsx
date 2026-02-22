import { usePlayer } from "./hooks/usePlayer";

import * as S from "./parts";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";

export default function Player() {
  const {
    bricks,
    activeBrickId,
    setActiveBrickId,
    bpm,
    isPlaying,
    addBrick,
    removeBrick,
    updateBrickWidth,
    handleBpmChange,
    togglePlay,
    closeEdit,
  } = usePlayer();

  return (
    <S.PlayerContainer>
      <PlayerBricksContainer
        bricks={bricks}
        activeBrickId={activeBrickId}
        onAdd={addBrick}
        onRemove={removeBrick}
        onUpdateWidth={updateBrickWidth}
        onSelect={setActiveBrickId}
        onCloseEdit={closeEdit}
      />
      <PlayerControls isPlaying={isPlaying} bpm={bpm} onTogglePlay={togglePlay} onBpmChange={handleBpmChange} />
    </S.PlayerContainer>
  );
}

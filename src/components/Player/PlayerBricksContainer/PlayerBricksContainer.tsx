import PlayerBrick from "../PlayerBrick/PlayerBrick";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import { usePlayerBricksDrag } from "./hooks/usePlayerBricksDrag";
import { RandomizeButton } from "../PlayerBricksControls/RandomizeButton/RandomizeButton";

export const PlayerBricksContainer = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const updateBrickWidth = usePlayerStore((state) => state.updateBrickWidth);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } =
    usePlayerBricksDrag();

  const isContainerEmpty = bricks.length === 0;

  return (
    <S.PlayerWrapper $isPlaying={isPlaying}>
      {bricks.map((brick, index) => {
        const isEditable = activeBrickId === brick.id;
        const isBeingDragged = draggedIndex === index;
        const canDrag = !isEditable && !isPlaying;

        return (
          <S.BrickDragWrapper
            key={brick.id}
            draggable={canDrag}
            onDragStart={() => handleDragStart(index, isEditable)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <PlayerBrick
              brick={brick}
              isEditable={isEditable}
              $isDragging={isBeingDragged}
              onToggleEdit={() =>
                setActiveBrickId(isEditable ? null : brick.id)
              }
              onWidthChange={(newWidth) => updateBrickWidth(brick.id, newWidth)}
            />
          </S.BrickDragWrapper>
        );
      })}

      <S.ControlsWrapper>
        {isContainerEmpty && <RandomizeButton />}
      </S.ControlsWrapper>
    </S.PlayerWrapper>
  );
};

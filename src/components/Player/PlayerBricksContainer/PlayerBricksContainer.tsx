import PlayerBrick from "../PlayerBrick/PlayerBrick";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import { usePlayerBricksDrag } from "./hooks/usePlayerBricksDrag";

export const PlayerBricksContainer = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const editableBrickId = usePlayerStore((state) => state.editableBrickId);
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const updateBrickWidth = usePlayerStore((state) => state.updateBrickWidth);
  const setEditableBrickId = usePlayerStore(
    (state) => state.setEditableBrickId,
  );
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } =
    usePlayerBricksDrag();

  return (
    <S.PlayerWrapper $isPlaying={isPlaying}>
      {bricks.map((brick, index) => {
        const isEditable = editableBrickId === brick.id;

        const isAnyBrickBeingEdited = editableBrickId !== null;
        const isActive = isAnyBrickBeingEdited
          ? isEditable
          : activeBrickId === brick.id;

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
              isActive={isActive}
              $isDragging={isBeingDragged}
              onToggleEdit={() => {
                const isOpening = !isEditable;

                if (isOpening) {
                  setActiveBrickId(brick.id);
                }

                setEditableBrickId(isOpening ? brick.id : null);
              }}
              onWidthChange={(newWidth) => updateBrickWidth(brick.id, newWidth)}
            />
          </S.BrickDragWrapper>
        );
      })}
    </S.PlayerWrapper>
  );
};

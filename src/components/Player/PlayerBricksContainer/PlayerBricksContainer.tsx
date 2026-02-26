import { Plus, Trash2, Check } from "lucide-react";
import PlayerBrick from "../PlayerBrick/PlayerBrick";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import { usePlayerBricksDrag } from "./hooks/usePlayerBricksDrag";
import { DashedButton, OutlineButton, SolidButton } from "../ui/parts";

interface Props {
  onCloseEdit: () => void;
  onAdd: () => void;
}

export const PlayerBricksContainer = ({ onCloseEdit, onAdd }: Props) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const removeBrick = usePlayerStore((state) => state.removeBrick);
  const updateBrickWidth = usePlayerStore((state) => state.updateBrickWidth);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } = usePlayerBricksDrag();

  console.log(bricks);

  return (
    <S.PlayerWrapper $isPlaying={isPlaying}>
      {bricks.map((brick, index) => {
        const isEditable = activeBrickId === brick.id;
        const isBeingDragged = draggedIndex === index;

        return (
          <S.BrickDragWrapper
            key={brick.id}
            draggable={!isEditable && !isPlaying}
            onDragStart={() => handleDragStart(index, isEditable)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <PlayerBrick
              brick={brick}
              isEditable={isEditable}
              $isDragging={isBeingDragged}
              onToggleEdit={() => setActiveBrickId(isEditable ? null : brick.id)}
              onWidthChange={(newWidth) => updateBrickWidth(brick.id, newWidth)}
            />
          </S.BrickDragWrapper>
        );
      })}
      <S.ControlsWrapper>
        {!isPlaying && (
          <DashedButton onClick={onAdd}>
            <Plus size={16} />
          </DashedButton>
        )}

        {activeBrickId !== null && (
          <>
            <OutlineButton $isPrimary onClick={() => removeBrick(activeBrickId)}>
              <Trash2 size={14} />
            </OutlineButton>
            <SolidButton onClick={onCloseEdit}>
              <Check size={16} />
            </SolidButton>
          </>
        )}
      </S.ControlsWrapper>
    </S.PlayerWrapper>
  );
};

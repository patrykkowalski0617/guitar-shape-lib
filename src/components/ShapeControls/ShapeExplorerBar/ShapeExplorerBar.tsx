import ShapeExplorerSlider from "@/components/ShapeControls/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import { CleanButton } from "@/components/ShapeControls/ShapeExplorerBar/CleanButton/CleanButton";
import { AddBrickButton } from "@/components/ShapeControls/ShapeExplorerBar/AddBrickButton/AddBrickButton";
import * as S from "./parts";
import { Player } from "@/components/Player/Player";
import { usePlayerStore } from "@/store";
import { usePersistentUnlock } from "@/hooks";

export const ShapeExplorerBar = () => {
  const bricks = usePlayerStore((state) => state.bricks);

  const isPlayerDisabled = usePersistentUnlock(!bricks.length);

  return (
    <S.ShapeExplorerBar>
      <ShapeExplorerSlider />
      <CleanButton />
      <AddBrickButton />
      <S.PlayerWrapper $isDisabled={!isPlayerDisabled}>
        <Player>
          <Player.Controls />
        </Player>
      </S.PlayerWrapper>
    </S.ShapeExplorerBar>
  );
};

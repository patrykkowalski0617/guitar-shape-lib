import ShapeExplorerSlider from "@/components/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";

import { CleanButton } from "@/components/ShapeExplorerBar/CleanButton/CleanButton";

import { AddBrickButton } from "@/components/ShapeExplorerBar/AddBrickButton/AddBrickButton";

import * as S from "./parts";

import { Player } from "@/components/Player/Player";

import { useControlsStore, usePlayerStore } from "@/store";

import { usePersistentUnlock } from "@/hooks";

import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";

export const ShapeExplorerBar = () => {
  const bricks = usePlayerStore((state) => state.bricks);
  const shapeId = useControlsStore((state) => state.shapeId);

  const isPlayerDisabled = usePersistentUnlock(!bricks.length);
  const isShapeNotLoaded = usePersistentUnlock(!shapeId);
  console.log(isPlayerDisabled);

  return (
    <S.ShapeExplorerBar>
      <S.Section $isDisabled={isShapeNotLoaded}>
        <NoteMatrix />
      </S.Section>

      <S.Section $isDisabled={isShapeNotLoaded}>
        <ShapeExplorerSlider />
        <CleanButton />
        <AddBrickButton />
      </S.Section>

      <S.Section $isDisabled={!isPlayerDisabled}>
        <Player>
          <Player.Controls />
        </Player>
      </S.Section>
    </S.ShapeExplorerBar>
  );
};

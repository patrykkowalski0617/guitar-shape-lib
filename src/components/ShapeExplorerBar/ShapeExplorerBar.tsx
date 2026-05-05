import ShapeExplorerSlider from "@/components/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import { CleanButton } from "@/components/ShapeExplorerBar/CleanButton/CleanButton";
import { AddBrickButton } from "@/components/ShapeExplorerBar/AddBrickButton/AddBrickButton";
import * as S from "./parts";
import { useControlsStore } from "@/store";
import { usePersistentUnlock } from "@/hooks";
import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";

export const ShapeExplorerBar = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const isShapeNotLoaded = usePersistentUnlock(!shapeId);

  return (
    <S.ShapeExplorerBar>
      <S.Section $isDisabled={isShapeNotLoaded}>
        <NoteMatrix />
      </S.Section>

      <S.Section>
        <S.ShapeExplorerSection>
          <ShapeExplorerSlider />
          <CleanButton />
          <AddBrickButton />
        </S.ShapeExplorerSection>
      </S.Section>
    </S.ShapeExplorerBar>
  );
};

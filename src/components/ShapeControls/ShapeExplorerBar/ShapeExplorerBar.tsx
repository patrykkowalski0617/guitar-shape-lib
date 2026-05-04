import ShapeExplorerSlider from "@/components/ShapeControls/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import { CleanButton } from "@/components/ShapeControls/ShapeExplorerBar/CleanButton/CleanButton";
import { AddBrickButton } from "@/components/ShapeControls/ShapeExplorerBar/AddBrickButton/AddBrickButton";
import * as S from "./parts";
import { NoteMatrix } from "./NoteMatrix/NoteMatrix";

export const ShapeExplorerBar = () => {
  return (
    <S.ShapeExplorerBar>
      <ShapeExplorerSlider />
      <CleanButton />
      <AddBrickButton />
      <NoteMatrix />
    </S.ShapeExplorerBar>
  );
};

import * as S from "./parts";
import ShapeExplorerSlider from "../ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import { CleanButton } from "./CleanButton/CleanButton";

export const ShapeExplorerBar = () => {
  return (
    <S.ShapeExplorerBar>
      <ShapeExplorerSlider />
      <CleanButton />
    </S.ShapeExplorerBar>
  );
};

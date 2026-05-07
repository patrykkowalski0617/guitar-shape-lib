import { CleanButton } from "./CleanButton/CleanButton";
import * as S from "./parts";
import ShapeExplorerSlider from "./ShapeExplorerSlider/ShapeExplorerSlider";

export const ShapeExplorer = () => {
  return (
    <S.ShapeExplorer>
      <ShapeExplorerSlider />
      <CleanButton />
    </S.ShapeExplorer>
  );
};

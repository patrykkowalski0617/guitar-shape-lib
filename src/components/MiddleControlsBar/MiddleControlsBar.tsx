import { AddBrickButton } from "../AddBrickButton/AddBrickButton";
import { CleanButton } from "../CleanButton/CleanButton";
import { PianoControls } from "../PianoControls/PianoControls";
import { ShapeExplorer } from "../ShapeExplorer/ShapeExplorer";
import * as S from "./parts";

export const MiddleControlsBar = () => {
  return (
    <S.MiddleControlsBar>
      <S.SideSections>
        <ShapeExplorer />
      </S.SideSections>
      <S.MiddleSection>
        <CleanButton />
        <AddBrickButton />
      </S.MiddleSection>
      <S.SideSections>
        <PianoControls />
      </S.SideSections>
    </S.MiddleControlsBar>
  );
};

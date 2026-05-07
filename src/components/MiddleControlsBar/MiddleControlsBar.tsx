import { AddBrickButton } from "../AddBrickButton/AddBrickButton";
import { PianoControls } from "../PianoControls/PianoControls";
import { ShapeExplorer } from "../ShapeExplorer/ShapeExplorer";
import * as S from "./parts";

export const MiddleControlsBar = () => {
  return (
    <S.MiddleControlsBar>
      <S.SideSections>
        <ShapeExplorer />
      </S.SideSections>
      <AddBrickButton />
      <S.SideSections>
        <PianoControls />
      </S.SideSections>
    </S.MiddleControlsBar>
  );
};

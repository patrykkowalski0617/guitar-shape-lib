import { MasterShapeExplorer } from "../ShapeExplorer/MasterShapeExplorer";
import { MasterTargetNotesSelect } from "../TargetNotesSelect/MasterTargetNotesSelect";
import { Add, Clear, Transpose } from "./headerElements";
import * as S from "./parts";

export const PlayerHeader = () => {
  return (
    <S.PlayerHeaderWrapper>
      <Transpose />
      <MasterTargetNotesSelect />
      <div style={{ width: 500 }}>
        <MasterShapeExplorer />
      </div>
      <Clear />
      <Add />
    </S.PlayerHeaderWrapper>
  );
};

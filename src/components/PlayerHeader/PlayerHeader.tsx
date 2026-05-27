import { MasterShapeExplorer } from "../ShapeExplorer/MasterShapeExplorer";
import { MasterTargetNotesSelect } from "../TargetNotesSelect/MasterTargetNotesSelect";
import { Add, Clear, Transpose, Undo } from "./headerElements";
import * as S from "./parts";

export const PlayerHeader = () => {
  return (
    <S.PlayerHeaderWrapper>
      <Transpose />
      <div style={{ width: 100 }}>
        <MasterTargetNotesSelect />
      </div>
      <div style={{ width: 500 }}>
        <MasterShapeExplorer />
      </div>
      <Undo />
      <Clear />
      <Add />
    </S.PlayerHeaderWrapper>
  );
};

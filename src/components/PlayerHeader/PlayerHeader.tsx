import { MasterNoteMatrix } from "../NoteMatrix/MasterNoteMatrix";
import { MasterShapeExplorer } from "../ShapeExplorer/MasterShapeExplorer";
import { Add, Clear, Transpose } from "./headerElements";
import * as S from "./parts";

export const PlayerHeader = () => {
  return (
    <S.PlayerHeaderWrapper>
      <Transpose />
      <MasterNoteMatrix />
      <div style={{ width: 500 }}>
        <MasterShapeExplorer />
      </div>
      <Clear />
      <Add />
    </S.PlayerHeaderWrapper>
  );
};

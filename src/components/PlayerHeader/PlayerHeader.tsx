import { useShapePlayerStore, useUiStore } from "@/store";
import { MasterShapeExplorer } from "../ShapeExplorer/MasterShapeExplorer";
import { MasterTargetNotesSelect } from "../TargetNotesSelect/MasterTargetNotesSelect";
import { Add, Clear, Transpose } from "./headerElements";
import * as S from "./parts";
import { Edit } from "./headerElements/Edit/Edit";

export const PlayerHeader = () => {
  const isEditShapeView = useUiStore((s) => s.isEditShapeView);
  const isListEmpty = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length === 0,
  );

  return (
    <S.PlayerHeaderWrapper $isListEmpty={isListEmpty}>
      {!isListEmpty && <Edit $w={4} />}

      {isEditShapeView && (
        <>
          <Transpose />
          <S.MasterTargetNotesSelectWrapper>
            <MasterTargetNotesSelect />
          </S.MasterTargetNotesSelectWrapper>
        </>
      )}

      {!isEditShapeView && !isListEmpty && <S.CounterPlaceHolder />}

      {!isEditShapeView && !isListEmpty && (
        <S.SliderWrapper>
          <MasterShapeExplorer />
        </S.SliderWrapper>
      )}

      {/* <Undo /> */}
      <S.Buttons>
        <Clear />
        <Add />
      </S.Buttons>
    </S.PlayerHeaderWrapper>
  );
};

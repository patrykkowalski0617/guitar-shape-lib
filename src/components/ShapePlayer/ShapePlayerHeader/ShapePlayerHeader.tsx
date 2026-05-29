import { useShapePlayerStore, useUiStore } from "@/store";
import { Clear, Transpose } from "./headerElements";
import * as S from "./parts";
import { MasterTargetNotesSelect } from "@/components/TargetNotesSelect/MasterTargetNotesSelect";
import { MasterShapeExplorer } from "@/components/ShapeExplorer/MasterShapeExplorer";

export const ShapePlayerHeader = () => {
  const isListEmpty = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length === 0,
  );
  const selectedViewIndices = useUiStore((s) => s.selectedViewIndices);

  return (
    <S.PlayerHeaderWrapper $isListEmpty={isListEmpty}>
      {selectedViewIndices.includes(0) && <S.LedPlaceHolder />}

      {!selectedViewIndices.includes(1) &&
        !selectedViewIndices.includes(6) &&
        !selectedViewIndices.includes(7) &&
        selectedViewIndices.includes(8) && (
          <S.ShortBasePlaceHolder>Short</S.ShortBasePlaceHolder>
        )}

      {(selectedViewIndices.includes(1) || selectedViewIndices.includes(2)) && (
        <Transpose />
      )}

      {(selectedViewIndices.includes(6) ||
        (selectedViewIndices.includes(1) &&
          selectedViewIndices.includes(2))) && (
        <S.KeyAndShapePlaceHolder>
          KeyAndShapePlaceHolder
        </S.KeyAndShapePlaceHolder>
      )}

      {selectedViewIndices.includes(3) && (
        <S.MasterTargetNotesSelectWrapper>
          <MasterTargetNotesSelect />
        </S.MasterTargetNotesSelectWrapper>
      )}

      {selectedViewIndices.includes(4) && (
        <S.CounterPlaceHolder>CounterPlaceHolder</S.CounterPlaceHolder>
      )}

      {selectedViewIndices.includes(5) && (
        <S.SliderWrapper>
          <MasterShapeExplorer />
        </S.SliderWrapper>
      )}

      {selectedViewIndices.includes(6) && <Clear />}

      {selectedViewIndices.includes(7) && <S.GrabPlaceHolder />}
    </S.PlayerHeaderWrapper>
  );
};

import { useShapePlayerStore, useUiStore } from "@/store";
import { Clear, Transpose } from "./headerElements";
import * as S from "./parts";
import { MasterTargetNotesSelect } from "@/components/TargetNotesSelect/MasterTargetNotesSelect";
import { MasterShapeExplorer } from "@/components/ShapeExplorer/MasterShapeExplorer";
import { FadeInOut } from "@/components/ui";

export const ShapePlayerHeader = () => {
  const isListEmpty = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length === 0,
  );
  const hasListOnlyOneElemnt = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length < 2,
  );
  const selectedViewIndices = useUiStore((s) => s.selectedViewIndices);

  return (
    <FadeInOut isVisible={!isListEmpty} isPersistent>
      <S.PlayerHeaderWrapper>
        {selectedViewIndices.includes(0) && <S.LedPlaceHolder />}

        {!selectedViewIndices.includes(1) &&
          !selectedViewIndices.includes(6) &&
          !selectedViewIndices.includes(7) &&
          selectedViewIndices.includes(8) && (
            <S.ShortBasePlaceHolder>Short</S.ShortBasePlaceHolder>
          )}

        {(selectedViewIndices.includes(1) ||
          selectedViewIndices.includes(2)) && <Transpose />}

        {(selectedViewIndices.includes(6) ||
          (selectedViewIndices.includes(1) &&
            selectedViewIndices.includes(2))) && (
          <S.ShapePlaceHolder>ShapePlaceHolder</S.ShapePlaceHolder>
        )}

        {selectedViewIndices.includes(3) && (
          <FadeInOut isVisible={!hasListOnlyOneElemnt} isKeepSpace isPersistent>
            <S.MasterTargetNotesSelectWrapper>
              <MasterTargetNotesSelect />
            </S.MasterTargetNotesSelectWrapper>
          </FadeInOut>
        )}

        {selectedViewIndices.includes(4) && (
          <S.CounterPlaceHolder>CounterPlaceHolder</S.CounterPlaceHolder>
        )}

        {selectedViewIndices.includes(5) && (
          <S.SliderWrapper>
            <MasterShapeExplorer />
          </S.SliderWrapper>
        )}

        <FadeInOut isVisible={!hasListOnlyOneElemnt} isKeepSpace isPersistent>
          {selectedViewIndices.includes(6) && <Clear />}
        </FadeInOut>

        {selectedViewIndices.includes(7) && <S.GrabPlaceHolder />}
      </S.PlayerHeaderWrapper>
    </FadeInOut>
  );
};

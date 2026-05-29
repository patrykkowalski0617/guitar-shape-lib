import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";
import * as S from "./parts";
import { SideSliderDrawer } from "@/components/ui";
import { useBricksMultiRangeSlider } from "./useBricksMultiRangeSlider";

export const BricksMultiRangeSlider = () => {
  const {
    isListHasOneElement,
    brickIndexes,
    handleChange,
    hasNoBricksToDisplay,
    activeRange,
  } = useBricksMultiRangeSlider();

  if (hasNoBricksToDisplay) return null;

  return (
    <S.MultiRangeSliderWrapper $isDisbled={isListHasOneElement}>
      <SideSliderDrawer>
        <MultiRangeSlider
          values={brickIndexes}
          range={activeRange}
          onChange={handleChange}
          orientation="vertical"
        />
      </SideSliderDrawer>
    </S.MultiRangeSliderWrapper>
  );
};

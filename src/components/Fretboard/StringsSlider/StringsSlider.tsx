import { StepSlider } from "@/components/ui/StepSlider/StepSlider";
import { StepSliderTicks } from "@/components/ui/StepSlider/StepSliderTicks";
import { useControlsStore } from "@/store";
import * as S from "./parts";
import type { StringIndex } from "../constants";

const STRING_MAP: Record<number, StringIndex[]> = {
  0: [0, 1, 2, 3, 4, 5],
  1: [0, 1, 2],
  2: [1, 2, 3],
  3: [2, 3, 4],
  4: [3, 4, 5],
};

export function StringSlider() {
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const setVisibleStrings = useControlsStore(
    (state) => state.setVisibleStrings,
  );

  const currentKey = Number(
    Object.keys(STRING_MAP).find(
      (key) =>
        JSON.stringify(STRING_MAP[Number(key)]) ===
        JSON.stringify(visibleStrings),
    ) || 0,
  );

  const maxSteps = Object.keys(STRING_MAP).length - 1;

  const handleValueChange = (newVal: number[]) => {
    const logicalValue = maxSteps - newVal[0];
    const newStrings = STRING_MAP[logicalValue];

    if (newStrings) {
      setVisibleStrings(newStrings);
    }
  };

  return (
    <S.StringSliderWrapper>
      <StepSlider
        orientation="vertical"
        min={0}
        max={maxSteps}
        step={1}
        value={[maxSteps - currentKey]}
        onValueChange={handleValueChange}
        thumbSize={20}
      >
        <StepSliderTicks effectiveMax={maxSteps} orientation="vertical" />
      </StepSlider>
    </S.StringSliderWrapper>
  );
}

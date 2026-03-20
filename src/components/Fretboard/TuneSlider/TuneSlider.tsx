import { useTuneSliderLogic } from "./hooks/useTuneSliderLogic";
import * as S from "./parts";
import { StepSlider } from "./StepSlider";

export default function TuneSlider() {
  const { options, sliderValue, handleValueChange } = useTuneSliderLogic();

  return (
    <S.ShapeExplorerWrapper>
      <StepSlider
        value={sliderValue}
        options={options}
        step={1}
        onValueChange={handleValueChange}
      />
    </S.ShapeExplorerWrapper>
  );
}

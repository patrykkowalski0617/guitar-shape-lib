import { useTuneSliderLogic } from "./hooks/useTuneSliderLogic";
import { StepSlider } from "./StepSlider";

export default function TuneSlider() {
  const { options, sliderValue, handleValueChange } = useTuneSliderLogic();

  return (
    <StepSlider
      value={sliderValue}
      options={options}
      step={1}
      onValueChange={handleValueChange}
    />
  );
}

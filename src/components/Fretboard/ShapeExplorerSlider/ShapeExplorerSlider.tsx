import { useShapeExplorerLogic } from "./hooks/useShapeExplorerLogic";
import * as S from "./parts";
import { StepSlider } from "./StepSlider";

export default function ShapeExplorerSlider() {
  const {
    options,
    sliderValue,
    userListIndexes,
    isDisabled,
    handleValueChange,
  } = useShapeExplorerLogic();

  return (
    <S.ShapeExplorerWrapper>
      <StepSlider
        key={isDisabled ? "disabled" : "enabled"}
        value={sliderValue}
        options={options}
        step={1}
        userListIndexes={userListIndexes}
        onValueChange={handleValueChange}
        disabled={isDisabled}
      />
    </S.ShapeExplorerWrapper>
  );
}

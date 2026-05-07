import { useShapeExplorerLogic } from "../hooks/useShapeExplorerLogic";
import { StepSlider } from "../../ui/StepSlider/StepSlider";
import * as S from "./parts";

export default function ShapeExplorerSlider() {
  const {
    options,
    sliderValue,
    userListIndexes,
    isDisabled,
    handleValueChange,
    handleMouseDown,
    handleMouseUp,
  } = useShapeExplorerLogic();

  return (
    <S.ShapeExplorerWrapper>
      <StepSlider
        value={sliderValue}
        options={options}
        step={1}
        userListIndexes={userListIndexes}
        onValueChange={handleValueChange}
        disabled={isDisabled}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
      />
    </S.ShapeExplorerWrapper>
  );
}

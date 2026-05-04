import { usePersistentUnlock } from "@/hooks";
import { useShapeExplorerLogic } from "../hooks/useShapeExplorerLogic";
import * as S from "./parts";
import { StepSlider } from "./StepSlider";

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

  const isTemporarlyDisabled = usePersistentUnlock(isDisabled);

  return (
    <S.ShapeExplorerWrapper
      $isTemporarlyDisabled={isTemporarlyDisabled}
      $isDisabled={isDisabled}
    >
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

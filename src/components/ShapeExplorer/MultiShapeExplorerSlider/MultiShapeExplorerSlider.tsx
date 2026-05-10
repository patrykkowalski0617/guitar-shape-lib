import { useShapeExplorerLogic } from "../hooks/useShapeExplorerLogic";
import { useStepSliderLogic } from "../hooks/useStepSliderLogic";
import { StepSlider } from "../../ui/StepSlider/StepSlider";
import { StepSliderTicks } from "../../ui/StepSlider/StepSliderTicks";
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

  const { effectiveMax, highlightedId, handleToggleAction, clearHighlight } =
    useStepSliderLogic({ value: sliderValue, options });

  const hasNoOptions = options.length === 0;
  const sliderMax = hasNoOptions ? 1 : effectiveMax;

  return (
    <S.ShapeExplorerWrapper>
      <StepSlider
        value={hasNoOptions ? [0] : sliderValue}
        max={sliderMax}
        step={1}
        disabled={isDisabled || hasNoOptions}
        onValueChange={handleValueChange}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
        onThumbDoubleClick={handleToggleAction}
      >
        {!hasNoOptions && (
          <StepSliderTicks
            options={options}
            effectiveMax={sliderMax}
            userListIndexes={userListIndexes}
            highlightedId={highlightedId}
            onHighlightEnd={clearHighlight}
            isSliderDisabled={isDisabled}
          />
        )}
      </StepSlider>
    </S.ShapeExplorerWrapper>
  );
}

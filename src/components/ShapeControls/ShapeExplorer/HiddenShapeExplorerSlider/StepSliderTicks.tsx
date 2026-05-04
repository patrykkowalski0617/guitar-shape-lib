import type { ShapeLocation } from "../helpers/getOrderedShapeLocations";
import { Tick } from "./parts";

interface StepSliderTicksProps {
  options: ShapeLocation[];
  effectiveMax: number;
  userListIndexes: number[];
  highlightedId: string | number | null;
  onHighlightEnd: () => void;
}

export function StepSliderTicks({
  options,
  effectiveMax,
  userListIndexes,
  highlightedId,
  onHighlightEnd,
}: StepSliderTicksProps) {
  const calculateTickPosition = (stepNumber: number) =>
    (stepNumber / effectiveMax) * 100;

  return (
    <>
      {options.map((option, index) => {
        const stepNumber = index + 1;
        const isUserStep = userListIndexes.includes(stepNumber);
        const isVisible = highlightedId !== null && option.id === highlightedId;

        return (
          <Tick
            key={option.id + index}
            $isUserList={isUserStep}
            $isVisible={isVisible}
            onAnimationEnd={isVisible ? onHighlightEnd : undefined}
            style={{ left: `${calculateTickPosition(stepNumber)}%` }}
          />
        );
      })}
    </>
  );
}

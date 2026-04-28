import { useState, useEffect } from "react";
import type { ShapeLocation } from "../helpers/getOrderedShapeLocations";
import { Tick } from "./parts";

interface StepSliderTicksProps {
  options: ShapeLocation[];
  effectiveMax: number;
  userListIndexes: number[];
  highlightedId: string | number | null;
  onHighlightEnd: () => void;
  isSliderDisabled: boolean;
}

export function StepSliderTicks({
  options,
  effectiveMax,
  userListIndexes,
  highlightedId,
  onHighlightEnd,
  isSliderDisabled,
}: StepSliderTicksProps) {
  const [isOpacityAnimationLocked, setIsOpacityLocked] = useState(false);

  const opacityAnimationDuration = 500;

  if (isSliderDisabled && isOpacityAnimationLocked) {
    setIsOpacityLocked(false);
  }

  useEffect(() => {
    if (isSliderDisabled) return;

    const timer = setTimeout(() => {
      setIsOpacityLocked(true);
    }, opacityAnimationDuration);

    return () => clearTimeout(timer);
  }, [isSliderDisabled, isOpacityAnimationLocked]);

  const calculateTickPosition = (stepNumber: number) =>
    (stepNumber / effectiveMax) * 100;

  return (
    <>
      <Tick key={0} $opacityAnimationDuration={opacityAnimationDuration} />
      {options.map((option, index) => {
        const stepNumber = index + 1;
        const isUserStep = userListIndexes.includes(stepNumber);
        const isHighlighted =
          highlightedId !== null && option.id === highlightedId;

        return (
          <Tick
            key={option.id + index}
            $isUserList={isUserStep}
            $isHighlighted={isHighlighted}
            $isOpacityAnimationLocked={isOpacityAnimationLocked}
            $opacityAnimationDuration={opacityAnimationDuration}
            onAnimationEnd={isHighlighted ? onHighlightEnd : undefined}
            style={{ left: `${calculateTickPosition(stepNumber)}%` }}
          />
        );
      })}
    </>
  );
}

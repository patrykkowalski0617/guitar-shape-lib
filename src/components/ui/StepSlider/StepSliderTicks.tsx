import { useState, useEffect } from "react";
import { Tick } from "./parts";

interface StepSliderTicksProps {
  effectiveMax: number;
  options?: { id: string | number }[];
  userListIndexes?: number[];
  highlightedId?: string | number | null;
  onHighlightEnd?: () => void;
  isSliderDisabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

export function StepSliderTicks({
  options,
  effectiveMax,
  userListIndexes = [],
  highlightedId = null,
  onHighlightEnd,
  isSliderDisabled = false,
  orientation = "horizontal",
}: StepSliderTicksProps) {
  const [isOpacityAnimationLocked, setIsOpacityLocked] = useState(false);
  const opacityAnimationDuration = 500;
  const isVertical = orientation === "vertical";

  useEffect(() => {
    if (isSliderDisabled) return;
    const timer = setTimeout(
      () => setIsOpacityLocked(true),
      opacityAnimationDuration,
    );
    return () => clearTimeout(timer);
  }, [isSliderDisabled]);

  const calculateTickPosition = (stepNumber: number) =>
    (stepNumber / effectiveMax) * 100;

  const tickIndexes = Array.from({ length: effectiveMax + 1 }, (_, i) => i);

  return (
    <>
      {tickIndexes.map((stepNumber) => {
        const isUserStep = userListIndexes.includes(stepNumber);
        const currentOption = options?.[stepNumber - 1];
        const isVisible =
          highlightedId !== null && currentOption?.id === highlightedId;

        const tickStyle: React.CSSProperties = isVertical
          ? {
              bottom: `${calculateTickPosition(stepNumber)}%`,
              left: "50%",
              top: "auto",
              transform: "translate(-50%, 50%)",
            }
          : {
              left: `${calculateTickPosition(stepNumber)}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            };

        return (
          <Tick
            key={stepNumber}
            $isUserList={isUserStep}
            $isVisible={isVisible}
            $isOpacityAnimationLocked={isOpacityAnimationLocked}
            $opacityAnimationDuration={opacityAnimationDuration}
            onAnimationEnd={isVisible ? onHighlightEnd : undefined}
            style={tickStyle}
          />
        );
      })}
    </>
  );
}

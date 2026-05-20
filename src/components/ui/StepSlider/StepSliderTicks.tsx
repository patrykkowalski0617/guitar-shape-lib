import { useState, useEffect } from "react";
import { Tick } from "./parts";
import type { ShapeVariantDataKeys } from "@/data";

interface StepSliderTicksProps {
  effectiveMax: number;
  options?: ShapeVariantDataKeys[];
  userListIndexes?: number[];
  highlightedId?: string | number | null;
  onHighlightEnd?: () => void;
  isSliderDisabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

export function StepSliderTicks({
  effectiveMax,
  userListIndexes = [],
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
        const isVisible = false;

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

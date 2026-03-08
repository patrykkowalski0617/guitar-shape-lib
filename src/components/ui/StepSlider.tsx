import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import styled from "styled-components";
import type { ShapeLocation } from "../Fretboard/ShapeExplorerSlider/helpers/getOrderedShapeLocations";

const Tick = styled.div<{ $isCurrent: boolean; $isUserList: boolean }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  &:first-child {
    display: none;
  }

  background-color: ${({ $isUserList }) =>
    $isUserList
      ? "var(--accent)"
      : "color-mix(in oklab, var(--muted) 80%, var(--foreground))"};
  box-shadow: ${({ $isUserList }) => {
    if ($isUserList) return "0 0 8px var(--accent)";
    return "none";
  }};

  transition: all 0.05s ease-in-out;
`;

interface StepSliderProps extends React.ComponentProps<
  typeof SliderPrimitive.Root
> {
  userListIndexes?: number[];
  options: ShapeLocation[];
}

function StepSlider({
  className,
  value,
  min = 0,
  options,
  style,
  userListIndexes = [],
  ...props
}: StepSliderProps) {
  const currentValue = value?.[0] ?? 0;
  const thumbSize = 25;
  const max = options.length;

  const effectiveMax = max ?? 0;
  const shouldRenderTicks = effectiveMax > 0;

  const isNotInitialPosition = currentValue !== 0;

  const calculateTickPosition = (stepIndex: number) => {
    const positionInPercentage = (stepIndex / effectiveMax) * 100;
    return positionInPercentage;
  };

  return (
    <SliderPrimitive.Root
      min={min}
      max={effectiveMax}
      value={value}
      style={style}
      className={cn(
        "relative flex w-full touch-none items-center select-none h-8",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative grow h-0.5 w-full bg-muted/50 rounded-full"
        style={{ margin: `0 ${thumbSize / 2}px` }}
      >
        {shouldRenderTicks &&
          options.map((option, index) => {
            const isActiveStep = index === currentValue && isNotInitialPosition;
            const isUserStep = userListIndexes.includes(index);
            const leftOffset = calculateTickPosition(index);

            return (
              <Tick
                key={index}
                $isCurrent={isActiveStep}
                $isUserList={isUserStep}
                style={{ left: `${leftOffset}%` }}
              />
            );
          })}
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        onDoubleClick={() => {
          console.log(options[currentValue].id);
        }}
        className={cn(
          "block rounded-full border-2 shadow-lg border-primary",
          "cursor-grab active:cursor-grabbing",
          "hover:scale-120 transition-transform",
          "data-[disabled]:scale-100 data-[disabled]:border-primary/35",
          "data-[disabled]:left-[calc(10px)] data-[disabled]:relative",
          "focus:outline-none focus:ring-0 focus:ring-offset-0",
          "focus-visible:ring-2 focus-visible:ring-accent/70",
          "focus-visible:ring-offset-0",
          currentValue === 0 ? "bg-background" : "bg-transparent",
        )}
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
        }}
      />
    </SliderPrimitive.Root>
  );
}

export { StepSlider };

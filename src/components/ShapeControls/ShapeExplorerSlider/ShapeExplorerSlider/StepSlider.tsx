import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { StepSliderTicks } from "./StepSliderTicks";
import { useStepSliderLogic } from "../hooks/useStepSliderLogic";
import type { ShapeLocation } from "../helpers/getOrderedShapeLocations";

interface StepSliderProps extends React.ComponentProps<
  typeof SliderPrimitive.Root
> {
  userListIndexes?: number[];
  options: ShapeLocation[];
}

export function StepSlider({
  className,
  value,
  min = 0,
  options,
  style,
  userListIndexes = [],
  ...props
}: StepSliderProps) {
  const { effectiveMax, highlightedId, handleToggleAction, clearHighlight } =
    useStepSliderLogic({ value, options });

  const thumbSize = 28;

  const hasNoOptions = options.length === 0;
  const sliderMax = hasNoOptions ? 1 : effectiveMax;
  const sliderValue = hasNoOptions ? [0] : value;
  const isSliderDisabled = props.disabled || hasNoOptions;

  return (
    <SliderPrimitive.Root
      min={min}
      max={sliderMax}
      value={sliderValue}
      style={style}
      disabled={isSliderDisabled}
      className={cn(
        "relative flex w-full touch-none items-center select-none h-8",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative grow h-[3px] w-full bg-background/70 rounded-full"
        style={{
          margin: `0 ${thumbSize / 2}px`,
        }}
      >
        <StepSliderTicks
          options={options}
          effectiveMax={sliderMax}
          userListIndexes={userListIndexes}
          highlightedId={highlightedId}
          onHighlightEnd={clearHighlight}
          isSliderDisabled={isSliderDisabled}
        />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        onDoubleClick={handleToggleAction}
        className={cn(
          "block rounded-full border-1 border-accent",
          "cursor-grab active:cursor-grabbing hover:scale-110 transition-transform",
          "data-[disabled]:border-border data-[disabled]:scale-100 data-[disabled]:cursor-default",
          "focus:outline-none focus:ring-0 focus-visible:ring-2",
          "focus-visible:ring-accent/70",
        )}
        style={{
          width: thumbSize,
          height: thumbSize,
          boxShadow: `2px 2px 8px 2px var(--background), 
          0px 0px 2px 1px var(--border) inset,
          0px 0px 3px 2px var(--contrast) inset
          `,
        }}
      />
    </SliderPrimitive.Root>
  );
}

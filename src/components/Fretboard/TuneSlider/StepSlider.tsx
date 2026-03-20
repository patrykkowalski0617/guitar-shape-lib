import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { StepSliderTicks } from "./StepSliderTicks";
import { useStepSliderLogic } from "./hooks/useStepSliderLogic";

interface StepSliderProps extends React.ComponentProps<
  typeof SliderPrimitive.Root
> {
  userListIndexes?: number[];
  options: string[];
}

export function StepSlider({
  className,
  value,
  min = 0,
  options,
  style,
  ...props
}: StepSliderProps) {
  const { effectiveMax } = useStepSliderLogic({ value, options });

  const thumbSize = 25;

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
        className="relative grow h-0.5 w-full bg-muted/50 rounded-full"
        style={{ margin: `0 ${thumbSize / 2}px` }}
      >
        <StepSliderTicks options={options} effectiveMax={sliderMax} />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        className={cn(
          "block rounded-full border-2 shadow-lg border-primary",
          "cursor-grab active:cursor-grabbing hover:scale-120 transition-transform",
          "data-[disabled]:scale-100 data-[disabled]:border-primary/35",
          "focus:outline-none focus:ring-0 focus-visible:ring-2",
          "focus-visible:ring-accent/70",
        )}
        style={{ width: thumbSize, height: thumbSize }}
      />
    </SliderPrimitive.Root>
  );
}

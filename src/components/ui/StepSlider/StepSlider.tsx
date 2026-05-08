import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface StepSliderProps extends React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> {
  thumbSize?: number;
  onThumbDoubleClick?: () => void;
}

export function StepSlider({
  className,
  thumbSize = 28,
  children,
  onThumbDoubleClick,
  orientation = "horizontal",
  ...props
}: StepSliderProps) {
  const isVertical = orientation === "vertical";

  return (
    <SliderPrimitive.Root
      orientation={orientation}
      className={cn(
        "relative flex touch-none select-none items-center",
        isVertical ? "flex-col h-full w-8" : "flex-row w-full h-8",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow bg-background/70 rounded-full",
          isVertical ? "w-[3px] h-full" : "h-[3px] w-full",
        )}
        style={{
          margin: isVertical ? `${thumbSize / 2}px 0` : `0 ${thumbSize / 2}px`,
        }}
      >
        {children}
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        onDoubleClick={onThumbDoubleClick}
        className={cn(
          "block rounded-full border-1 border-accent",
          "cursor-grab active:cursor-grabbing hover:scale-110 transition-transform",
          "data-[disabled]:border-border data-[disabled]:scale-100 data-[disabled]:cursor-default data-[disabled]:grayscale",
          "focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-accent/70",
        )}
        style={{
          opacity: props.disabled ? "0.5" : "1",
          width: thumbSize,
          height: thumbSize,
          boxShadow: `2px 2px 8px 2px var(--background), 
                      0px 0px 2px 1px var(--border) inset,
                      0px 0px 3px 2px var(--contrast) inset`,
        }}
      />
    </SliderPrimitive.Root>
  );
}

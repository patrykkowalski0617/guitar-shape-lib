import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import styled from "styled-components";
import { transitionTime } from "@/data";

const Tick = styled.div<{ $isCurrent: boolean }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $isCurrent }) => ($isCurrent ? "var(--slider-color)" : "var(--muted)")};
  box-shadow: ${({ $isCurrent }) => ($isCurrent ? "0 0 12px var(--slider-color)" : "none")};
  transition: all ${transitionTime}ms ease-in-out;
  z-index: 50;
`;

function DiscreteSlider({
  className,
  value,
  min = 0,
  max = 100,
  style,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const currentValue = value?.[0] ?? 0;
  const thumbSize = 20;

  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      value={value}
      style={style}
      className={cn("relative flex w-full touch-none items-center select-none h-8", className)}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative grow h-0.5 w-full bg-muted/20 rounded-full"
        style={{ margin: `0 ${thumbSize / 2}px` }}
      >
        {max > 0 &&
          Array.from({ length: max + 1 }).map((_, i) => (
            <Tick
              key={i}
              $isCurrent={i === currentValue && currentValue !== 0}
              style={{ left: `${(i / max) * 100}%` }}
            />
          ))}
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        className={cn(
          "block rounded-full border-2 bg-background shadow-lg",
          "cursor-grab active:cursor-grabbing z-10",
          "hover:scale-110 transition-transform",
          "focus:outline-none focus:ring-0 focus:ring-offset-0",
          "focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-0",
        )}
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          borderColor: "var(--slider-color)",
        }}
      />
    </SliderPrimitive.Root>
  );
}

export { DiscreteSlider };

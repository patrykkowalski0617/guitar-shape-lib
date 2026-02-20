import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import styled from "styled-components";

const Tick = styled.div<{ $isCurrent: boolean; $isLearned: boolean }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $isCurrent, $isLearned }) =>
    $isCurrent
      ? "var(--primary)"
      : $isLearned
        ? "var(--accent)"
        : "color-mix(in oklab, var(--muted) 80%, var(--foreground))"};
  box-shadow: ${({ $isCurrent, $isLearned }) => {
    if ($isCurrent) return "0 0 8px var(--primary)";
    if ($isLearned) return "0 0 8px var(--accent)";
    return "none";
  }};
  transition: all 0.05s ease-in-out;
  z-index: ${({ $isCurrent }) => ($isCurrent ? " 10" : "")};
`;

interface DiscreteSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  learnedIndexes?: number[];
}

function DiscreteSlider({
  className,
  value,
  min = 0,
  max = 100,
  style,
  learnedIndexes = [],
  ...props
}: DiscreteSliderProps) {
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
              $isLearned={learnedIndexes.includes(i)}
              style={{ left: `${(i / max) * 100}%` }}
            />
          ))}
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        className={cn(
          "block rounded-full border-2 bg-background shadow-lg",
          "cursor-grab active:cursor-grabbing z-10",
          "hover:scale-110 transition-transform",
          "data-[disabled]:scale-100 data-[disabled]:opacity-20",
          "focus:outline-none focus:ring-0 focus:ring-offset-0",
          "focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-0",
        )}
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          borderColor: "var(--primary)",
        }}
      />
    </SliderPrimitive.Root>
  );
}

export { DiscreteSlider };

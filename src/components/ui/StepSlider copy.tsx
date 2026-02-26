import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import styled, { keyframes } from "styled-components";

const flash = keyframes`
  0% {
    box-shadow: 0 0 0px var(--accent);
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    box-shadow: 0 0 20px var(--accent), 0 0 10px var(--accent);
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    box-shadow: 0 0 8px var(--accent);
    transform: translate(-50%, -50%) scale(1);
  }
`;

const Tick = styled.div<{ $isCurrent: boolean; $isLearned: boolean }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  &:first-child {
    display: none;
  }

  background-color: ${({ $isLearned }) =>
    $isLearned ? "var(--accent)" : "color-mix(in oklab, var(--muted) 80%, var(--foreground))"};

  box-shadow: ${({ $isLearned }) => ($isLearned ? "0 0 8px var(--accent)" : "none")};

  transition:
    background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  z-index: ${({ $isCurrent }) => ($isCurrent ? "10" : "")};

  &[data-animate="true"] {
    animation: ${flash} 0.5s ease-out forwards;
  }
`;

interface StepSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  learnedIndexes?: number[];
  animatingIndexes?: number[];
}

function StepSlider({
  className,
  value,
  min = 0,
  max = 100,
  style,
  learnedIndexes = [],
  animatingIndexes = [],
  ...props
}: StepSliderProps) {
  const currentValue = value?.[0] ?? 0;
  const thumbSize = 25;

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
        className="relative grow h-0.5 w-full bg-muted/50 rounded-full"
        style={{ margin: `0 ${thumbSize / 2}px` }}
      >
        {max > 0 &&
          Array.from({ length: max + 1 }).map((_, i) => (
            <Tick
              key={i}
              $isCurrent={i === currentValue && currentValue !== 0}
              $isLearned={learnedIndexes.includes(i)}
              data-animate={animatingIndexes.includes(i) ? "true" : "false"}
              style={{ left: `${(i / max) * 100}%` }}
            />
          ))}
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        className={cn(
          "block rounded-full border-2 bg-background shadow-lg border-primary",
          "cursor-grab active:cursor-grabbing z-10",
          "hover:scale-120 transition-transform",
          "data-[disabled]:scale-100 data-[disabled]:border-primary/35 data-[disabled]:left-[calc(10px)] data-[disabled]:relative",
          "focus:outline-none focus:ring-0 focus:ring-offset-0",
          "focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-0",
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

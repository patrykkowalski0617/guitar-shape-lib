import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useGesture } from "@use-gesture/react";
import { cn } from "@/lib/utils";
import styled, { keyframes, css } from "styled-components";
import type { ShapeLocation } from "../Fretboard/ShapeExplorerSlider/helpers/getOrderedShapeLocations";
import { useProgressStore, useMusicStore } from "@/store";
import { toast } from "sonner";
import { USER_LIST_MESSAGES } from "@/data/constants";

const highlightAnimation = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0px transparent;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.4);
    box-shadow: 0 0 8px 4px var(--accent);
    background-color: var(--accent);
  }
  100% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0px transparent;
  }
`;

const Tick = styled.div<{
  $isCurrent: boolean;
  $isUserList: boolean;
  $isHighlighted: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background-color: ${({ $isUserList }) =>
    $isUserList
      ? "var(--accent)"
      : "color-mix(in oklab, var(--muted) 80%, var(--foreground))"};

  box-shadow: ${({ $isUserList }) =>
    $isUserList ? "0 0 8px var(--accent)" : "none"};

  transition: all 0.05s ease-in-out;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      animation: ${highlightAnimation} 0.6s ease-in-out 1;
      z-index: 10;
    `}
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
  const [highlightedId, setHighlightedId] = React.useState<
    string | number | null
  >(null);
  const lastTapTime = React.useRef<number>(0);

  const { userList, toggleUserList } = useProgressStore();
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );

  const currentValue = value?.[0] ?? 0;
  const thumbSize = 25;

  const effectiveMax = options.length;

  const triggerToggleAction = () => {
    if (currentValue === 0) return;

    const currentOption = options[currentValue - 1];
    const optionId = currentOption?.id;

    if (!optionId) {
      toast(USER_LIST_MESSAGES.SELECT_PROMPT);
      return;
    }

    const currentId = shapeVariantLocationData
      ? `${shapeVariantLocationData.shapeId}-${shapeVariantLocationData.stringId}-${shapeVariantLocationData.variantId}`
      : null;

    if (!currentId) return;

    const isFavorite = userList.includes(currentId);
    toggleUserList(currentId);
    setHighlightedId(optionId);

    const notification = isFavorite
      ? USER_LIST_MESSAGES.REMOVED
      : USER_LIST_MESSAGES.ADDED;
    toast(notification);
  };

  const bind = useGesture(
    {
      onPointerUp: ({ event }) => {
        const currentTime = Date.now();
        const tapDelay = currentTime - lastTapTime.current;
        const isDoubleTap = tapDelay < 300 && tapDelay > 0;

        if (isDoubleTap) {
          event.stopPropagation();
          triggerToggleAction();
          lastTapTime.current = 0;
        } else {
          lastTapTime.current = currentTime;
        }
      },
    },
    { pointer: { capture: false } },
  );

  const clearHighlight = () => setHighlightedId(null);

  const calculateTickPosition = (stepNumber: number) =>
    (stepNumber / effectiveMax) * 100;

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
        {effectiveMax > 0 &&
          options.map((option, index) => {
            const stepNumber = index + 1;

            const isActiveStep = stepNumber === currentValue;
            const isUserStep = userListIndexes.includes(stepNumber);
            const isHighlighted =
              highlightedId !== null && option.id === highlightedId;

            return (
              <Tick
                key={option.id ?? index}
                $isCurrent={isActiveStep}
                $isUserList={isUserStep}
                $isHighlighted={isHighlighted}
                onAnimationEnd={isHighlighted ? clearHighlight : undefined}
                style={{ left: `${calculateTickPosition(stepNumber)}%` }}
              />
            );
          })}
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        {...bind()}
        className={cn(
          "block rounded-full border-2 shadow-lg border-primary",
          "cursor-grab active:cursor-grabbing",
          "hover:scale-120 transition-transform",
          "data-[disabled]:scale-100 data-[disabled]:border-primary/35",
          "focus:outline-none focus:ring-0",
          "focus-visible:ring-2 focus-visible:ring-accent/70",
          currentValue === 0 ? "bg-background" : "bg-transparent",
        )}
        style={{ width: thumbSize, height: thumbSize }}
      />
    </SliderPrimitive.Root>
  );
}

export { StepSlider };

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import styled, { keyframes, css } from "styled-components";
import { cn } from "@/lib/utils";

const STRING_MAP: Record<number, number[]> = {
  0: [0, 1, 2, 3, 4, 5],
  1: [0, 1, 2],
  2: [1, 2, 3],
  3: [2, 3, 4],
  4: [3, 4, 5],
};

const highlightAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0px transparent; }
  50% { transform: scale(1.2); box-shadow: 0 0 8px 4px var(--secondary); }
  100% { transform: scale(1); box-shadow: 0 0 0 0px transparent; }
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  user-select: none;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 40px;
`;

const LabelText = styled.span`
  font-size: 8px;
  color: #888;
  font-weight: bold;
  text-transform: uppercase;
`;

const ValueText = styled.span`
  font-size: 10px;
  font-family: monospace;
  color: var(--secondary);
`;

const StyledThumb = styled(SliderPrimitive.Thumb)<{ $isAnimating: boolean }>`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--foreground) 0%,
    var(--secondary) 100%
  );
  cursor: grab;
  outline: none;
  border: none;

  box-shadow:
    2px 2px 8px 2px var(--background),
    0px 0px 8px var(--secondary),
    0px 0px 12px var(--secondary);

  &:active {
    cursor: grabbing;
  }

  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      animation: ${highlightAnimation} 0.6s ease-in-out forwards;
    `}
`;

interface StringsSliderProps {
  className?: string;
  onChange?: (val: number[]) => void;
}

export function StringsSlider({ className, onChange }: StringsSliderProps) {
  const [value, setValue] = React.useState([0]); // 0 to góra (index w mapie)
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleValueChange = (newValues: number[]) => {
    const val = newValues[0];
    setValue([val]);
    setIsAnimating(true);

    if (onChange) {
      onChange(STRING_MAP[val]);
    }
  };

  React.useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <ControlWrapper className={className}>
      <LabelBox>
        <LabelText>Strings</LabelText>
        <ValueText>{value[0]}</ValueText>
      </LabelBox>

      <SliderPrimitive.Root
        orientation="vertical"
        min={0}
        max={4}
        step={1}
        value={value}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex flex-col items-center select-none touch-none",
          "h-[120px] w-5",
        )}
      >
        <SliderPrimitive.Track className="relative grow w-[4px] bg-background/70 rounded-full shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]">
          <SliderPrimitive.Range className="absolute w-full bg-transparent" />
        </SliderPrimitive.Track>

        <StyledThumb $isAnimating={isAnimating} aria-label="String selection" />
      </SliderPrimitive.Root>

      <div className="flex flex-col gap-1 min-w-[40px]">
        <div className="text-[8px] font-mono text-muted-foreground uppercase">
          Output
        </div>
        <div className="text-[9px] font-mono text-foreground/60">
          [{STRING_MAP[value[0]].join(",")}]
        </div>
      </div>
    </ControlWrapper>
  );
}

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as S from "./parts";

interface StepSliderProps extends React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> {
  thumbSize?: number;
  onThumbDoubleClick?: () => void;
}

export function StepSlider({
  thumbSize = 28,
  children,
  onThumbDoubleClick,
  orientation = "horizontal",
  ...props
}: StepSliderProps) {
  const isVertical = orientation === "vertical";

  return (
    <S.SliderRoot orientation={orientation} $isVertical={isVertical} {...props}>
      <S.SliderTrack $isVertical={isVertical} $thumbSize={thumbSize}>
        {children}
      </S.SliderTrack>

      <S.SliderThumb
        onDoubleClick={onThumbDoubleClick}
        $thumbSize={thumbSize}
        disabled={props.disabled}
      />
    </S.SliderRoot>
  );
}

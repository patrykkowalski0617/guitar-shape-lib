import React, { useRef } from "react";
import * as S from "./parts";
import { useSliderLogic, type SliderRange } from "./useSliderLogic";

interface SegmentedRangeSliderProps<T> {
  values: T[];
  range: SliderRange;
  onChange: (range: SliderRange) => void;
}

export const SegmentedRangeSlider = <T extends React.ReactNode>({
  values,
  range,
  onChange,
}: SegmentedRangeSliderProps<T>) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { startDragging } = useSliderLogic(trackRef, values, range, onChange);

  const segmentWidth = 100 / values.length;
  const left = range.start * segmentWidth;
  const width = (range.end - range.start + 1) * segmentWidth;

  return (
    <S.Track ref={trackRef}>
      <S.ActiveRange style={{ left: `${left}%`, width: `${width}%` }}>
        <S.Handle
          onMouseDown={(e) => startDragging("left", e)}
          onTouchStart={(e) => startDragging("left", e)}
        />
        <S.Grab
          onMouseDown={(e) => startDragging("move", e)}
          onTouchStart={(e) => startDragging("move", e)}
        >
          {values[range.start]} - {values[range.end]}
        </S.Grab>
        <S.Handle
          onMouseDown={(e) => startDragging("right", e)}
          onTouchStart={(e) => startDragging("right", e)}
        />
      </S.ActiveRange>
    </S.Track>
  );
};

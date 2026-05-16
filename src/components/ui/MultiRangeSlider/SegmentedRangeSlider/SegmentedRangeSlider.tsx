import React from "react";
import * as S from "./parts";
import {
  useSegmentedRangeSlider,
  type SliderRange,
} from "./useSegmentedRangeSlider";

interface SegmentedRangeSliderProps {
  values: (string | number)[];
  range: SliderRange;
  onChange: (range: SliderRange) => void;
}

export const SegmentedRangeSlider: React.FC<SegmentedRangeSliderProps> = ({
  values,
  range,
  onChange,
}) => {
  const { trackRef, onStart, segmentWidth } = useSegmentedRangeSlider({
    values,
    range,
    onChange,
  });

  const activeRangeStyle = {
    left: `${range.start * segmentWidth}%`,
    width: `${(range.end - range.start + 1) * segmentWidth}%`,
  };

  return (
    <S.Track ref={trackRef}>
      <S.ActiveRange style={activeRangeStyle}>
        <S.Handle
          onMouseDown={(e) => onStart("left", e)}
          onTouchStart={(e) => onStart("left", e)}
        />
        <S.Grab
          onMouseDown={(e) => onStart("move", e)}
          onTouchStart={(e) => onStart("move", e)}
        >
          {values[range.start]} - {values[range.end]}
        </S.Grab>
        <S.Handle
          onMouseDown={(e) => onStart("right", e)}
          onTouchStart={(e) => onStart("right", e)}
        />
      </S.ActiveRange>
    </S.Track>
  );
};

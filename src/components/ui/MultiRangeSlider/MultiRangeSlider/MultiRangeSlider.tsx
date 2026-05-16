import React from "react";
import { Track, ActiveRange, Grab, Handle } from "./parts";
import { useMultiRangeSlider, type Range } from "./useMultiRangeSlider";

interface MultiRangeSliderProps {
  values: any[];
  range: Range;
  onChange: (range: Range) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  values,
  range,
  onChange,
}) => {
  const totalSegments = values.length;
  const { trackRef, startDragging } = useMultiRangeSlider(
    totalSegments,
    range,
    onChange,
  );

  const segmentWidthPercentage = 100 / totalSegments;
  const activeRangeLeft = range.start * segmentWidthPercentage;
  const activeRangeWidth =
    (range.end - range.start + 1) * segmentWidthPercentage;

  return (
    <Track ref={trackRef}>
      <ActiveRange
        style={{
          left: `${activeRangeLeft}%`,
          width: `${activeRangeWidth}%`,
        }}
      >
        <Handle
          onMouseDown={(e) => startDragging("left", e)}
          onTouchStart={(e) => startDragging("left", e)}
        />
        <Grab
          onMouseDown={(e) => startDragging("move", e)}
          onTouchStart={(e) => startDragging("move", e)}
        />
        <Handle
          onMouseDown={(e) => startDragging("right", e)}
          onTouchStart={(e) => startDragging("right", e)}
        />
      </ActiveRange>
    </Track>
  );
};

export default MultiRangeSlider;

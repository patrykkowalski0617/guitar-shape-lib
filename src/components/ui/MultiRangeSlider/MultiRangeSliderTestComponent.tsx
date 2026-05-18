import { useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import { type Range } from "./MultiRangeSlider/useMultiRangeSlider";

const MultiRangeSliderTestComponent = () => {
  const [ranges, setRanges] = useState<Record<string, Range>>({
    A: { start: 1, end: 3 },
    B: { start: 0, end: 2 },
  });

  const configs = {
    A: [0, 1, 2, 3, 4, 5],
    B: [10, 20, 30, 40],
  };

  const updateSingleRange = (key: string, newRange: Range) => {
    setRanges((prev) => ({ ...prev, [key]: newRange }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>A</p>
      <MultiRangeSlider
        values={configs.A}
        range={ranges.A}
        onChange={(r) => updateSingleRange("A", r)}
      />

      <p>B</p>
      <MultiRangeSlider
        values={configs.B}
        range={ranges.B}
        onChange={(r) => updateSingleRange("B", r)}
      />
    </div>
  );
};

export default MultiRangeSliderTestComponent;

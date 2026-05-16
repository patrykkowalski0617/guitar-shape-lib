import React, { useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import MasterMultiRangeSlider from "./MasterMultiRangeSlider/MasterMultiRangeSlider";
import { type Range } from "./MultiRangeSlider/useMultiRangeSlider";

const TestComponent = () => {
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
      <p>Master</p>
      <MasterMultiRangeSlider
        masterValues={[0, 1, 2, 3, 4, 5]}
        ranges={ranges}
        configs={configs}
        onRangesChange={setRanges}
      />

      <hr />

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

export default TestComponent;

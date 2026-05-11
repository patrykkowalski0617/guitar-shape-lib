import { useState, useMemo } from "react";
import { MultiStepSlider } from "./MultiStepSlider";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
`;

const Label = styled.p`
  color: #444;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 14px;
  margin: 0;
`;

export function MultiStepSliderTest() {
  const [rangeA, setRangeA] = useState<number[]>([4, 6]);
  const [rangeB, setRangeB] = useState<number[]>([10, 12]);

  const configA = { min: 0, max: 15 };
  const configB = { min: 0, max: 20 };

  const masterValue = useMemo(() => {
    const all = [...rangeA, ...rangeB];
    return [Math.min(...all), Math.max(...all)];
  }, [rangeA, rangeB]);

  const validateMasterChange = (nextMasterRange: number[]) => {
    if (nextMasterRange.length < 2) return false;

    const [oldMin, oldMax] = masterValue;
    const [nextMin, nextMax] = nextMasterRange;

    const deltaStart = nextMin - oldMin;
    const deltaEnd = nextMax - oldMax;

    const checkLimit = (
      range: number[],
      config: { min: number; max: number },
    ) => {
      const newMin = range[0] + deltaStart;
      const newMax = range[1] + deltaEnd;
      return !(newMin < config.min || newMax > config.max || newMin > newMax);
    };

    return checkLimit(rangeA, configA) && checkLimit(rangeB, configB);
  };

  const handleMasterChange = (nextMasterRange: number[]) => {
    const [oldMin, oldMax] = masterValue;
    const [nextMin, nextMax] = nextMasterRange;

    const deltaStart = nextMin - oldMin;
    const deltaEnd = nextMax - oldMax;

    if (validateMasterChange(nextMasterRange)) {
      setRangeA([rangeA[0] + deltaStart, rangeA[1] + deltaEnd]);
      setRangeB([rangeB[0] + deltaStart, rangeB[1] + deltaEnd]);
    }
  };

  return (
    <Wrapper>
      <Section style={{ background: "#f8f9ff", borderColor: "#dbeafe" }}>
        <Label>🎚️ MASTER SLIDER (Zakresy [min, max])</Label>
        <MultiStepSlider
          value={masterValue}
          onValueChange={handleMasterChange}
          onBeforeValueChange={validateMasterChange}
          max={20}
          min={0}
        />
      </Section>

      <Section>
        <Label>
          Slider A (Limit 15): {rangeA[0]} - {rangeA[1]}
        </Label>
        <MultiStepSlider
          value={rangeA}
          onValueChange={setRangeA}
          max={configA.max}
          min={configA.min}
        />
      </Section>

      <Section>
        <Label>
          Slider B (Limit 20): {rangeB[0]} - {rangeB[1]}
        </Label>
        <MultiStepSlider
          value={rangeB}
          onValueChange={setRangeB}
          max={configB.max}
          min={configB.min}
        />
      </Section>
    </Wrapper>
  );
}

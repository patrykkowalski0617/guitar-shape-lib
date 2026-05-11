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
  const [rangeB, setRangeB] = useState<number[]>([3, 5]);

  const configA = { min: 0, max: 12 };
  const configB = { min: 0, max: 10 };

  const masterLimits = useMemo(() => {
    return {
      min: Math.min(configA.min, configB.min),
      max: Math.max(configA.max, configB.max),
    };
  }, [configA.min, configA.max, configB.min, configB.max]);

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
      // Sprawdzamy czy przesunięcie nie wybija któregoś slidera poza jego własny config
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
      <Section>
        <Label>
          MASTER SLIDER (Dynamiczne limity: {masterLimits.min} -{" "}
          {masterLimits.max})
        </Label>
        <MultiStepSlider
          value={masterValue}
          onValueChange={handleMasterChange}
          onBeforeValueChange={validateMasterChange}
          // Master teraz bierze wartości z wyliczonego obiektu
          max={masterLimits.max}
          min={masterLimits.min}
        />
      </Section>

      <Section>
        <Label>
          Slider A: {rangeA[0]} - {rangeA[1]}
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
          Slider B: {rangeB[0]} - {rangeB[1]}
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

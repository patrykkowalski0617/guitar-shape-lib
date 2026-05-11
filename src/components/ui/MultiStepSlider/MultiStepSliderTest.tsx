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
  const [stepsA, setStepsA] = useState<number[]>([4, 5, 6]);
  const [stepsB, setStepsB] = useState<number[]>([10, 11, 12]);

  const configA = { min: 0, max: 15 };
  const configB = { min: 0, max: 20 };

  const masterValue = useMemo(() => {
    const combined = [...stepsA, ...stepsB].sort((a, b) => a - b);
    const minV = combined[0] ?? 0;
    const maxV = combined[combined.length - 1] ?? 0;
    const range: number[] = [];
    for (let i = minV; i <= maxV; i++) range.push(i);
    return range;
  }, [stepsA, stepsB]);

  const validateMasterChange = (nextMasterValue: number[]) => {
    if (nextMasterValue.length === 0) return false;

    const oldMin = Math.min(...masterValue);
    const oldMax = Math.max(...masterValue);
    const nextMin = Math.min(...nextMasterValue);
    const nextMax = Math.max(...nextMasterValue);

    const deltaStart = nextMin - oldMin;
    const deltaEnd = nextMax - oldMax;

    const checkSlider = (
      current: number[],
      config: { min: number; max: number },
    ) => {
      const newMin = Math.min(...current) + deltaStart;
      const newMax = Math.max(...current) + deltaEnd;
      return !(newMin < config.min || newMax > config.max || newMin > newMax);
    };

    return checkSlider(stepsA, configA) && checkSlider(stepsB, configB);
  };

  const handleMasterChange = (nextMasterValue: number[]) => {
    const oldMin = Math.min(...masterValue);
    const oldMax = Math.max(...masterValue);
    const nextMin = Math.min(...nextMasterValue);
    const nextMax = Math.max(...nextMasterValue);

    const deltaStart = nextMin - oldMin;
    const deltaEnd = nextMax - oldMax;

    const getNextSteps = (current: number[]) => {
      const newMin = Math.min(...current) + deltaStart;
      const newMax = Math.max(...current) + deltaEnd;
      const res: number[] = [];
      for (let i = newMin; i <= newMax; i++) res.push(i);
      return res;
    };

    if (validateMasterChange(nextMasterValue)) {
      setStepsA(getNextSteps(stepsA));
      setStepsB(getNextSteps(stepsB));
    }
  };

  return (
    <Wrapper>
      <Section style={{ background: "#f8f9ff", borderColor: "#dbeafe" }}>
        <Label>🎚️ MASTER SLIDER (Kontroluje granice A i B)</Label>
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
          Slider A (0-15): {stepsA[0]} - {stepsA[stepsA.length - 1]}
        </Label>
        <MultiStepSlider
          value={stepsA}
          onValueChange={setStepsA}
          max={configA.max}
          min={configA.min}
        />
      </Section>

      <Section>
        <Label>
          Slider B (0-20): {stepsB[0]} - {stepsB[stepsB.length - 1]}
        </Label>
        <MultiStepSlider
          value={stepsB}
          onValueChange={setStepsB}
          max={configB.max}
          min={configB.min}
        />
      </Section>
    </Wrapper>
  );
}

import { useState } from "react";
import { MultiStepSlider } from "./MultiStepSlider";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.p`
  color: #888;
  font-family: sans-serif;
  font-size: 14px;
`;

export function MultiStepSliderTest() {
  const [horizontalSteps, setHorizontalSteps] = useState<number[]>([6]);
  const [verticalSteps, setVerticalSteps] = useState<number[]>([10]);
  const [rangeSteps, setRangeSteps] = useState<number[]>([8]);

  const MAX_STEPS = 15;

  return (
    <Wrapper>
      <Section>
        <Label>Slider A: {horizontalSteps.join(", ")}</Label>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <MultiStepSlider
            value={horizontalSteps}
            onValueChange={setHorizontalSteps}
            max={MAX_STEPS}
          />
        </div>
      </Section>

      <Section>
        <Label>Slider B: {rangeSteps.join(", ")}</Label>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <MultiStepSlider
            value={rangeSteps}
            onValueChange={setRangeSteps}
            max={20}
          />
        </div>
      </Section>

      <Section>
        <Label>Slider C: {verticalSteps.join(", ")}</Label>
        <div style={{ height: "400px", paddingLeft: "50px" }}>
          <MultiStepSlider
            value={verticalSteps}
            onValueChange={setVerticalSteps}
            max={MAX_STEPS}
            orientation="vertical"
          />
        </div>
      </Section>
    </Wrapper>
  );
}

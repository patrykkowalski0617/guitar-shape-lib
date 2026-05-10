import { useState } from "react";
import { MultiStepSlider } from "./MultiStepSlider";

import styled from "styled-components";

const AppWrapper = styled.div`
  width: 80%;
`;

export function MultiStepSliderTest() {
  const [activeSteps, setActiveSteps] = useState<number[]>([5]);
  const MAX_STEPS = 15;

  const options = Array.from({ length: MAX_STEPS }, (_, i) => ({ id: i }));

  return (
    <AppWrapper>
      <h2>MultiStep Slider: Click-to-Fill</h2>
      <p style={{ color: "#888" }}>Wybrane kroki: {activeSteps.join(", ")}</p>
      <div style={{ width: "40%", margin: "40px 0" }}>
        <MultiStepSlider
          value={activeSteps}
          onValueChange={setActiveSteps}
          max={MAX_STEPS}
          thumbSize={30}
          effectiveMax={MAX_STEPS}
          options={options}
        />
      </div>
      <div style={{ height: "300px", margin: "40px 0" }}>
        <MultiStepSlider
          value={activeSteps}
          onValueChange={setActiveSteps}
          max={MAX_STEPS}
          thumbSize={30}
          effectiveMax={MAX_STEPS}
          options={options}
          orientation="vertical"
        />
      </div>
    </AppWrapper>
  );
}

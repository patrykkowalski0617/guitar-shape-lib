import React, { useState } from "react";
import { MultiStepSlider } from "./MultiStepSlider";

import styled from "styled-components";
import { MultiStepSliderTicks } from "./MultiStepSliderTicks";

const AppWrapper = styled.div``;

export function MultiStepSliderTest() {
  // Zaczynamy od jednego punktu
  const [activeSteps, setActiveSteps] = useState<number[]>([5]);
  const MAX_STEPS = 15;

  const options = Array.from({ length: MAX_STEPS }, (_, i) => ({ id: i }));

  return (
    <AppWrapper>
      <h2>MultiStep Slider: Click-to-Fill</h2>
      <p style={{ color: "#888" }}>Wybrane kroki: {activeSteps.join(", ")}</p>

      <div style={{ width: "500px", margin: "40px 0" }}>
        <MultiStepSlider
          value={activeSteps}
          onValueChange={setActiveSteps}
          max={MAX_STEPS}
          thumbSize={28}
        >
          <MultiStepSliderTicks effectiveMax={MAX_STEPS} options={options} />
        </MultiStepSlider>
      </div>
    </AppWrapper>
  );
}

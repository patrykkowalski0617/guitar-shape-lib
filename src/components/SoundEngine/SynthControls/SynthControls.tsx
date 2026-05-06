import { useState } from "react";
import { synthConfig, updateMasterParams } from "../synth";
import { useKnob } from "./hooks/useKnobs";
import * as S from "./parts";

interface KnobProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}

const Knob = ({ label, value, min, max, step, onChange }: KnobProps) => {
  const { rotation, percentage, handleMouseDown } = useKnob({
    value,
    min,
    max,
    step,
    onChange,
  });

  return (
    <S.ControlWrapper>
      <S.LabelBox>
        <S.LabelText>{label}</S.LabelText>
        <S.ValueText>{percentage}%</S.ValueText>
      </S.LabelBox>

      <S.KnobOuter onMouseDown={handleMouseDown}>
        <S.IndicatorContainer $rotation={rotation}>
          <S.IndicatorMark />
        </S.IndicatorContainer>
      </S.KnobOuter>
    </S.ControlWrapper>
  );
};

export const SynthControls = () => {
  const [, setTick] = useState(0);

  const handleChange = (key: keyof typeof synthConfig, val: number) => {
    synthConfig[key] = val;
    updateMasterParams();
    setTick((t) => t + 1);
  };

  return (
    <S.PanelContainer>
      <Knob
        label="Gain"
        value={synthConfig.gain}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => handleChange("gain", v)}
      />

      <Knob
        label="Mix"
        value={synthConfig.oscMix}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => handleChange("oscMix", v)}
      />

      <Knob
        label="Freq"
        value={synthConfig.filterFreq}
        min={50}
        max={10000}
        step={10}
        onChange={(v) => handleChange("filterFreq", v)}
      />

      <Knob
        label="Verb"
        value={synthConfig.reverbMix}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => handleChange("reverbMix", v)}
      />
    </S.PanelContainer>
  );
};

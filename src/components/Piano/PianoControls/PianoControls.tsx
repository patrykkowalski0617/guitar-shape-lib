import { useRef, useState } from "react";
import { useKnob } from "./hooks/useKnobs";
import * as S from "./parts";
import {
  synthConfig,
  updateMasterParams,
} from "@/components/SoundEngine/synth";

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

export const PianoControls = () => {
  const [, setTick] = useState(0);
  const [isOn, setIsOn] = useState(true);
  const lastGain = useRef(synthConfig.gain);

  const handleChange = (key: keyof typeof synthConfig, val: number) => {
    synthConfig[key] = val;
    if (isOn) updateMasterParams();
    setTick((t) => t + 1);
  };

  const togglePower = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (!newState) {
      lastGain.current = synthConfig.gain;
      synthConfig.gain = 0;
    } else {
      synthConfig.gain = lastGain.current || 0.5;
    }
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
        label="Color"
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

      <S.PowerSwitchWrapper>
        <S.LabelBox>
          <S.LabelText>Power</S.LabelText>
          <S.StatusLed
            $active={isOn}
            style={{ marginTop: "2px", alignSelf: "flex-end" }}
          />
        </S.LabelBox>
        <S.SwitchContainer $active={isOn} onClick={togglePower}>
          <S.ToggleHebel $active={isOn} />
        </S.SwitchContainer>
      </S.PowerSwitchWrapper>
    </S.PanelContainer>
  );
};

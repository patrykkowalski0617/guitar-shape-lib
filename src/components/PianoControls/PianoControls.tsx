import { useState } from "react";
import * as S from "./parts";
import {
  synthConfig,
  updateMasterParams,
} from "@/components/SoundEngine/synth";
import { useControlsStore } from "@/store";
import { Switch } from "./Switch";
import { Knob } from "./Knob";

export const PianoControls = () => {
  const togglePianoOn = useControlsStore((state) => state.togglePianoOn);
  const isPianoOn = useControlsStore((state) => state.isPianoOn);

  const [, setTick] = useState(0);

  const handleChange = (key: keyof typeof synthConfig, val: number) => {
    synthConfig[key] = val;
    updateMasterParams();

    setTick((t) => t + 1);
  };

  const handleTogglePower = () => {
    togglePianoOn();
    setTimeout(() => updateMasterParams(), 0);
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

      <Switch
        label="Power"
        isActive={isPianoOn}
        onClick={handleTogglePower}
        glowColor="var(--secondary)"
      />
    </S.PanelContainer>
  );
};

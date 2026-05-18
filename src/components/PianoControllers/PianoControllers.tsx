import { useState } from "react";
import * as S from "./parts";
import {
  synthConfig,
  updateMasterParams,
} from "@/components/SoundEngine/synth";
import {
  useControllersStore,
  useMetronomeStore,
  useShapePlayerStore,
} from "@/store";
import { Switch } from "./Switch";
import { Knob } from "./Knob";

export const PianoControllers = () => {
  const togglePianoOn = useControllersStore((state) => state.togglePianoOn);
  const isPianoOn = useControllersStore((state) => state.isPianoOn);
  const playback = useControllersStore((state) => state.playback);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const shapePlayerBricks = useShapePlayerStore(
    (state) => state.shapePlayerBricks,
  );

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
        label="Attack"
        value={synthConfig.attackTime}
        min={0.01}
        max={0.4}
        step={0.01}
        onChange={(v) => handleChange("attackTime", v)}
      />

      <Knob
        label="Freq"
        value={synthConfig.filterFreq}
        min={200}
        max={8000}
        step={50}
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

      <Knob
        label="Dly Time"
        value={synthConfig.delayTime}
        min={0.05}
        max={1.0}
        step={0.005}
        onChange={(v) => handleChange("delayTime", v)}
      />

      <Knob
        label="Dly Fdbk"
        value={synthConfig.delayFeedback}
        min={0}
        max={0.92}
        step={0.01}
        onChange={(v) => handleChange("delayFeedback", v)}
      />

      <Knob
        label="Dly Mix"
        value={synthConfig.delayMix}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => handleChange("delayMix", v)}
      />

      <Switch
        label="Power"
        isActive={
          isPianoOn || (playback && isPlaying && !!shapePlayerBricks.length)
        }
        onClick={handleTogglePower}
        glowColor="var(--secondary)"
      />
    </S.PanelContainer>
  );
};

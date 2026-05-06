import { useState } from "react";
import { synthConfig, updateMasterParams } from "../synth";

export const SynthControls = () => {
  const [, setTick] = useState(0);

  const handleChange = (key: keyof typeof synthConfig, val: number) => {
    synthConfig[key] = val;
    updateMasterParams();
    setTick((t) => t + 1); // Rerender
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#222",
        color: "#fff",
        borderRadius: "8px",
        display: "flex",
      }}
    >
      <h3>Synth Settings</h3>

      <label style={{ width: 100, display: "block" }}>
        Master Gain: {synthConfig.gain.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={synthConfig.gain}
        onChange={(e) => handleChange("gain", parseFloat(e.target.value))}
      />

      <label style={{ width: 100, display: "block" }}>
        Osc Mix (Saw/Square): {synthConfig.oscMix.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={synthConfig.oscMix}
        onChange={(e) => handleChange("oscMix", parseFloat(e.target.value))}
      />

      <label style={{ width: 100, display: "block" }}>
        Filter Freq: {synthConfig.filterFreq}Hz
      </label>
      <input
        type="range"
        min="50"
        max="10000"
        step="10"
        value={synthConfig.filterFreq}
        onChange={(e) => handleChange("filterFreq", parseFloat(e.target.value))}
      />

      <label style={{ width: 100, display: "block" }}>
        Reverb Mix: {synthConfig.reverbMix.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={synthConfig.reverbMix}
        onChange={(e) => handleChange("reverbMix", parseFloat(e.target.value))}
      />
    </div>
  );
};

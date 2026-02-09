import { useSettingsStore } from "@/store/useSettingsStore";
import { ControlLabel, ControlWrapper } from "@/parts";
import styled from "styled-components";
import { getTSD_HSLColor } from "@/utils/getTSD_HSLColor";
import { Button } from "@/components/ui/button";
import ColorDots from "./ColorDots";

const PresetsGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
  flex-wrap: wrap;
`;

type ColorPreset = [number, number, number];
const COLOR_PRESETS: ColorPreset[] = [
  [230, 335, 110],
  [52, 258, 119],
  [117, 15, 243],
  [228, 42, 360],
];

export default function ColorsPresetsSetting() {
  const { tonicColor, setTonicColor, subdominantColor, setSubdominantColor, dominantColor, setDominantColor } =
    useSettingsStore();

  const handlePresetClick = (values: [number, number, number]) => {
    setTonicColor(values[0]);
    setSubdominantColor(values[1]);
    setDominantColor(values[2]);
  };

  return (
    <ControlWrapper $isFullWidth>
      <ControlLabel>Color Presets</ControlLabel>
      <PresetsGrid>
        {COLOR_PRESETS.map((preset) => {
          const isActive = tonicColor === preset[0] && subdominantColor === preset[1] && dominantColor === preset[2];

          return (
            <Button
              variant={isActive ? "active" : "borderOnly"}
              key={String(preset)}
              onClick={() => handlePresetClick(preset)}
            >
              <ColorDots
                colors={[getTSD_HSLColor(preset[0]), getTSD_HSLColor(preset[1]), getTSD_HSLColor(preset[2])]}
                size={18}
              />
            </Button>
          );
        })}
      </PresetsGrid>
    </ControlWrapper>
  );
}

import { useSettingsStore } from "@/store/useSettingsStore";
import { ControlLabel, ControlWrapper } from "@/parts";
import styled from "styled-components";
import TriColorCircle from "./TriColorCircle";
import { getTSD_HSLColor } from "@/utils/getTSD_HSLColor";
import { Button as Btn } from "@/components/ui/button";

const PresetsGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Button = styled(Btn)`
  position: relative;
  overflow: hidden;
  width: 50px;
  ${({ $isActive }) => ($isActive ? "border: 6px solid var(--background)" : "")}
`;

const ColorCircle = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

type ColorPreset = [number, number, number];
const COLOR_PRESETS: ColorPreset[] = [
  [230, 335, 110],
  [200, 320, 40],
  [30, 60, 15],
  [180, 210, 250],
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
              variant={"outline"}
              $isActive={isActive}
              key={String(preset)}
              onClick={() => handlePresetClick(preset)}
            >
              <ColorCircle>
                <TriColorCircle
                  size={60}
                  colors={[getTSD_HSLColor(preset[0]), getTSD_HSLColor(preset[1]), getTSD_HSLColor(preset[2])]}
                />
              </ColorCircle>
            </Button>
          );
        })}
      </PresetsGrid>
    </ControlWrapper>
  );
}

import { useSettingsStore } from "@/store/useSettingsStore";
import { ControlLabel } from "@/parts";
import * as S from "@/components/Settings/parts";
import { getTSD_HSLColor } from "@/utils/getTSD_HSLColor";
import ColorDots from "./ColorDots";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ColorPreset = [number, number, number];

const COLOR_PRESETS: ColorPreset[] = [
  [5, 120, 235],
  [15, 130, 260],
  [45, 155, 300],
  [65, 175, 335],

  [235, 5, 120],
  [260, 15, 130],
  [300, 45, 155],
  [335, 65, 175],

  [120, 235, 5],
  [130, 260, 15],
  [155, 300, 45],
  [175, 335, 65],

  [5, 235, 120],
  [15, 260, 130],
  [45, 300, 155],
  [65, 335, 175],

  [235, 120, 5],
  [260, 130, 15],
  [300, 155, 45],
  [335, 175, 65],

  [120, 5, 235],
  [130, 15, 260],
  [155, 45, 300],
  [175, 65, 335],
];

export default function ColorsPresetsSetting() {
  const { tonicColor, setTonicColor, subdominantColor, setSubdominantColor, dominantColor, setDominantColor } =
    useSettingsStore();

  const currentPresetValue = `${tonicColor},${subdominantColor},${dominantColor}`;

  const isPresetSelected = COLOR_PRESETS.some((preset) => preset.join(",") === currentPresetValue);

  const handleValueChange = (value: string) => {
    if (!value) return;
    const [t, s, d] = value.split(",").map(Number);
    setTonicColor(t);
    setSubdominantColor(s);
    setDominantColor(d);
  };

  return (
    <S.ControlWrapper>
      <ControlLabel>Color Presets</ControlLabel>
      <Select value={isPresetSelected ? currentPresetValue : ""} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Custom colors" />
        </SelectTrigger>
        <SelectContent>
          {COLOR_PRESETS.map((preset) => {
            const val = preset.join(",");
            return (
              <SelectItem key={val} value={val}>
                <ColorDots
                  colors={[getTSD_HSLColor(preset[0]), getTSD_HSLColor(preset[1]), getTSD_HSLColor(preset[2])]}
                  size={18}
                />
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </S.ControlWrapper>
  );
}

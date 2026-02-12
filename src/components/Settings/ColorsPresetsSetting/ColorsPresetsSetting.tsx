import { useSettingsStore } from "@/store/useSettingsStore";
import { ControlLabel } from "@/parts";
import * as S from "@/components/Settings/parts";
import { getTSD_HSLColor } from "@/utils/getTSD_HSLColor";
import ColorDots from "./ColorDots";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ColorPreset = [number, number, number];

const COLOR_PRESETS: ColorPreset[] = [
  [230, 335, 110],
  [222, 289, 98],
  [117, 15, 243],
  [52, 258, 119],
  [228, 42, 360],
];

export default function ColorsPresetsSetting() {
  const { tonicColor, setTonicColor, subdominantColor, setSubdominantColor, dominantColor, setDominantColor } =
    useSettingsStore();

  const currentPresetValue = `${tonicColor},${subdominantColor},${dominantColor}`;

  const handleValueChange = (value: string) => {
    const [t, s, d] = value.split(",").map(Number);
    setTonicColor(t);
    setSubdominantColor(s);
    setDominantColor(d);
  };

  return (
    <S.ControlWrapper>
      <ControlLabel>Color Presets</ControlLabel>
      <Select value={currentPresetValue} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select colors..." />
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

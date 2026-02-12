import { useSettingsStore } from "@/store/useSettingsStore";
import { ControlLabel } from "@/parts";
import * as S from "@/components/Settings/parts";
import { getTSD_HSLColor } from "@/utils/getTSD_HSLColor";
import ColorDots from "./ColorDots";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COLOR_PRESETS } from "@/utils/constants";

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

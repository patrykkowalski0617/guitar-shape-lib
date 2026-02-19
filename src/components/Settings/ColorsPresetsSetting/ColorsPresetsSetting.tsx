import { useSettingsStore } from "@/store/useSettingsStore";
import { ControlLabel } from "@/parts";
import * as S from "@/components/Settings/ColorsPresetsSetting/parts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { COLOR_PRESETS } from "@/data/constants";
import { getHSLColorFromHue } from "@/utils";
import { ControlWrapper } from "../parts";

export default function ColorsPresetsSetting() {
  const { primaryColor, setPrimaryColor } = useSettingsStore();

  const currentPreset = COLOR_PRESETS.find((p) => p.hue === primaryColor);
  const currentVal = currentPreset ? String(currentPreset.hue) : "";

  const handleValueChange = (value: string) => {
    if (!value) return;
    setPrimaryColor(Number(value));
  };

  return (
    <ControlWrapper>
      <ControlLabel>Primary Color</ControlLabel>
      <Select value={currentVal} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <S.PresetItemWrapper>
            <S.ColorPreviewContainer>
              <S.ColorPreview $color={getHSLColorFromHue(primaryColor)} />
            </S.ColorPreviewContainer>
            <S.Label>{currentPreset ? currentPreset.name : "Custom Color"}</S.Label>
          </S.PresetItemWrapper>
        </SelectTrigger>

        <SelectContent>
          {COLOR_PRESETS.map((preset) => {
            const val = String(preset.hue);
            return (
              <SelectItem key={val} value={val}>
                <S.PresetItemWrapper>
                  <S.ColorPreviewContainer>
                    <S.ColorPreview $color={getHSLColorFromHue(preset.hue)} />
                  </S.ColorPreviewContainer>
                  <S.Label>{preset.name}</S.Label>
                </S.PresetItemWrapper>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}

import { useSettingsStore } from "@/store";
import { ControlLabel } from "@/parts";
import * as S from "@/components/Settings/ColorsPresetsSetting/parts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { COLOR_PRESETS } from "@/data/colorPresets";
import { ControlWrapper } from "../parts";

export default function ColorsPresetsSetting() {
  const { primaryColor, setPrimaryColor } = useSettingsStore();

  const currentPreset = COLOR_PRESETS.find((p) => p.value === primaryColor);
  const currentVal = currentPreset ? String(currentPreset.value) : "";

  const handleValueChange = (value: string) => {
    if (!value) return;
    setPrimaryColor(value);
  };

  return (
    <ControlWrapper>
      <ControlLabel>Primary Color</ControlLabel>
      <Select value={currentVal} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <S.PresetItemWrapper>
            <S.ColorPreviewContainer>
              <S.ColorPreview $color={primaryColor} />
            </S.ColorPreviewContainer>
            <S.Label>{currentPreset ? currentPreset.name : "Custom Color"}</S.Label>
          </S.PresetItemWrapper>
        </SelectTrigger>

        <SelectContent>
          {COLOR_PRESETS.map((preset) => {
            const val = String(preset.value);
            return (
              <SelectItem key={val} value={val}>
                <S.PresetItemWrapper>
                  <S.ColorPreviewContainer>
                    <S.ColorPreview $color={preset.value} />
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

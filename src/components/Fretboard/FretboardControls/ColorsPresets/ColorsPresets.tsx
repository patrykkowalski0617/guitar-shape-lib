import { useSettingsStore } from "@/store";
import * as S from "./parts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { COLOR_PRESETS } from "@/data/colorPresets";

export default function ColorsPresets() {
  const { primaryColor, setPrimaryColor } = useSettingsStore();

  const handleValueChange = (value: string) => {
    if (!value) return;
    setPrimaryColor(value);
  };

  return (
    <S.Wrapper>
      <Select variant="outline" value={primaryColor} onValueChange={handleValueChange}>
        <SelectTrigger>
          <S.PresetItemWrapper>
            <S.ColorPreviewContainer>
              <S.ColorPreviewTriger $color={primaryColor} />
            </S.ColorPreviewContainer>
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
    </S.Wrapper>
  );
}

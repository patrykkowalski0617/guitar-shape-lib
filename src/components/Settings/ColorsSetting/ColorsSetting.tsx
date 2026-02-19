import { useSettingsStore } from "@/store/useSettingsStore";
import { Slider } from "@/components/ui/slider";
import * as S from "./parts";
import { getHSLColorFromHue } from "@/utils";

export default function ColorsSetting() {
  const { primaryColor, setPrimaryColor } = useSettingsStore();

  return (
    <S.ControlWrapper>
      <Slider
        value={[primaryColor]}
        onValueChange={(val) => setPrimaryColor(val[0])}
        max={360}
        style={{ "--slider-color": getHSLColorFromHue(primaryColor) } as React.CSSProperties}
        className="m-0"
      />
    </S.ControlWrapper>
  );
}

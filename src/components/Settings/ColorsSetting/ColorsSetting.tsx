import { useSettingsStore } from "@/store/useSettingsStore";
import { Slider } from "@/components/ui/slider";

import * as S from "./parts";

export default function ColorsSetting() {
  const { tonicColor, setTonicColor, subdominantColor, setSubdominantColor, dominantColor, setDominantColor } =
    useSettingsStore();

  const getHsl = (hue: number) => `hsl(${hue} 70% 50%)`;

  return (
    <>
      <S.ControlWrapper>
        <S.ControlLabel>Tonic</S.ControlLabel>
        <Slider
          value={[tonicColor]}
          onValueChange={(val) => setTonicColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(tonicColor) } as React.CSSProperties}
        />
      </S.ControlWrapper>

      <S.ControlWrapper>
        <S.ControlLabel>Subdominant </S.ControlLabel>
        <Slider
          value={[subdominantColor]}
          onValueChange={(val) => setSubdominantColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(subdominantColor) } as React.CSSProperties}
        />
      </S.ControlWrapper>

      <S.ControlWrapper>
        <S.ControlLabel>Dominant </S.ControlLabel>
        <Slider
          value={[dominantColor]}
          onValueChange={(val) => setDominantColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(dominantColor) } as React.CSSProperties}
          className="m-0"
        />
      </S.ControlWrapper>
    </>
  );
}

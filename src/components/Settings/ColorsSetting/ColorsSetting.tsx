import { useSettingsStore } from "@/store/useSettingsStore";
import { Slider } from "@/components/ui/slider";
import { ControlLabel, ControlWrapper } from "@/parts";

export default function ColorsSetting() {
  const {
    tonicColor,
    setTonicColor,
    subdominantColor,
    setSubdominantColor,
    dominantColor,
    setDominantColor,
  } = useSettingsStore();

  const getHsl = (hue: number) => `hsl(${hue} 70% 50%)`;

  return (
    <>
      <ControlWrapper $isFullWidth>
        <ControlLabel>Tonic Color</ControlLabel>
        <Slider
          value={[tonicColor]}
          onValueChange={(val) => setTonicColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(tonicColor) } as React.CSSProperties}
        />
      </ControlWrapper>

      <ControlWrapper $isFullWidth>
        <ControlLabel>Subdominant Color</ControlLabel>
        <Slider
          value={[subdominantColor]}
          onValueChange={(val) => setSubdominantColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(subdominantColor) } as React.CSSProperties}
        />
      </ControlWrapper>

      <ControlWrapper $isFullWidth>
        <ControlLabel>Dominant Color</ControlLabel>
        <Slider
          value={[dominantColor]}
          onValueChange={(val) => setDominantColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(dominantColor) } as React.CSSProperties}
          className="m-0"
        />
      </ControlWrapper>
    </>
  );
}

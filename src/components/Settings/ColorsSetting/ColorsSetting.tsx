import { useSettingsStore } from "@/store/useSettingsStore";
import { Slider } from "@/components/ui/slider";
import { GroupWrapper, Label } from "@/components/ControlsContainer/ControlsContainer";

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
      <GroupWrapper>
        <Label>Tonic Color</Label>
        <Slider
          value={[tonicColor]}
          onValueChange={(val) => setTonicColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(tonicColor) } as React.CSSProperties}
        />
      </GroupWrapper>

      <GroupWrapper>
        <Label>Subdominant Color</Label>
        <Slider
          value={[subdominantColor]}
          onValueChange={(val) => setSubdominantColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(subdominantColor) } as React.CSSProperties}
        />
      </GroupWrapper>

      <GroupWrapper>
        <Label>Dominant Color</Label>
        <Slider
          value={[dominantColor]}
          onValueChange={(val) => setDominantColor(val[0])}
          max={360}
          style={{ "--slider-color": getHsl(dominantColor) } as React.CSSProperties}
        />
      </GroupWrapper>
    </>
  );
}

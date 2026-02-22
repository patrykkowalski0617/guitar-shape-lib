import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { musicMode, type MusicModeId } from "@/data";
import { ControlWrapper } from "@/parts";

export function ModeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  const currentMode: MusicModeId = isMajorMode ? "major" : "minor";
  const options = Object.entries(musicMode) as [MusicModeId, typeof musicMode.major][];
  return (
    <ControlWrapper>
      <ToggleGroup
        type="single"
        value={currentMode}
        onValueChange={() => {
          setIsMajorMode(!isMajorMode);
        }}
      >
        {options.map(([id, data]) => (
          <ToggleGroupItem key={id} value={id}>
            {data.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ControlWrapper>
  );
}

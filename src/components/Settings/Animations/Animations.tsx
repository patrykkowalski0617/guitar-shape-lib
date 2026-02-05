import { useSettingsStore } from "@/store/useSettingsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ControlLabel, ControlWrapper } from "@/parts";

const LABEL_OPTIONS = [
  {
    id: "animations-on",
    label: "On",
  },
  {
    id: "animations-off",
    label: "Off",
  },
];

export default function Animations() {
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);
  const setAreAnimationOn = useSettingsStore((state) => state.setAreAnimationOn);
  const currentValue = areAnimationsOn ? "animations-on" : "animations-off";

  return (
    <ControlWrapper $isFullWidth>
      <ControlLabel>Animations</ControlLabel>
      <ToggleGroup
        type="single"
        value={currentValue}
        className="w-full md:w-full"
        onValueChange={() => {
          setAreAnimationOn(!areAnimationsOn);
        }}
      >
        {LABEL_OPTIONS.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id} className="flex-1 md:flex-1">
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ControlWrapper>
  );
}

import { useSettingsStore } from "@/store/useSettingsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "@/components/customUI/InputGroup/InputGroup";

const LABEL_OPTIONS = [
  {
    id: "animations-on",
    label: "Animations on",
  },
  {
    id: "animations-off",
    label: "Animations off",
  },
];

export default function Animations() {
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);
  const setAreAnimationOn = useSettingsStore((state) => state.setAreAnimationOn);
  const currentValue = areAnimationsOn ? "animations-on" : "animations-off";

  return (
    <GroupWrapper>
      <Label>Animations on/off</Label>
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
    </GroupWrapper>
  );
}

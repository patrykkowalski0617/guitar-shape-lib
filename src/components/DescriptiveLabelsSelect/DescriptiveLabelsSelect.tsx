import { useMusicStore } from "@/store/useMusicStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";

const LABEL_OPTIONS = [
  {
    id: "standard",
    label: "Fancy XD",
    descriptiveLabel: "Standard music names",
    value: false,
  },
  {
    id: "descriptive",
    label: "Emotional",
    descriptiveLabel: "Descriptive and emotional names",
    value: true,
  },
];

export default function DescriptiveLabelsSelect() {
  const areDescriptiveLabels = useMusicStore((state) => state.areDescriptiveLabels);
  const setAreDescriptiveLabels = useMusicStore((state) => state.setAreDescriptiveLabels);

  const currentValue = areDescriptiveLabels ? "descriptive" : "standard";

  return (
    <GroupWrapper>
      <Label>Labels Type</Label>
      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={(v) => {
          if (v) setAreDescriptiveLabels(v === "descriptive");
        }}
        className="h-10 justify-start border rounded-md p-1 bg-muted/50 border-muted-foreground/20 w-fit"
      >
        {LABEL_OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option.id}
            value={option.id}
            title={option.descriptiveLabel}
            className="h-full px-4 text-xs uppercase font-semibold data-[state=on]:bg-background data-[state=on]:shadow-sm flex flex-col items-center justify-center"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </GroupWrapper>
  );
}

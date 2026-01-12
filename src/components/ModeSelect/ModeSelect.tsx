import { useMusicStore } from "@/store/useMusicStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ModeSelect() {
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const setIsMajorMode = useMusicStore((state) => state.setIsMajorMode);

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Mode
      </span>
      <ToggleGroup
        type="single"
        value={isMajorMode ? "major" : "minor"}
        onValueChange={(value) => {
          if (value) setIsMajorMode(value === "major");
        }}
        className="border rounded-md p-1 bg-muted/50"
      >
        <ToggleGroupItem
          value="major"
          className="px-4 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
        >
          Major
        </ToggleGroupItem>
        <ToggleGroupItem
          value="minor"
          className="px-4 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
        >
          Minor
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

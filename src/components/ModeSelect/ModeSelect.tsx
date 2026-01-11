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
        // Przekształcamy boolean ze stora na string dla UI
        value={isMajorMode ? "major" : "minor"}
        onValueChange={(value) => {
          // Jeśli użytkownik kliknie w już wybrany element, value będzie puste.
          // Sprawdzamy czy wartość istnieje, a potem zamieniamy ją z powrotem na boolean.
          if (value) setIsMajorMode(value === "major");
        }}
        className="border rounded-md p-1 bg-muted/50"
      >
        <ToggleGroupItem
          value="minor"
          className="px-4 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
        >
          Minor
        </ToggleGroupItem>
        <ToggleGroupItem
          value="major"
          className="px-4 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
        >
          Major
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

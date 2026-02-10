import { useControlsStore } from "@/store/useControlsStore";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { UNIFIED_MUSIC_KEYS, roles, type MusicKeyId, type RoleId } from "@/utils";
import { getFilteredShapeOptions } from "../ShapeSelect/helpers/shapeHelpers";

export function RandomizeControls() {
  const { setIsMajorMode, setCurrentKey, setCurrentRoleId, setShape } = useControlsStore();

  const handleRandomize = () => {
    // Mode
    const newIsMajorMode = Math.random() > 0.5;
    setIsMajorMode(newIsMajorMode);

    // Key
    const keyIds = Object.keys(UNIFIED_MUSIC_KEYS) as MusicKeyId[];
    const randomKey = keyIds[Math.floor(Math.random() * keyIds.length)];
    setCurrentKey(randomKey);

    // Function (Role)
    const roleIds = Object.keys(roles) as RoleId[];
    const randomRole = roleIds[Math.floor(Math.random() * roleIds.length)];
    setCurrentRoleId(randomRole);

    // Shape
    const shapeOptions = getFilteredShapeOptions(randomRole, newIsMajorMode);

    if (shapeOptions.length > 0) {
      const randomShape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
      setShape(randomShape.shapeId as string, randomShape.offset);
    }
  };

  return (
    <Button variant="outline" onClick={handleRandomize} className="flex items-center gap-2">
      <Dices className="h-4 w-4" />
      <span>Randomize</span>
    </Button>
  );
}

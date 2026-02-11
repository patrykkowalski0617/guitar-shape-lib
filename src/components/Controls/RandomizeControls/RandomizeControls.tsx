import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { useRandomizeMode } from "./helpers/useRandomizeMode";
import { useRandomizeKey } from "./helpers/useRandomizeKey";
import { useRandomizeRole } from "./helpers/useRandomizeRole";
import { useRandomizeShape } from "./helpers/useRandomizeShape";
import { useRandomizeShapeVariant } from "./helpers/useRandomizeShapeVariant";
import { ControlWrapper } from "@/parts";

export function RandomizeControls() {
  const setRandomMode = useRandomizeMode();
  const setRandomKey = useRandomizeKey();
  const setRandomRole = useRandomizeRole();
  const setRandomShape = useRandomizeShape();
  const setRandomShapeVariant = useRandomizeShapeVariant();

  const handleRandomize = () => {
    const randomIsMajorMode = setRandomMode();
    const randomKey = setRandomKey();
    const randomRole = setRandomRole();

    const { shapeId, offset } = setRandomShape(randomRole, randomIsMajorMode);

    setRandomShapeVariant(randomKey, offset, shapeId);
  };

  return (
    <ControlWrapper>
      <Button variant="outline" onClick={handleRandomize} className="flex items-center gap-2 border-primary/50">
        <Dices className="h-4 w-4" />
        <span>Randomize</span>
      </Button>
    </ControlWrapper>
  );
}

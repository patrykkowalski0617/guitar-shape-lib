import { useEffect, useRef } from "react";
import { Dices } from "lucide-react";
import { useRandomizeMode } from "./hooks/useRandomizeMode";
import { useRandomizeKey } from "./hooks/useRandomizeKey";
import { useRandomizeRole } from "./hooks/useRandomizeRole";
import { useRandomizeShape } from "./hooks/useRandomizeShape";
import { useRandomizeShapeVariant } from "./hooks/useRandomizeShapeVariant";
import { useAddBrick } from "../AddBrickButton/hooks/useAddBrick";
import { useMusicStore, usePlayerStore } from "@/store";
import { iconSize } from "@/components/Controls/parts";
import { Button } from "@/components/ui/button";

export function RandomeButton() {
  const { setRandomMode } = useRandomizeMode();
  const { setRandomKey } = useRandomizeKey();
  const { setRandomRole } = useRandomizeRole();
  const { setRandomShape } = useRandomizeShape();
  const { setRandomShapeVariant } = useRandomizeShapeVariant();
  const { addBrick } = useAddBrick();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const isRandomizeActionActive = useRef(false);

  useEffect(() => {
    const shouldExecuteAddBrick = isRandomizeActionActive.current;

    if (shouldExecuteAddBrick) {
      addBrick();
      isRandomizeActionActive.current = false;
    }
  }, [shapeVariantLocationData, addBrick]);

  if (isPlaying) {
    return null;
  }

  const handleRandomize = () => {
    const randomIsMajorMode = setRandomMode();
    const randomKey = setRandomKey();
    const randomRole = setRandomRole();

    const { shapeId, shapeSemitoneOffsetFromC } = setRandomShape(
      randomRole,
      randomIsMajorMode,
    );

    const isShapeDataValid =
      shapeId !== null && shapeSemitoneOffsetFromC !== null;

    if (isShapeDataValid) {
      isRandomizeActionActive.current = true;
      setRandomShapeVariant(randomKey, shapeSemitoneOffsetFromC, shapeId);
    }
  };

  return (
    <Button variant={"playerOutline"} onClick={handleRandomize}>
      <Dices size={iconSize} />
    </Button>
  );
}

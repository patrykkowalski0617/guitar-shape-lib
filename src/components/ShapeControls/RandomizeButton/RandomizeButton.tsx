import { useEffect, useRef } from "react";
import { Dices } from "lucide-react";
import {
  useRandomizeKey,
  useRandomizeShape,
  useRandomizeShapeVariant,
} from "./hooks";
import { useMusicStore, usePlayerStore } from "@/store";
import { playerIconSize } from "@/components/Player/constants";
import * as S from "./parts";

export function RandomizeButton() {
  const { setRandomKey } = useRandomizeKey();
  const { setRandomShape } = useRandomizeShape();
  const { setRandomShapeVariant } = useRandomizeShapeVariant();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const isRandomizeActionActive = useRef(false);

  useEffect(() => {
    const shouldExecuteAddBrick = isRandomizeActionActive.current;

    if (shouldExecuteAddBrick) {
      isRandomizeActionActive.current = false;
    }
  }, [shapeVariantLocationData]);

  if (isPlaying) {
    return null;
  }

  const handleRandomize = () => {
    const randomKey = setRandomKey();

    const { shapeId, shapeSemitoneOffsetFromC } = setRandomShape();

    const isShapeDataValid =
      shapeId !== null && shapeSemitoneOffsetFromC !== null;

    if (isShapeDataValid) {
      isRandomizeActionActive.current = true;
      setRandomShapeVariant(randomKey, shapeSemitoneOffsetFromC, shapeId);
    }
  };

  return (
    <S.Button variant={"playerOutlineAccent"} onClick={handleRandomize}>
      <Dices size={playerIconSize} />
    </S.Button>
  );
}

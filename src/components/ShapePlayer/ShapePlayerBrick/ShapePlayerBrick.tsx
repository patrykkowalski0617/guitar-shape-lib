import { useState, useMemo } from "react";
import * as S from "./parts";
import { useShapePlayerBrick } from "./hooks/useShapePlayerBrick";
import { ShapeMulitStepSliderExplorer } from "@/components/ShapeMulitStepSliderExplorer/ShapeMulitStepSliderExplorer";
import { Button } from "../ui/parts";
import { useBaseChord, useShape, useUnifiedMusicKey } from "@/hooks";
import { useDataKeyStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";

interface ShapePlayerBrickProps {
  id: string;
}

export const ShapePlayerBrick = ({ id }: ShapePlayerBrickProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    draggingStyles,
    handleRemoveClick,
    brick,
  } = useShapePlayerBrick(id);

  const setSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.setSelectedShapesVariantDataKeys,
  );
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );

  const [range, setRange] = useState<number[]>([0, 0]);

  const unifiedMusicKey = useUnifiedMusicKey({
    unifiedMusicKeysDataKey: brick?.unifiedMusicKeysDataKey,
  });
  const { getBaseChordName } = useBaseChord({
    baseChordDataKey: brick?.baseChordDataKey,
  });
  const { getShapeName } = useShape({
    shapeDataKey: brick?.shapeDataKey,
  });

  const orderedLocations = useMemo(() => {
    if (!brick) return [];
    return getOrderedShapeVariantDataKeys({
      shapeDataKey: brick.shapeDataKey,
      unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
    });
  }, [brick]);

  const selectedShapesVariantDataKeys = useMemo(() => {
    return orderedLocations.slice(range[0], range[1] + 1);
  }, [orderedLocations, range]);

  if (!brick) return null;

  const {
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    shapeDataKey,
    semitoneOffsetFromMajorRoot,
    playLength,
  } = brick;

  const restoreData = () => {
    setBaseChordDataKey(baseChordDataKey);
    setSelectedShapesVariantDataKeys(selectedShapesVariantDataKeys);
  };

  const brickDetails = [` ${playLength}`, `id: ${id.slice(0, 8)}`];

  return (
    <S.ShapePlayerBrickWrapper
      ref={setNodeRef}
      style={draggingStyles}
      onMouseDown={restoreData}
      onMouseUp={restoreData}
    >
      <Button>
        {unifiedMusicKey?.majorName} / {unifiedMusicKey?.relativeMinorName}
      </Button>

      <Button>
        {getBaseChordName({
          unifiedMusicKeysDataKey,
        })}
      </Button>

      <Button>
        {getShapeName({ semitoneOffsetFromMajorRoot, unifiedMusicKeysDataKey })}
      </Button>

      <S.ShapePlayerBrickLabel style={{ whiteSpace: "pre-wrap" }}>
        {brickDetails}
      </S.ShapePlayerBrickLabel>

      <ShapeMulitStepSliderExplorer
        unifiedMusicKeysDataKey={unifiedMusicKeysDataKey}
        baseChordDataKey={baseChordDataKey}
        shapeDataKey={shapeDataKey}
        semitoneOffsetFromMajorRoot={semitoneOffsetFromMajorRoot}
        range={range}
        onRangeChange={setRange}
        orderedLocations={orderedLocations}
      />
      <S.ShapePlayerBrickDeleteButton onClick={handleRemoveClick}>
        Usuń
      </S.ShapePlayerBrickDeleteButton>

      <S.ShapePlayerBrickDragHandle {...attributes} {...listeners}>
        ::
      </S.ShapePlayerBrickDragHandle>
    </S.ShapePlayerBrickWrapper>
  );
};

import { useMusicStore } from "@/store";
import { useShapeExplorerLogic } from "../hooks/useShapeExplorerLogic";
import * as S from "./parts";
import { StepSlider } from "./StepSlider";

export default function ShapeExplorerSlider() {
  const {
    options,
    sliderValue,
    userListIndexes,
    isDisabled,
    handleValueChange,
    handleMouseDown,
    handleMouseUp,
  } = useShapeExplorerLogic();
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 300, top: 50 }}>
        {shapeVariantLocationData.stringId} {shapeVariantLocationData.variantId}
      </div>
      <S.ShapeExplorerWrapper>
        <StepSlider
          value={sliderValue}
          options={options}
          step={1}
          userListIndexes={userListIndexes}
          onValueChange={handleValueChange}
          disabled={isDisabled}
          onPointerDown={handleMouseDown}
          onPointerUp={handleMouseUp}
        />
      </S.ShapeExplorerWrapper>
    </div>
  );
}

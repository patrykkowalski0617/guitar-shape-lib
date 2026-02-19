import { useMemo } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes } from "@/utils";
import { ControlWrapper } from "@/parts";
import { getOrderedShapeLocations } from "./helpers/getOrderedShapeLocations";
import { DiscreteSlider } from "@/components/ui/DiscreteSlider";

export function ShapeExplorerSlider() {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const offset = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);

  const currentLocation = useMusicStore((state) => state.currentShapeVariantLocationData);
  const setCurrentLocation = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const rootNoteName = useMemo(() => {
    if (offset === null) return null;
    return getNotes({ firstNote: currentKeyId })[offset % 12].sharpNoteName;
  }, [currentKeyId, offset]);

  const options = useMemo(() => getOrderedShapeLocations(currentShapeId, rootNoteName), [currentShapeId, rootNoteName]);

  const currentIndex = useMemo(() => {
    if (!currentLocation) return 0;
    const foundIdx = options.findIndex(
      (opt) =>
        opt.fretIndex === currentLocation.fretIndex &&
        opt.stringId === currentLocation.stringId &&
        opt.variantId === currentLocation.variantId,
    );
    return foundIdx !== -1 ? foundIdx + 1 : 0;
  }, [currentLocation, options]);

  return (
    <ControlWrapper style={{ width: "96%", maxWidth: "unset", margin: "16px auto" }}>
      <DiscreteSlider
        value={[currentIndex]}
        max={options.length}
        step={1}
        onValueChange={(v) => {
          const val = v[0];
          setCurrentLocation(val === 0 ? null : options[val - 1]);
        }}
        disabled={!currentShapeId || options.length === 0}
        style={
          {
            "--slider-color": "var(--primary)",
          } as React.CSSProperties
        }
      />

      <div className="flex justify-between w-full px-1 mt-2">
        <span className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">Off</span>
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
          {currentIndex > 0 ? `Location ${currentIndex}` : "Explorer"}
        </span>
        <span className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">{options.length} Pos</span>
      </div>
    </ControlWrapper>
  );
}

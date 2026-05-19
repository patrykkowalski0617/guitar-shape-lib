import { GUITAR_SHAPES, type GuitarShapes } from "@/data";
import { useDataKeyStore } from "@/store";
import { MiniCarousel } from "../ui/MiniCarousel/MiniCarousel";

const ShapeCarousel = () => {
  const activeShapeDataKey = useDataKeyStore((state) => state.shapeDataKey);
  const shapeKeys = Object.keys(GUITAR_SHAPES) as (keyof GuitarShapes)[];

  return (
    <MiniCarousel
      items={shapeKeys}
      activeId={activeShapeDataKey}
      label="GuitarShapes"
      activeLabel="Current guitarShape"
      getItemId={(key) => String(key)}
      renderItem={(key) => {
        const guitarShape = GUITAR_SHAPES[key];
        const isArpeggio = guitarShape.type.toLowerCase().includes("arpeggio");
        const displayLabel = isArpeggio
          ? `X${guitarShape.label}`
          : guitarShape.label;
        return (
          <>
            {displayLabel} {guitarShape.type}
          </>
        );
      }}
    />
  );
};

export default ShapeCarousel;

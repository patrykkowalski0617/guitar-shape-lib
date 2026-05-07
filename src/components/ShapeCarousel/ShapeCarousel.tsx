import { SHAPES, type Shapes } from "@/data";
import { useControlsStore } from "@/store";
import { MiniCarousel } from "../ui/MiniCarousel/MiniCarousel";

const ShapeCarousel = () => {
  const activeShapeId = useControlsStore((state) => state.shapeId);
  const shapeKeys = Object.keys(SHAPES) as (keyof Shapes)[];

  return (
    <MiniCarousel
      items={shapeKeys}
      activeId={activeShapeId}
      label="Shapes"
      activeLabel="Current shape"
      getItemId={(key) => String(key)}
      renderItem={(key) => {
        const shape = SHAPES[key];
        const isArpeggio = shape.type.toLowerCase().includes("arpeggio");
        const displayLabel = isArpeggio ? `X${shape.label}` : shape.label;
        return (
          <>
            {displayLabel} {shape.type}
          </>
        );
      }}
    />
  );
};

export default ShapeCarousel;

import { useControlsStore } from "@/store";
import { shapes, type Shapes } from "@/data";

export function useActiveShape() {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);

  if (!currentShapeId) return null;

  return shapes[currentShapeId as keyof Shapes] || null;
}

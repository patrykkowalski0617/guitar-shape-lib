import { type GuitarShapeDataKey } from "@/data";
import { GUITAR_SHAPES } from "@/data/GUITAR_SHAPES";
import { useDataKeyStore } from "@/store";

export const useGuitarShape = (providedKey?: GuitarShapeDataKey | null) => {
  const storeKey = useDataKeyStore((s) => s.guitarShapeDataKey);
  const key = providedKey ?? storeKey;
  if (!key) return undefined;
  return GUITAR_SHAPES[key];
};

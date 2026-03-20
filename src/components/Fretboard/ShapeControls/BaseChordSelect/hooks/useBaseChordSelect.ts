import { useControlsStore, useMusicStore } from "@/store";
import { type BaseChorId, type RoleId, roles } from "@/data";
import { isGlobalRole } from "@/utils";

export function useBaseChordSelect() {
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const baseChordId = useControlsStore((state) => state.baseChordId);

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);

    const isGlobal = isGlobalRole(value as RoleId);

    if (isGlobal) {
      setBaseChordId(null);
    }

    setBaseChordId(value as BaseChorId);
  };

  return {
    currentValue: baseChordId,
    handleValueChange,
    globalRoles: {
      matchingKey: roles["all-matching-key"],
    },
  };
}

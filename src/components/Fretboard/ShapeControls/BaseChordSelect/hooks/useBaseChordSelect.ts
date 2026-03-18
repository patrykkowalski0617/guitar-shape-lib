import { useMusicStore } from "@/store";
import { type RoleId, roles } from "@/data";
import { isGlobalRole } from "@/utils";
import { useBaseChordSetter } from "@/hooks";
import { useState } from "react";

export function useBaseChordSelect() {
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setBaseChord = useBaseChordSetter();
  const [baseChordIndex, setBaseChordIndex] = useState<
    string | "all-matching-key"
  >("all-matching-key");

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);
    setBaseChordIndex(value);

    const isGlobal = isGlobalRole(value as RoleId);

    if (isGlobal) {
      setBaseChord(-1);
    }

    setBaseChord(Number(value));
  };

  return {
    currentValue: baseChordIndex,
    handleValueChange,
    globalRoles: {
      matchingKey: roles["all-matching-key"],
    },
  };
}

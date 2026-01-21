import { type JSX, useMemo } from "react";
import * as S from "./parts";
import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { numberOfKeys } from "../helpers/constants";

const getEveryNthElement = <T,>(array: readonly T[], step: number, startIndex: number = 0): T[] =>
  array.slice(startIndex).filter((_, index) => index % step === 0);

type Role = "none" | "tonic" | "subdominant" | "dominant";

const VISIBLE_INDEXES_MAP: Record<"major" | "minor", Record<Role, readonly number[]>> = {
  major: {
    none: [3, 5, 7, 8, 10, 12, 14],
    tonic: [3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24],
    subdominant: [3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26, 27, 29],
    dominant: [3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26, 27, 29, 31],
  },
  minor: {
    none: [0, 2, 3, 5, 7, 8, 10],
    tonic: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20],
    subdominant: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26],
    dominant: [0, 2, 3, 5, 7, 8, 11, 12, 14, 15, 17, 19, 20, 23, 24, 26, 27],
  },
} as const;

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;
  const basePositionKeyIndex = 5; //- it is first A
  const position = basePositionKeyIndex + templateOffset;

  const visibleIndexes = useMemo(() => {
    const modeKey = isMajorMode ? "major" : "minor";
    const roleKey = currentRoleId ?? "none";
    return VISIBLE_INDEXES_MAP[modeKey][roleKey as keyof (typeof VISIBLE_INDEXES_MAP)["major"]];
  }, [isMajorMode, currentRoleId]);

  const highlightRole = useMemo(() => {
    if (!currentRoleId) return [] as number[];

    const config = {
      tonic: { step: 2, start: 0 },
      subdominant: { step: 2, start: 3 },
      dominant: { step: 2, start: 4 },
    } as const;

    const { step, start } = config[currentRoleId as keyof typeof config];
    return getEveryNthElement(visibleIndexes, step, start);
  }, [visibleIndexes, currentRoleId]);

  return (
    <S.TemplateWrapper
      $numberOfKeys={numberOfKeys}
      $areAnimationsOn={areAnimationsOn}
      $position={position}
    >
      {Array.from({ length: 33 }).map((_, i) => {
        const roleIndex = highlightRole.indexOf(i);
        const isHighlighted = roleIndex !== -1 && !!currentRoleId;
        const intervalValue = isHighlighted ? roleIndex * 2 + 1 : null;

        return (
          <S.Marker
            key={i}
            $step={i}
            $numberOfKeys={numberOfKeys}
            $isVisible={visibleIndexes.includes(i)}
            $highlightRole={isHighlighted ? currentRoleId : "none"}
            $roleInterval={intervalValue ? String(intervalValue) : ""}
            $areAnimationsOn={areAnimationsOn}
          />
        );
      })}
    </S.TemplateWrapper>
  );
}

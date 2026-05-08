import { useControlsStore } from "@/store";
import * as S from "./parts";
import type { StringIndex } from "../constants";

const STRINGS: StringIndex[] = [0, 1, 2, 3, 4, 5];

export function StringSelector() {
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const setVisibleStrings = useControlsStore(
    (state) => state.setVisibleStrings,
  );

  const toggleString = (index: StringIndex) => {
    const isVisible = visibleStrings.includes(index);
    const newStrings = isVisible
      ? visibleStrings.filter((s) => s !== index)
      : [...visibleStrings, index].sort((a, b) => a - b);

    if (newStrings.length === 0) return;

    setVisibleStrings(newStrings as StringIndex[]);
  };

  return (
    <S.StringSelectorWrapper>
      {STRINGS.map((stringIdx) => {
        const isActive = visibleStrings.includes(stringIdx);

        return (
          <S.StringOption
            key={stringIdx}
            onClick={() => toggleString(stringIdx)}
          >
            <S.IndicatorWrapper $hideTick={isActive}>
              <S.StyledTick />
            </S.IndicatorWrapper>
          </S.StringOption>
        );
      })}
    </S.StringSelectorWrapper>
  );
}

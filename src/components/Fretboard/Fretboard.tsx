import { type JSX, useRef } from "react";
import * as S from "./parts";
import { STRINGS_CONFIG } from "./FretboardRow/helpers/constants";
import FretboardInfoRow from "./FretboardInfoRow/FretboardInfoRow";
import { useHorizontalScroll } from "@/hooks";
import FretboardRow, { type StringIndex } from "./FretboardRow/FretboardRow";
import { InstrumentScrollWrapper, InstrumentWrapper } from "@/parts";
import { useShapeReset } from "./helpers/useShapeReset";
import { useFretboardScroll } from "./helpers/useFretboardScroll";

export default function Fretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  useShapeReset();

  return (
    <InstrumentScrollWrapper ref={scrollRef}>
      <InstrumentWrapper>
        <S.FretboardWrapper>
          <FretboardInfoRow isNumeric />
          <S.Fretboard>
            {STRINGS_CONFIG.map(({ firstNoteInRow, firstNoteOctaveNumber }, index) => {
              return (
                <FretboardRow
                  key={index}
                  stringIndex={index as StringIndex}
                  firstNoteInRow={firstNoteInRow}
                  firstNoteOctaveNumber={firstNoteOctaveNumber}
                />
              );
            })}
          </S.Fretboard>
          <FretboardInfoRow />
        </S.FretboardWrapper>
      </InstrumentWrapper>
    </InstrumentScrollWrapper>
  );
}

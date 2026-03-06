import { type JSX, useRef } from "react";
import * as S from "./parts";
import { STRINGS_CONFIG } from "./FretboardRow/helpers/constants";
import { useHorizontalScroll } from "@/hooks";
import FretboardRow, { type StringIndex } from "./FretboardRow/FretboardRow";
import { InstrumentScrollWrapper, InstrumentWrapper } from "@/parts";
import { useFretboardScroll } from "./hooks/useFretboardScroll";
import FretboardNumericMarkers from "./FretboardNumericMarkers/FretboardNumericMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import FretboardControls from "./FretboardControls/FretboardControls";
import ShapeExplorerSlider from "./ShapeExplorerSlider/ShapeExplorerSlider";

export default function Fretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  return (
    <>
      <FretboardControls />

      <InstrumentScrollWrapper ref={scrollRef}>
        <InstrumentWrapper>
          <FretboardNumericMarkers />
          <S.Fretboard>
            {STRINGS_CONFIG.map(
              ({ firstNoteInRow, firstNoteOctaveNumber }, index) => {
                return (
                  <FretboardRow
                    key={index}
                    stringIndex={index as StringIndex}
                    firstNoteInRow={firstNoteInRow}
                    firstNoteOctaveNumber={firstNoteOctaveNumber}
                  />
                );
              },
            )}
          </S.Fretboard>
          <FretboardDotMarkers />
        </InstrumentWrapper>
      </InstrumentScrollWrapper>

      <ShapeExplorerSlider />
    </>
  );
}

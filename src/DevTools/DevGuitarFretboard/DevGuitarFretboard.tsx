import { type JSX, useRef } from "react";
import * as S from "./parts";
import { type StringValidIndex } from "./constants";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper } from "@/parts";
import {
  useClaenLockedNotes,
  useFretboardScroll,
  useMultiShapeCoordinates,
} from "./hooks";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import FretboardRow from "./FretboardRow/FretboardRow";
import { StringMultiRangeSlider } from "./StringMultiRangeSlider/StringMultiRangeSlider";
import { getAllFretboardNotes } from "./helpers/getAllFretboardNotes";

export default function DevGuitarFretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  const {
    guitarShapeCoordinates,
    baseChordCoordinates,
    nextTargetShapeCoordinates,
  } = useMultiShapeCoordinates();
  const allFretboardNotes = getAllFretboardNotes();

  useClaenLockedNotes();

  return (
    <S.FretboardNotScrollableWrapper>
      <S.StringSliderWrapper>
        <StringMultiRangeSlider />
      </S.StringSliderWrapper>
      <InstrumentScrollWrapper ref={scrollRef}>
        <S.FretboardWrapper>
          <S.Fretboard>
            {allFretboardNotes.map((rowNotes, index) => (
              <FretboardRow
                key={index}
                stringIndex={index as StringValidIndex}
                rowNotes={rowNotes}
                guitarShapeCoordinates={guitarShapeCoordinates}
                baseChordCoordinates={baseChordCoordinates}
                nextTargetShapeCoordinates={nextTargetShapeCoordinates}
              />
            ))}
            <S.FretboardShadow />
            <FretboardDotMarkers />
          </S.Fretboard>
        </S.FretboardWrapper>
      </InstrumentScrollWrapper>
    </S.FretboardNotScrollableWrapper>
  );
}

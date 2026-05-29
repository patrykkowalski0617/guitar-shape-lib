import { type JSX, useRef } from "react";
import * as S from "./parts";
import { type StringValidIndex } from "./constants";
import { useHorizontalScroll } from "@/hooks";
import {
  useClaenLockedNotes,
  useFretboardScroll,
  useMultiShapeCoordinates,
} from "./hooks";
import { getAllFretboardNotes } from "./helpers";
import CAGED_SystemMarkers from "./CAGED_SystemMarkers/CAGED_SystemMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import FretboardRow from "./FretboardRow/FretboardRow";
import { StringMultiRangeSlider } from "./StringMultiRangeSlider/StringMultiRangeSlider";

export default function GuitarFretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  const {
    guitarShapeCoordinates,
    baseChordCoordinates,
    nextTargetShapeCoordinates,
    allCAGED_System,
    bestMatchCAGED_Systems,
  } = useMultiShapeCoordinates();
  const allFretboardNotes = getAllFretboardNotes();

  useClaenLockedNotes();

  return (
    <S.FretboardNotScrollableWrapper>
      <S.StringSliderWrapper>
        <StringMultiRangeSlider />
      </S.StringSliderWrapper>
      <S.InstrumentScrollWrapper ref={scrollRef}>
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
        <CAGED_SystemMarkers
          allCAGED_System={allCAGED_System}
          bestMatchCAGED_Systems={bestMatchCAGED_Systems}
        />
      </S.InstrumentScrollWrapper>
    </S.FretboardNotScrollableWrapper>
  );
}

import { type JSX, useRef } from "react";
import * as S from "./parts";
import { type StringValidIndex } from "./constants";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper } from "@/parts";
import { useFretboardScroll, useMultiShapeCoordinates } from "./hooks";
import FretboardNumericMarkers from "./FretboardNumericMarkers/FretboardNumericMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import HiddenShapeExplorerSlider from "../ShapeExplorer/HiddenShapeExplorerSlider/HiddenShapeExplorerSlider";
import FretboardRow from "./FretboardRow/FretboardRow";
import { StringMultiStepSlider } from "./StringMultiStepSlider/StringMultiStepSlider";
import { getAllFretboardNotes } from "./helpers/getAllFretboardNotes";

export default function GuitarFretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  const { shapeCoordinates, baseChordCoordinates } = useMultiShapeCoordinates();
  const allFretboardNotes = getAllFretboardNotes();

  return (
    <S.FretboardNotScrollableWrapper>
      <S.StringSliderWrapper>
        <StringMultiStepSlider />
      </S.StringSliderWrapper>
      <InstrumentScrollWrapper ref={scrollRef}>
        <FretboardNumericMarkers />
        <S.FretboardWrapper>
          <S.Fretboard>
            {allFretboardNotes.map((rowNotes, index) => (
              <FretboardRow
                key={index}
                stringIndex={index as StringValidIndex}
                rowNotes={rowNotes}
                shapeCoordinates={shapeCoordinates}
                baseChordCoordinates={baseChordCoordinates}
              />
            ))}
            <S.FretboardShadow />
            <HiddenShapeExplorerSlider />
            <FretboardDotMarkers />
          </S.Fretboard>
        </S.FretboardWrapper>
      </InstrumentScrollWrapper>
    </S.FretboardNotScrollableWrapper>
  );
}

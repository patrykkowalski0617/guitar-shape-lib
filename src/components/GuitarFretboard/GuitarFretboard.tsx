import { type JSX, useRef } from "react";
import * as S from "./parts";
import {
  numberOfFrets,
  STRINGS_CONFIG,
  type StringValidIndex,
} from "./constants";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper } from "@/parts";
import { useFretboardScroll } from "./hooks";
import FretboardNumericMarkers from "./FretboardNumericMarkers/FretboardNumericMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import { useDataKeyStore } from "@/store";
import { useShapeCoordinates } from "./hooks";
import type { NoteName } from "@/data";
import { getNotes } from "@/utils";
import HiddenShapeExplorerSlider from "../ShapeExplorer/HiddenShapeExplorerSlider/HiddenShapeExplorerSlider";
import FretboardRow from "./FretboardRow/FretboardRow";
import { StringMultiStepSlider } from "./StringMultiStepSlider/StringMultiStepSlider";

export default function GuitarFretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);
  const selectedShapeVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapeVariantDataKeys,
  );
  const _selectedShapeVariantDataKeys = selectedShapeVariantDataKeys
    ? selectedShapeVariantDataKeys[0]
    : null;
  const shapeCoordinates = useShapeCoordinates(_selectedShapeVariantDataKeys);

  const allFretboardNotes = STRINGS_CONFIG.map(
    ({ firstNoteInRow, firstNoteOctaveNumber }) =>
      getNotes({
        firstNote: firstNoteInRow as NoteName,
        length: numberOfFrets,
        firstOctave: firstNoteOctaveNumber,
      }),
  );

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

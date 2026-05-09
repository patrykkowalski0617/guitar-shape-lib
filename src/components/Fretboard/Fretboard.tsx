import { type JSX, useEffect, useRef } from "react";
import * as S from "./parts";
import { numberOfFrets, STRINGS_CONFIG, type StringIndex } from "./constants";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper } from "@/parts";
import { useFretboardScroll } from "./hooks";
import FretboardNumericMarkers from "./FretboardNumericMarkers/FretboardNumericMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import { useMusicStore } from "@/store";
import { useShapeCoordinates } from "./FretboardCell/hooks";
import type { FretboardCoordinate, NoteName } from "@/data";
import { getNotes } from "@/utils";
import HiddenShapeExplorerSlider from "../ShapeExplorer/HiddenShapeExplorerSlider/HiddenShapeExplorerSlider";
import { StringSlider } from "./StringsSlider/StringsSlider";
import FretboardRow from "./FretboardRow/FretboardRow";
import { StringSelector } from "./StringSelector/StringSelector";

export default function Fretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const updateShapeNotes = useMusicStore((state) => state.updateShapeNotes);
  const shapeCoordinates = useShapeCoordinates(shapeVariantDataKeys);

  const allFretboardNotes = STRINGS_CONFIG.map(
    ({ firstNoteInRow, firstNoteOctaveNumber }) =>
      getNotes({
        firstNote: firstNoteInRow as NoteName,
        length: numberOfFrets,
        firstOctave: firstNoteOctaveNumber,
      }),
  );

  useEffect(() => {
    if (shapeCoordinates) {
      updateShapeNotes(
        allFretboardNotes,
        shapeCoordinates as FretboardCoordinate[],
      );
    } else {
      updateShapeNotes([], []);
    }
  }, [
    shapeVariantDataKeys,
    shapeCoordinates,
    allFretboardNotes,
    updateShapeNotes,
  ]);

  return (
    <S.FretboardNotScrollableWrapper>
      <S.StringSliderWrapper>
        <StringSlider />
        <StringSelector />
      </S.StringSliderWrapper>
      <InstrumentScrollWrapper ref={scrollRef}>
        <FretboardNumericMarkers />
        <S.FretboardWrapper>
          <S.Fretboard>
            {allFretboardNotes.map((rowNotes, index) => (
              <FretboardRow
                key={index}
                stringIndex={index as StringIndex}
                rowNotes={rowNotes}
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

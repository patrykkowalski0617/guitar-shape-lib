import { type JSX, useEffect, useRef } from "react";
import * as S from "./parts";
import { numberOfFrets, STRINGS_CONFIG, type StringIndex } from "./constants";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper, InstrumentWrapper } from "@/parts";
import { useFretboardScroll } from "./hooks";
import FretboardNumericMarkers from "./FretboardNumericMarkers/FretboardNumericMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import { useMusicStore } from "@/store";
import { useShapeCoordinates } from "./FretboardCell/hooks";
import type { FretboardCoordinate, Note } from "@/data";
import { getNotes } from "@/utils";
import HiddenShapeExplorerSlider from "../ShapeExplorer/HiddenShapeExplorerSlider/HiddenShapeExplorerSlider";
import { StringSlider } from "./StringsSlider/StringsSlider";
import FretboardRow from "./FretboardRow/FretboardRow";

export default function Fretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  useFretboardScroll(scrollRef);

  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const updateShapeNotes = useMusicStore((state) => state.updateShapeNotes);
  const shapeCoordinates = useShapeCoordinates(shapeVariantLocationData);

  const allFretboardNotes = STRINGS_CONFIG.map(
    ({ firstNoteInRow, firstNoteOctaveNumber }) =>
      getNotes({
        firstNote: firstNoteInRow as Note,
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
    shapeVariantLocationData,
    shapeCoordinates,
    allFretboardNotes,
    updateShapeNotes,
  ]);

  return (
    <S.FretboardAjustWrapper>
      <InstrumentScrollWrapper ref={scrollRef}>
        <InstrumentWrapper>
          <FretboardNumericMarkers />

          <S.FretboardWrapper>
            <S.StringSliderWrapper>
              <StringSlider />
            </S.StringSliderWrapper>
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
        </InstrumentWrapper>
      </InstrumentScrollWrapper>
    </S.FretboardAjustWrapper>
  );
}

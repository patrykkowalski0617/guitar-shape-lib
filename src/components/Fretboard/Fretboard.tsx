import { type JSX, useEffect, useRef } from "react";
import * as S from "./parts";
import {
  numberOfFrets,
  STRINGS_CONFIG,
} from "./FretboardRow/helpers/constants";
import { useHorizontalScroll } from "@/hooks";
import FretboardRow, { type StringIndex } from "./FretboardRow/FretboardRow";
import { InstrumentScrollWrapper, InstrumentWrapper } from "@/parts";
import { useFretboardScroll } from "./hooks";
import FretboardNumericMarkers from "./FretboardNumericMarkers/FretboardNumericMarkers";
import FretboardDotMarkers from "./FretboardDotMarkers/FretboardDotMarkers";
import HiddenShapeExplorerSlider from "@/components/ShapeControls/ShapeExplorer/HiddenShapeExplorerSlider/HiddenShapeExplorerSlider";
import { useMusicStore } from "@/store";
import { useShapeCoordinates } from "./FretboardCell/hooks";
import type { FretboardCoordinate, Note } from "@/data";
import { getNotes } from "@/utils";

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
    <InstrumentScrollWrapper ref={scrollRef}>
      <InstrumentWrapper>
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
      </InstrumentWrapper>
    </InstrumentScrollWrapper>
  );
}

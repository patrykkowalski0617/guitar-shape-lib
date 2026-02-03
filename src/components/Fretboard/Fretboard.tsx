import { type JSX, useRef } from "react";
import * as S from "./parts";
import { STRINGS_CONFIG } from "./FretboardRow/helpers/constants";
import FretboardInfoRow from "./FretboardInfoRow/FretboardInfoRow";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import FretboardRow, { type StringIndex } from "./FretboardRow/FretboardRow";
import { InstrumentScrollWrapper, InstrumentWrapper, TutorialStickyIcons } from "@/parts";

export default function Fretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  return (
    <InstrumentScrollWrapper ref={scrollRef}>
      <TutorialStickyIcons>
        <TutorialPopover {...TUTORIAL_CONTENT.FRETBOARD} />
      </TutorialStickyIcons>
      <InstrumentWrapper>
        <S.FretboardWrapper>
          <FretboardInfoRow isNumeric />
          <S.Fretboard>
            {STRINGS_CONFIG.map(({ firstNoteInRow, octaveNumber }, index) => {
              return (
                <FretboardRow
                  key={index}
                  stringIndex={index as StringIndex}
                  firstNoteInRow={firstNoteInRow}
                  octaveNumber={octaveNumber}
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

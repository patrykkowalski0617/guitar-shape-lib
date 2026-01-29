import { type JSX, useRef } from "react";
import * as S from "./parts";
import { STRINGS_CONFIG } from "./helpers/constants";
import { BoardScrollWrapper, BoardWrapper, TutorialStickyIcons } from "../BoardsWrapper/parts";
import FretboardInfoRow from "./FretboardInfoRow/FretboardInfoRow";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import FretboardRow from "./FretboardRow/FretboardRow";

export default function Fretboard(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  return (
    <BoardScrollWrapper ref={scrollRef}>
      <TutorialStickyIcons>
        <TutorialPopover {...TUTORIAL_CONTENT.FRETBOARD} />
      </TutorialStickyIcons>
      <BoardWrapper>
        <S.FretboardWrapper>
          <FretboardInfoRow isNumeric />
          <S.Fretboard>
            {STRINGS_CONFIG.map(({ noteName, octaveNumber }, stringIndex) => {
              return (
                <FretboardRow
                  key={stringIndex}
                  stringIndex={stringIndex}
                  noteName={noteName}
                  octaveNumber={octaveNumber}
                />
              );
            })}
          </S.Fretboard>
          <FretboardInfoRow />
        </S.FretboardWrapper>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}

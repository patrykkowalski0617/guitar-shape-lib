import { type JSX, useRef } from "react";
import * as S from "@/components/Piano/parts";
import { InstrumentScrollWrapper, InstrumentWrapper, TutorialStickyIcons } from "@/parts";
import PianoKey from "./PianoKey/PianoKey";
import { pianoNotes, numberOfKeys } from "./helpers/constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { usePianoScroll } from "./helpers/usePianoScroll";

export default function Piano(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  usePianoScroll(scrollRef);

  return (
    <InstrumentScrollWrapper ref={scrollRef}>
      <TutorialStickyIcons>
        <TutorialPopover {...TUTORIAL_CONTENT.KEYBOARD} />
      </TutorialStickyIcons>
      <InstrumentWrapper>
        <ScaleTemplate />
        <S.Piano $numberOfKeys={numberOfKeys}>
          {pianoNotes.map((note) => (
            <PianoKey key={note.noteId} note={note} />
          ))}
        </S.Piano>
      </InstrumentWrapper>
    </InstrumentScrollWrapper>
  );
}

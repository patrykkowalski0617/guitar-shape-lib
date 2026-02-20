import { type JSX, useRef } from "react";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper, InstrumentWrapper } from "@/parts";
import * as S from "@/components/Piano/parts";
import PianoKey from "./PianoKey/PianoKey";
import { pianoNotes, numberOfKeys } from "./helpers/constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { usePianoScroll } from "./helpers/usePianoScroll";

export default function Piano(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  usePianoScroll(scrollRef);

  return (
    <InstrumentScrollWrapper ref={scrollRef}>
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

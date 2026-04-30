import { type JSX, useRef } from "react";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper, InstrumentWrapper } from "@/parts";
import * as S from "@/components/Piano/parts";
import PianoKey from "./PianoKey/PianoKey";
import { pianoNotes, numberOfKeys } from "./helpers/constants";
import { usePianoScroll } from "./hooks/usePianoScroll";

export default function Piano(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  usePianoScroll(scrollRef);

  return (
    <S.ShadowWrapper>
      <S.PianoShadow />
      <InstrumentScrollWrapper ref={scrollRef}>
        <InstrumentWrapper>
          <S.PianoWrapper>
            <S.PianoKeysShadow />
            <S.Piano $numberOfKeys={numberOfKeys}>
              {pianoNotes.map((note) => (
                <PianoKey key={note.noteId} note={note} />
              ))}
            </S.Piano>
          </S.PianoWrapper>
        </InstrumentWrapper>
      </InstrumentScrollWrapper>
    </S.ShadowWrapper>
  );
}

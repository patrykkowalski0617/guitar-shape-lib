import { type JSX, useRef } from "react";
import { useHorizontalScroll } from "@/hooks";
import { InstrumentScrollWrapper } from "@/parts";
import * as S from "@/components/Piano/parts";
import PianoKey from "./PianoKey/PianoKey";
import { usePianoScroll } from "./hooks/usePianoScroll";
import { numberOfKeys, pianoNotes } from "./constants";

export default function Piano(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  usePianoScroll(scrollRef);

  return (
    <S.ShadowWrapper>
      <S.PianoShadow />
      <InstrumentScrollWrapper ref={scrollRef}>
        <S.PianoWrapper>
          <S.PianoKeysTopShadow />
          <S.PianoKeysLeftSideShadow />
          <S.PianoKeysRightSideShadow />
          <S.Piano $numberOfKeys={numberOfKeys}>
            {pianoNotes.map((noteObject) => (
              <PianoKey key={noteObject.noteId} noteObject={noteObject} />
            ))}
          </S.Piano>
        </S.PianoWrapper>
      </InstrumentScrollWrapper>
    </S.ShadowWrapper>
  );
}

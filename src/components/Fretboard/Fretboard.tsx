import { type JSX } from "react";
import * as S from "./parts";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import { useControlsStore } from "@/store/useControlsStore";
import { BoardWrapper } from "../customUI/Boards/parts";

export default function Fretboard(): JSX.Element {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const { activeScaleIndices } = useActiveScale();

  return (
    <BoardWrapper>
      <S.Fretboard>
        {STRINGS_FIRST_NOTES.map(({ noteName, octaveNumber }, stringIndex) => (
          <S.FretboardRow key={`${stringIndex}-${noteName}`}>
            {getNotes({
              firstNote: noteName,
              length: numberOfFrets,
              firstOctave: octaveNumber,
            }).map(({ isEnharmonic, flatNoteName, sharpNoteName, noteId }, fretIndex) => {
              const scaleDegree = activeScaleIndices.find((s) => s.noteId === noteId);
              const isHighlighted = !!scaleDegree;

              return (
                <S.Fret key={noteId} $numberOfFrets={numberOfFrets}>
                  <S.Note $isHighlighted={isHighlighted}>
                    <NoteLabel
                      isHighlighted={isHighlighted}
                      index={fretIndex}
                      flatNoteName={flatNoteName}
                      sharpNoteName={sharpNoteName}
                      isFlatKey={isFlatKey}
                      orientation="horizontal"
                      isEnharmonic={isEnharmonic}
                    />
                  </S.Note>
                </S.Fret>
              );
            })}
          </S.FretboardRow>
        ))}
      </S.Fretboard>
    </BoardWrapper>
  );
}

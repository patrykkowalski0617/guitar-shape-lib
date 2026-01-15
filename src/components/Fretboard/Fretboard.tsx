import { type JSX } from "react";
import * as S from "./parts";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { BoardScrollWrapper, BoardWrapper } from "../customUI/Boards/parts";
import FretCell from "./FretCell/FretCell";

export default function Fretboard(): JSX.Element {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;

  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);

  const { activeScaleIndices } = useActiveScale();

  return (
    <BoardScrollWrapper>
      <BoardWrapper>
        <S.Fretboard>
          {STRINGS_FIRST_NOTES.map(({ noteName, octaveNumber }, stringIndex) => (
            <S.FretboardRow key={`${stringIndex}-${noteName}`}>
              {getNotes({
                firstNote: noteName,
                length: numberOfFrets,
                firstOctave: octaveNumber,
              }).map((note, fretIndex) => {
                const scaleDegree = activeScaleIndices.find((s) => s.noteId === note.noteId);

                return (
                  <FretCell
                    key={`${stringIndex}-${fretIndex}`}
                    note={note}
                    fretIndex={fretIndex}
                    isHighlighted={!!scaleDegree}
                    isFlatKey={isFlatKey}
                    scaleDegree={scaleDegree}
                    isActive={activeNoteId === note.noteId}
                    numberOfFrets={numberOfFrets}
                    onHover={setActiveNoteId}
                    onLeave={() => setActiveNoteId(null)}
                  />
                );
              })}
            </S.FretboardRow>
          ))}
        </S.Fretboard>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}

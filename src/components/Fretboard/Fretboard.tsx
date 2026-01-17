import { type JSX } from "react";
import * as S from "./parts";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { numberOfFrets, STRINGS_FIRST_NOTES } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { BoardScrollWrapper, BoardWrapper } from "../customUI/Boards/parts";
import FretCell from "./FretCell/FretCell";
import { useFretboardDevEditor } from "./helpers/useFretboardDevEditor";
import { useFretboardShapes } from "./helpers/useFretboardShapes";

export default function Fretboard(): JSX.Element {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeOffset = useControlsStore((state) => state.currentShapeOffset);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const setActiveNoteId = useMusicStore((state) => state.setActiveNoteId);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);

  const NOTES_SHARP = getNotes({ firstNote: currentKeyId }).map(
    ({ sharpNoteName }) => sharpNoteName
  );

  const shapeRootSharpNote =
    currentShapeOffset !== null ? NOTES_SHARP[currentShapeOffset % 12] : null;

  const { onDevClick, isDevNote } = useFretboardDevEditor();
  const { showShape, isPointInShape } = useFretboardShapes();

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
                const isShapeRootNote = shapeRootSharpNote === note.sharpNoteName;
                const isShapeNote = isPointInShape(stringIndex, fretIndex);
                const isCurrentDevNote = isDevNote(stringIndex, fretIndex);

                return (
                  <FretCell
                    key={`${stringIndex}-${fretIndex}`}
                    note={note}
                    fretIndex={fretIndex}
                    isHighlighted={isShapeRootNote}
                    currentRoleId={currentRoleId}
                    isFlatKey={isFlatKey}
                    isActive={activeNoteId === note.noteId}
                    isShapeRootNote={isShapeRootNote}
                    numberOfFrets={numberOfFrets}
                    onHover={setActiveNoteId}
                    onLeave={() => setActiveNoteId(null)}
                    isShapeNote={isShapeNote}
                    isDevNote={isCurrentDevNote}
                    onClick={() => {
                      onDevClick(stringIndex, fretIndex);

                      if (isShapeRootNote) {
                        showShape(stringIndex);
                      }
                    }}
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

import { type JSX, useMemo } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS, NOTES_SHARP, type NoteSharp } from "@/utils";
import { notes, numberOfKeys } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { BoardScrollWrapper, BoardWrapper } from "../customUI/Boards/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useMusicStore } from "@/store/useMusicStore";
import shapes from "@/utils/shapes";

const KEY_SHAPE_MAP: Record<number, S.KeyShape> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};

export default function Keyboard(): JSX.Element {
  const { fullScaleMetadata } = useActiveScale();
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const { activeNoteId, setActiveNoteId } = useMusicStore();
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeOffset = useControlsStore((state) => state.currentShapeOffset);

  const rootIndex = NOTES_SHARP.indexOf(currentKeyId as NoteSharp);

  const shapeSemitones = useMemo(() => {
    if (!currentShapeId || currentShapeOffset === null) return [];

    return shapes[currentShapeId].intervals.map(
      (intervalValue) => (intervalValue + currentShapeOffset) % 12
    );
  }, [currentShapeId, currentShapeOffset]);

  return (
    <BoardScrollWrapper>
      <BoardWrapper>
        <ScaleTemplate />
        <S.Keyboard $numberOfKeys={numberOfKeys}>
          {notes.map((note, index) => {
            const noteIndex = NOTES_SHARP.indexOf(note.sharpNoteName);
            const distanceFromRoot = (noteIndex - rootIndex + 12) % 12;

            const isPartOfShape = shapeSemitones.includes(distanceFromRoot);
            if (isPartOfShape) {
              console.log(note);
            }

            const scaleDegree = fullScaleMetadata.find(
              (m) => m.noteId === note.noteId && m.isVisible
            );

            return (
              <KeyboardKey
                key={note.noteId}
                note={note}
                index={index}
                noteIndex={noteIndex}
                isHighlighted={!!scaleDegree}
                isShapeNote={isPartOfShape}
                scaleDegree={scaleDegree}
                isFlatKey={isFlatKey}
                isActive={activeNoteId === note.noteId}
                onHover={setActiveNoteId}
                onLeave={() => setActiveNoteId(null)}
                keyShape={KEY_SHAPE_MAP[noteIndex]}
                majorScale={majorScale}
              />
            );
          })}
        </S.Keyboard>
      </BoardWrapper>
    </BoardScrollWrapper>
  );
}

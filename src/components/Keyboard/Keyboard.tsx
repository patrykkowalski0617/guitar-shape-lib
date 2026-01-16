import { type JSX } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS, NOTES_SHARP } from "@/utils";
import { notes, numberOfKeys } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { BoardScrollWrapper, BoardWrapper } from "../customUI/Boards/parts";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useMusicStore } from "@/store/useMusicStore";

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

  return (
    <BoardScrollWrapper>
      <BoardWrapper>
        <ScaleTemplate />
        <S.Keyboard $numberOfKeys={numberOfKeys}>
          {notes.map((note, index) => {
            const noteIndex = NOTES_SHARP.indexOf(note.sharpNoteName);

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

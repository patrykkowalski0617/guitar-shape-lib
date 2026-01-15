import { type JSX } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS, NOTES_SHARP } from "@/utils";
import { notes, numberOfKeys } from "./helpers/constants";
import { useControlsStore } from "@/store/useControlsStore";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { BoardWrapper } from "../customUI/Boards/parts";

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
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const { activeScaleIndices } = useActiveScale();

  return (
    <BoardWrapper>
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map(({ flatNoteName, sharpNoteName, isEnharmonic, noteId }, index) => {
          const noteIndex = NOTES_SHARP.indexOf(sharpNoteName);

          const scaleDegree = activeScaleIndices.find((s) => s.noteId === noteId);
          const isHighlighted = !!scaleDegree;

          return (
            <S.Key
              key={noteId}
              $isHighlighted={isHighlighted}
              $isHighlightRole={scaleDegree?.role || "none"}
              $isWhiteKey={majorScale.includes(noteIndex)}
              $keyShape={KEY_SHAPE_MAP[noteIndex]}
            >
              <NoteLabel
                isHighlighted={isHighlighted}
                index={index}
                flatNoteName={flatNoteName}
                sharpNoteName={sharpNoteName}
                isFlatKey={isFlatKey}
                isEnharmonic={isEnharmonic}
              />
            </S.Key>
          );
        })}
      </S.Keyboard>
    </BoardWrapper>
  );
}

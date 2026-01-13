import { type JSX } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS } from "@/utils";
import { firstAIndex, firstNote, keysOffset, notes, numberOfKeys } from "./helpers/constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { useMusicStore } from "@/store/useMusicStore";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";
import { getScaleIndices } from "./helpers/getScaleIndices";

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
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;
  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].orderNumber;

  const activeScaleIndices = getScaleIndices({
    firstAIndex,
    templateOffset,
    isMajorMode,
  });

  return (
    <S.KeyboardWrapper>
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map((_, index) => {
          const noteIndex = (index + keysOffset) % 12;
          const isHighlighted = activeScaleIndices.includes(index);

          return (
            <S.Key
              key={index}
              $isHighlighted={isHighlighted}
              $isWhiteKey={majorScale.includes(noteIndex)}
              $keyShape={KEY_SHAPE_MAP[noteIndex]}
            >
              <NoteLabel
                isHighlighted={isHighlighted}
                index={index}
                firstNote={firstNote}
                isFlatKey={isFlatKey}
              />
            </S.Key>
          );
        })}
      </S.Keyboard>
    </S.KeyboardWrapper>
  );
}

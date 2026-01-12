import { type JSX } from "react";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";
import { keysOffset, notes, notesFlat, numberOfKeys } from "./constants";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";

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
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;

  return (
    <S.KeyboardWrapper>
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map((note, index) => {
          const noteIndex = (index + keysOffset) % 12;
          const flatNote = notesFlat[index];
          const isEnharmonicNote = flatNote !== note;
          return (
            <S.Key
              key={index}
              $isWhiteKey={majorScale.includes(noteIndex)}
              $keyShape={KEY_SHAPE_MAP[noteIndex]}
            >
              <S.NoteLabel $isFlatKey={isFlatKey} $isEnharmonicNote={isEnharmonicNote}>
                <div className="mainLabel">{note}</div>
                <div className="optionalLabel">{isEnharmonicNote && flatNote}</div>
              </S.NoteLabel>
            </S.Key>
          );
        })}
      </S.Keyboard>
    </S.KeyboardWrapper>
  );
}

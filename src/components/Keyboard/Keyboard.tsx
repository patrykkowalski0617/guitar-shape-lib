import { type JSX } from "react";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";
import { firstNote, keysOffset, notes, numberOfKeys } from "./constants"; // importujemy firstNote
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";

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
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map((_, index) => {
          const noteIndex = (index + keysOffset) % 12;

          return (
            <S.Key
              key={index}
              $isWhiteKey={majorScale.includes(noteIndex)}
              $keyShape={KEY_SHAPE_MAP[noteIndex]}
            >
              <NoteLabel index={index} firstNote={firstNote} isFlatKey={isFlatKey} />
            </S.Key>
          );
        })}
      </S.Keyboard>
    </S.KeyboardWrapper>
  );
}

import { type JSX } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS } from "@/utils";
import { keysOffset, notes, numberOfKeys } from "./helpers/constants";
import { useMusicStore } from "@/store/useMusicStore";
import NoteLabel from "../customUI/NoteLabel/NoteLabel";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";
import ScaleTemplate from "./ScaleTemplate/ScaleTemplate";

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
  const { activeScaleIndices } = useActiveScale();

  return (
    <S.KeyboardWrapper>
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map(({ flatNoteName, sharpNoteName, isEnharmonic }, index) => {
          const noteIndex = (index + keysOffset) % 12;
          const scaleDegree = activeScaleIndices.find((s) => s.index === index);
          const isHighlighted = !!scaleDegree;

          return (
            <S.Key
              key={index}
              $isHighlighted={isHighlighted}
              $isHighlightMusicFunction={scaleDegree?.role || "none"}
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
    </S.KeyboardWrapper>
  );
}

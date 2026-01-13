import { type JSX, useEffect, useState, useRef } from "react";
import * as S from "./parts";
import { majorScale, UNIFIED_MUSIC_KEYS } from "@/utils";
import {
  firstNote,
  keysOffset,
  notes,
  numberOfKeys,
  transitionStepTime,
} from "./helpers/constants";
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
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;

  const { activeScaleIndices } = useActiveScale();

  // This code manage keys highlight animation --->
  const [isReadyForAnimation, setIsReadyForAnimation] = useState(true);
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsReadyForAnimation(true);
    }, transitionStepTime * 2);

    return () => {
      clearTimeout(timeoutId);
      setIsReadyForAnimation(false);
    };
  }, [currentKeyId, isMajorMode]);
  // <---

  return (
    <S.KeyboardWrapper>
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map((_, index) => {
          const noteIndex = (index + keysOffset) % 12;
          const scaleDegree = activeScaleIndices.find((s) => s.index === index);
          const isHighlighted = !!scaleDegree;

          return (
            <S.Key
              key={index}
              $isHighlighted={isReadyForAnimation && isHighlighted}
              $isHighlightRole={scaleDegree?.role || "none"}
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

import { type JSX } from "react";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";
import { keysOffset, notes, numberOfKeys } from "../constants";
import { Keyboard } from "../parts";

export default function ScaleTemplate(): JSX.Element {
  const firstAIndex = notes.findIndex((_, index) => (index + keysOffset) % 12 === 9);
  const templateIndices: number[] = [];

  if (firstAIndex !== -1) {
    let currentIndex = firstAIndex;
    while (templateIndices.length < 9 && currentIndex < numberOfKeys) {
      const currentNoteIndex = (currentIndex + keysOffset) % 12;

      if (majorScale.includes(currentNoteIndex)) {
        templateIndices.push(currentIndex);
      }
      currentIndex++;
    }
  }

  return (
    <Keyboard $numberOfKeys={numberOfKeys}>
      {notes.map((_, index) => {
        const isInitialScaleNote = templateIndices.includes(index);
        const noteIndex = (index + keysOffset) % 12;

        return (
          <S.Key
            key={index}
            $isWhiteKey={majorScale.includes(noteIndex)}
            $isInitialScaleNote={isInitialScaleNote}
          />
        );
      })}
    </Keyboard>
  );
}

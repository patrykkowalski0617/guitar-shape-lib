import { getNotes } from "@/utils";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";

const CHROMATIC_SCALE = getNotes({});

export default function Keyboard() {
  const offset = 5;
  const firstNote = CHROMATIC_SCALE[((offset % 12) + 12) % 12];
  const numberOfKeys = 43;
  return (
    <S.Keyboard numberOfKeys={numberOfKeys}>
      {getNotes({ length: numberOfKeys, firstNote }).map((note, index) => {
        const noteIndex = (index + offset) % 12;

        const isWhiteKey = majorScale.includes(noteIndex);
        const isCKeyShape = [0].includes(noteIndex);
        const isDKeyShape = [2].includes(noteIndex);
        const isEKeyShape = [4].includes(noteIndex);
        const isFKeyShape = [5].includes(noteIndex);
        const isGKeyShape = [7].includes(noteIndex);
        const isAKeyShape = [9].includes(noteIndex);
        const isBKeyShape = [11].includes(noteIndex);

        return (
          <S.Key
            key={index}
            isWhiteKey={isWhiteKey}
            isCKeyShape={isCKeyShape}
            isDKeyShape={isDKeyShape}
            isEKeyShape={isEKeyShape}
            isFKeyShape={isFKeyShape}
            isGKeyShape={isGKeyShape}
            isAKeyShape={isAKeyShape}
            isBKeyShape={isBKeyShape}
          >
            <span style={{ zIndex: 50, position: "relative" }}>{note}</span>
          </S.Key>
        );
      })}
    </S.Keyboard>
  );
}

import { getNotes } from "@/utils";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";

export default function Keyboard() {
  return (
    <S.Keyboard>
      {getNotes({ length: 24 }).map((note, index, arr) => {
        const isWhiteKey = majorScale.includes(index % 12);
        const isLeftShape = [0, 5].includes(index % 12) && index !== arr.length - 1;
        const isMidleShape = [2, 7, 9].includes(index % 12);
        const isRightShape = [4, 11].includes(index % 12);

        return (
          <S.Key
            key={index}
            isWhiteKey={isWhiteKey}
            isLeftShape={isLeftShape}
            isMidleShape={isMidleShape}
            isRightShape={isRightShape}
          >
            {note}
          </S.Key>
        );
      })}
    </S.Keyboard>
  );
}

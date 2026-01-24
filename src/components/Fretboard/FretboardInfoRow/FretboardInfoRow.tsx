import * as S from "./parts";
import { numberOfFrets } from "../helpers/constants";
import { FretboardRow } from "../parts";

export default function FretboardInfoRow({ isNumeric = false }: { isNumeric?: boolean }) {
  const infoCells = Array.from({ length: numberOfFrets });

  const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleDotFrets = [12, 24];

  return (
    <FretboardRow>
      {infoCells.map((_, index) => {
        const isSingleDot = singleDotFrets.includes(index);
        const isDoubleDot = doubleDotFrets.includes(index);

        return (
          <S.FretInfoCell
            key={`info-${index}`}
            $singleDot={isSingleDot}
            $doubleDot={isDoubleDot}
            $isNumeric={isNumeric}
          >
            {isNumeric && index !== 0 ? index : ""}
          </S.FretInfoCell>
        );
      })}
    </FretboardRow>
  );
}

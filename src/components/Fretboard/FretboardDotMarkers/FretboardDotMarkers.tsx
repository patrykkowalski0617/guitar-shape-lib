import * as S from "./parts";
import { numberOfFrets } from "../FretboardRow/helpers/constants";
import { FretboardRow } from "../FretboardRow/parts";

export default function FretboardDotMarkers() {
  const infoCells = Array.from({ length: numberOfFrets });

  const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleDotFrets = [12, 24];

  return (
    <FretboardRow>
      {infoCells.map((_, index) => {
        const isSingleDot = singleDotFrets.includes(index);
        const isDoubleDot = doubleDotFrets.includes(index);

        return <S.Marker key={`info-${index}`} $singleDot={isSingleDot} $doubleDot={isDoubleDot} />;
      })}
    </FretboardRow>
  );
}

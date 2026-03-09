import * as S from "./parts";
import { numberOfFrets } from "../FretboardRow/helpers/constants";
import { FretboardRow } from "../FretboardRow/parts";

export default function FretboardNumericMarkers() {
  const infoCells = Array.from({ length: numberOfFrets });

  return (
    <FretboardRow>
      {infoCells.map((_, index) => {
        return (
          <S.Marker key={`info-${index}`}>{index !== 0 ? index : ""}</S.Marker>
        );
      })}
    </FretboardRow>
  );
}

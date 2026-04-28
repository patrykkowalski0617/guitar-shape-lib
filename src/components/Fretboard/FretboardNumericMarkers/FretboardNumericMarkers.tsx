import * as S from "./parts";
import { numberOfFrets } from "../FretboardRow/helpers/constants";

export default function FretboardNumericMarkers() {
  const infoCells = Array.from({ length: numberOfFrets });

  return (
    <S.FretboardNumericMarkers>
      {infoCells.map((_, index) => {
        return (
          <S.Marker key={`info-${index}`}>{index !== 0 ? index : ""}</S.Marker>
        );
      })}
    </S.FretboardNumericMarkers>
  );
}

import * as S from "./parts";
import { Settings } from "../Settings/Settings";

export default function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <S.Title>Guitar solo shapes</S.Title>
        <S.HeaderSide>
          <Settings />
        </S.HeaderSide>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

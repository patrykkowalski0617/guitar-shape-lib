import * as S from "./parts";
import { Settings } from "../Settings/Settings";

export default function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <S.TitleWrapper>
          <S.Title>Guitar solo shapes</S.Title>
          <S.Subtitle>Library</S.Subtitle>
        </S.TitleWrapper>

        <S.HeaderSide>
          <Settings />
        </S.HeaderSide>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

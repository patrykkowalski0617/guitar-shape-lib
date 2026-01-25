import * as S from "./parts";
import { Settings } from "../Settings/Settings";

export default function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <S.TitleWrapper>
          <S.Title>Solo over changes</S.Title>
          <S.Subtitle>Guitar Shapes Library</S.Subtitle>
        </S.TitleWrapper>

        <S.HeaderSide>
          <Settings />
        </S.HeaderSide>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

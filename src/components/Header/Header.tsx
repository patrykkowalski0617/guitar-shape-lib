import * as S from "./parts";
import { Settings } from "../Settings/Settings";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

export default function Header() {
  const tutorialHover_appOverview = useTutorialHover("app-overview");

  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <div {...tutorialHover_appOverview}>
          <S.TitleWrapper>
            <S.Title>Guitar solo shapes</S.Title>
            <S.Subtitle>Library</S.Subtitle>
          </S.TitleWrapper>
        </div>
        <S.HeaderSide>
          <Settings />
        </S.HeaderSide>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

import * as S from "./parts";
import { Settings } from "../Settings/Settings";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function Header() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);

  return (
    <S.HeaderWrapper $isHidden={isFullscreen}>
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

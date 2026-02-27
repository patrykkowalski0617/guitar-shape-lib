import * as S from "./parts";
// import { Settings } from "../Settings/Settings";
import { useControlsStore, useSettingsStore } from "@/store";

export default function Header() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);

  return (
    <S.HeaderWrapper $isFullscreen={isFullscreen} $isPianoVisible={isPianoVisible}>
      <S.HeaderContent>
        <S.TitleWrapper>
          <S.Title>Solo over changes</S.Title>
          <S.Subtitle>Guitar Shapes Library</S.Subtitle>
        </S.TitleWrapper>

        {/* <S.HeaderSide>
          <Settings />
        </S.HeaderSide> */}
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}
